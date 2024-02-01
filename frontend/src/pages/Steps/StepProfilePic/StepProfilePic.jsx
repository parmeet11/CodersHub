import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import styles from './StepProfilePic.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setPic } from '../../../store/activateSlice';
import {activate} from '../../../http';
import { setAuth } from '../../../store/authSlice';
import Loader from '../../../components/shared/Loader/Loader';

const StepProfilePic = ({onNext}) => {

   const dispatch = useDispatch();
    const { name, pic } = useSelector((state) => state.activate);
    const [image, setImage] = useState('/images/profile.png');
    const [loading, setloading] = useState(false);

    const capture_image = (e) => {//image is in file format so we have to convert it in baase 64
                                      //string and pass that in src attribute 
      const file = e.target.files[0];     
      const reader = new FileReader(); //make an instance of file reader API's
      reader.readAsDataURL(file); // it takes time to read the file 
      reader.onloadend = function(){   //anonymous function
        //console.log(reader.result);
        setImage(reader.result);
        dispatch(setPic(reader.result));

      }


      //console.log(e);           

    }

    const submit = async() =>{

      if(!name || !pic) return;

      setloading(true);
      try{
        const {data} = await activate({name, pic});
        if(data.auth){
            dispatch(setAuth(data));
        }

        //console.log(data);

      } catch(err) {
          console.log(err);
      } finally {
        setloading(false);
      }

    }
 
  if (loading) return <Loader message="Loading... Please Wait!!"/>


  return (
    <>
    <div className={styles.cardWrapper}>
      <Card title={`Hi, ${name}`} icon="hello">
                <p className={styles.subHeading}>Kindly Update your Profile Pic</p>
                <div className={styles.avatarWrapper}>
                    <img
                        className={styles.avatarImage}
                        src={image}
                        alt="avatar"
                    />
                </div>
                <div>
                    <input
                        onChange={capture_image}
                        id="avatarInput"
                        type="file"
                        className={styles.avatarInput}
                    />
                    <label className={styles.avatarLabel} htmlFor="avatarInput">
                        Choose a different photo
                    </label>
                </div>
                <div>
                    <Button onClick={submit} text="Next" />
                </div>
            </Card>
    </div>       
    </>
    
  )
}

export default StepProfilePic