import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import TextInput from '../../../components/shared/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../store/activateSlice';
import styles from './StepName.module.css';

const StepName = ({onNext}) => {
  
  const { name } = useSelector((state) => state.activate);//fetch name from store as if going back to that page it will be blank
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState(name); //set as default parameter


  function nextStep() {
    if (!fullname) {
        return;
    }
    dispatch(setName(fullname));
    onNext();
}

  return (
    <>
            <Card title="What’s your full name?" icon="name">
                <TextInput
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                <p className={styles.paragraph}>
                    Please Enter your real Name :) !
                </p>
                <div>
                    <Button onClick={nextStep} text="Next" />
                </div>
            </Card>
        </>
    
  )
}

export default StepName