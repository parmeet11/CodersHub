import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../http';
import styles from './Navigation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';

const Navigation = () => {
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

  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  const logoutUser = async() => {
    try {
        const { data } = await logout();
        dispatch(setAuth(data));
    } catch (err) {
        console.log(err);
    }
  }




  return (
    
    <nav className={`${styles.navbar} container`}>
      <Link style={inlineStyle} to="/">
        <img src='/images/logo.png' alt='logo'/>
        <div style={inlineStyle.gradient}>
        <span style={logoText} >CodersHub</span>
        </div>
      </Link>
      {isAuth && (
                <div className={styles.navRight}>
                    <h3>{user?.name}</h3>
                    <Link to="/">
                        <img
                            className={styles.avatar}
                            src={
                                user.pic
                                    ? user.pic
                                    : '/images/profile.png'
                            }
                            width="40"
                            height="40"
                            alt="avatar"
                        />
                    </Link>
                    <button
                        className={styles.logoutButton}
                        onClick={logoutUser}
                    >
                        <img src="/images/logout.png" alt="logout" />
                    </button>
                </div>
            )}
    </nav>
    
  )
}

export default Navigation;
