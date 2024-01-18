const Jimp = require('jimp');
const path = require('path');
const userService = require('../services/user-service');
const UserDto = require('../dtos/user-dto');

class ActivateController {

    async activate(req, res) {
        // Activation logic
        const { name, pic } = req.body;
        //console.log(pic);
        if (!name || !pic) {
            res.status(400).json({ message: 'All fields are required!' });
        }
        
        // Image Base64
        //const buffer = Buffer.from(
           // pic.replace(/^data:image\/png;base64,/, ''),
            //'base64'
        //);
        //console.log(buffer.length);
    
        const imagePath = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}.png`;
        //console.log(imagePath);
        
        // 32478362874-3242342342343432.png

        try {
            const jimResp = await Jimp.read(Buffer.from(
                pic.replace(/^data:image\/jpeg;base64,/, ''),
                'base64'
            ));
            jimResp
                .resize(150, Jimp.AUTO)// so that the aspect ratio of the image do not change
                .write(path.resolve(__dirname, `../storage/${imagePath}`));
               // res.status(200).json({ message: 'Image processed successfully' });
        } catch (err) {
            
            console.log(err);
            res.status(500).json({ message: 'Could not process the image' });
             
        }

        const userId = req.user._id;
        // Update user
        try {
            const user = await userService.findUser({ _id: userId });
            if (!user) {
                res.status(404).json({ message: 'User not found!' });
            }
            user.activated = true;
            user.name = name;
            user.pic = `/storage/${imagePath}`;
            user.save();
            res.json({ user: new UserDto(user), auth: true });
        } catch (err) {
            res.status(500).json({ message: 'Something went wrong!' });
        }
    }
}

module.exports = new ActivateController();