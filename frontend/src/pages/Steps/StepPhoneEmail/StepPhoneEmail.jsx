import React, {useState} from 'react';
import Phone from './Phone/Phone';
import Email from './Email/Email';
import styles from './StepPhoneEmail.module.css';

const phoneEmail = {
  phone: Phone,
  email: Email,
}

const StepPhoneEmail = ({onNext}) => {

  const [type, setType] = useState('phone');
  const Component = phoneEmail[type];
    
  

  return (
    <>

      <div className={styles.cardWrapper}>
          
            <div className={styles.btnWrapper}>
              <button className={`${styles.tabButton} ${type=== 'phone' ? styles.active: ``}`} onClick={() => setType('phone')}>
                <img  src='/images/mob.png' alt='phone' />
              </button>

              <button className={`${styles.tabButton} ${type=== 'email' ? styles.active: ``}`} onClick={() => setType('email')}>
              <img className={styles.email} src='/images/email3.png' alt='email' />
              </button>
            
          </div>
        <Component onNext={onNext}/>
      </div>

        
        
    </>
  )
}

export default StepPhoneEmail;