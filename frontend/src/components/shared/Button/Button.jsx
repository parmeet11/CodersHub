import React from 'react';
import styles from './Button.module.css';

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick} className={styles.btn}> 
        <span>{text}</span>
            <img className={styles.icon} src='/images/Vector.png' alt='arrow'/>
    </button>  
  )
}

export default Button;