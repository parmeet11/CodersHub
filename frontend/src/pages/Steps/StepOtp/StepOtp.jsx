import React, {useState} from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepOtp.module.css';


const StepOtp = ({onNext}) => {

  const [otp, setOtp] = useState('');

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
                        <Button  text="Next" />
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