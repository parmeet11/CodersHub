import React, {useState} from 'react';
import Card from '../../../../components/shared/Card/Card';
import Button from '../../../../components/shared/Button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import styles from '../StepPhoneEmail.module.css';

const Email = ({onNext}) => {

  const [email, setEmail] = useState();

  return (
    <Card title="Enter your Email" icon="email22">
      <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />

          <div className={styles.btnWrap}>
            <Button  text='Next' onClick={onNext}/>
          </div>
          <p className={styles.bottomParagraph}>
                      By entering your number, you’re agreeing to our Terms of
                      Service and Privacy Policy. Thanks!
          </p>
    </Card>
  )
}

export default Email