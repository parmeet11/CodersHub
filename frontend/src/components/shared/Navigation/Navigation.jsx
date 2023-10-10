import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const navigation = () => {
  /*  javascript object */
  const inlineStyle = {
      gradient:{
      background: '-webkit-linear-gradient(#F0247A, #E3C31A)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      },

        textDecoration: 'none', /* to remove underline */
        fontWeight: 'bold',
        fontSize: '30px',
        display: 'flex',
        alignItems: 'center',
  }

  const logoText = {
    marginLeft: '10px',
    fontWeight: '30px'
};

  return (
    
    <nav className={`${styles.navbar} container`}>
      <Link style={inlineStyle} to="/">
        <img src='/images/logo.png' alt='logo'/>
        <div style={inlineStyle.gradient}>
        <span style={logoText} >CodersHub</span>
        </div>
      </Link>
    </nav>
    
  )
}

export default navigation;
