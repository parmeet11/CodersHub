const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');

class AuthController {
    async sendOtp(req, res) {

        const {phone} = req.body;
        if(!phone) {
            res.status(400).json({message: "Phone field is required!"})
        }

        const otp = await otpService.generateOtp();

        const ttl = 1000 * 60 * 2; // 2 min
        const expire = Date.now() + ttl;
        const data = `${phone}.${otp}.${expire}`;

        const hash = hashService.hashOtp(data);


        try{
            //await otpService.sendBySms(phone, otp);
            res.json({
                hash: `${hash}.${expire}`,
                phone,
                otp,
            })
        } catch(err){
            console.log(err);
            res.status(500).json({message: 'OTP sending failed'});
        }
    } 

    async verifyOtp(req, res) {
        const { otp, hash, phone } = req.body;
        if (!otp || !hash || !phone) {
                res.status(400).json({ message: 'All fields are required!' });
        }
    
        const [hashedOtp, expires] = hash.split('.');
        if (Date.now() > +expires) {
                res.status(400).json({ message: 'OTP expired!' });
        }
    
        const data = `${phone}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp, data);

        if (!isValid) {
            res.status(400).json({ message: 'Invalid OTP' });
        }

        let user;
        try {
            user = await userService.findUser({ phone });
            if (!user) {
                user = await userService.createUser({ phone });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Db error' });
        }

        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id,
            activated: false,
        });

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true, //only server can read not js or to secure 
        });
        const userDto = new UserDto(user);
        //console.log(userDto);
        res.json({ accessToken, user: userDto});
        //console.log(user);

    }    
            
         
        

        
    
}

module.exports = new AuthController(); //creating object