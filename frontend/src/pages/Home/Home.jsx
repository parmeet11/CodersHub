import React from 'react'
import styles from './Home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';


const Home = () => {

  const navigate = useNavigate();

  const register = () => {
    navigate('/authenticate');
    
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome To CodersHub" icon="logo">
          <div className={styles.text}>
            <p>
              CodersHub  is a platform where we can discuss, collect, share and explain varied projects, technologies, programs, tutorials etc. It is emphasis on unique projects and content plays a central role in assisting both new and professional coders.
            </p>
          </div>
          <div>
            <Button onClick={register} text='Create a New User'/>
          </div>
          <div>
            <span className={styles.acc}>Already Have an Account?</span>
              <Link className={styles.login} to="/login">Log In</Link>
          </div>
                        
        
      </Card>
      
    </div>
  )
}

export default Home;