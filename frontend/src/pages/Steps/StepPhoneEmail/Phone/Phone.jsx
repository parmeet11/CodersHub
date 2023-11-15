import React, { useState } from 'react';
import Card from '../../../../components/shared/Card/Card';
import Button from '../../../../components/shared/Button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import styles from '../StepPhoneEmail.module.css';
import { sendOtp } from '../../../../http/index';
import { useDispatch } from 'react-redux';
import { setOtp } from '../../../../store/authSlice';

const Phone = ({onNext}) => {

  const [phone, setPhone] = useState('');
   const dispatch = useDispatch();

  const submit = async () => {

    const { data } = await sendOtp({phone: phone});
    console.log(data);

    dispatch(setOtp({ phone: data.phone, hash: data.hash}));

    onNext();
  }

  

  return (
    <Card title="Enter your Phone Number" icon="phone11">
          <TextInput value={phone} onChange={(e) => setPhone(e.target.value)} />
          
            <div className={styles.btnWrap}>
              <Button  text='Next' onClick={submit}/>
            </div>
            <p className={styles.bottomParagraph}>
                      By entering your number, you’re agreeing to our Terms of
                      Service and Privacy Policy. Thanks!
            </p>
          
    </Card>
  )
}

export default Phone