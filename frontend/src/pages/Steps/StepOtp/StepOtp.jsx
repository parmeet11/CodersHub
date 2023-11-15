import React, {useState} from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepOtp.module.css';
import { verifyOtp } from '../../../http';
import {useSelector} from 'react-redux';
import { setAuth } from '../../../store/authSlice';
import { useDispatch } from 'react-redux';


const StepOtp = ({onNext}) => {

  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const {phone, hash} = useSelector((state) => state.auth.otp);

    const submit = async () => {

        try{

            const {data} = await verifyOtp({otp, phone, hash});
                console.log(data);
                dispatch(setAuth(data));
                //onNext();
        } catch(err){
            console.log(err);
        }

        
    }

  return (
  <>
    <div className={styles.cardWrapper}>
                <Card
                    title="Enter the OTP"
                    icon="otp">
                    <TextInput
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}/>
                    <div className={styles.btnWrap}>
                        <Button onClick={submit} text="Next" />
                    </div>
                    <p className={styles.bottomParagraph}>
                        By entering your number, you’re agreeing to our Terms of
                        Service and Privacy Policy. Thanks!
                    </p>
                </Card>
    </div>
</>
    
  )
}

export default StepOtp