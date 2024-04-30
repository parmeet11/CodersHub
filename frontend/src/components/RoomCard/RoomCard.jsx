import React, { useState } from 'react'
import styles from './RoomCard.module.css';
import { useNavigate } from 'react-router-dom';
//import { useSelector } from 'react-redux';

const RoomCard = ({room}) => {
    
    const navigate = useNavigate();
   // const [room, setroom] = useState(room);
    //const { user } = useSelector((state) => state.auth);
   //console.log(room.speakers.avatar);
  return (
    <div onClick={() => {
        navigate(`/room/${room.id}`);
    }} className={styles.card}
        >
            <h3 className={styles.topic}>{room.topic}</h3>
            <div
                className={`${styles.speakers} ${
                    room.speakers.length === 1 ? styles.singleSpeaker : ''
                }`}
            >
                <div className={styles.avatars}>
                    {room.speakers.map((speaker,e) => (
                        <img
                            key={speaker.id}
                            src={speaker.avatar}
                            alt="speaker-avatar"
                           // onError={(e) => {
                               // console.error('Error loading image:', e.target.src);
                               // e.target.src = '/images/user-icon.png'; // Provide a fallback image
                             // }}
                        />
                    ))}
                </div>
                <div className={styles.names}>
                    {room.speakers.map((speaker) => (
                        <div key={speaker.id} className={styles.nameWrapper}>
                            <span>{speaker.name}</span>
                            <img
                                src="/images/chat-bubble.png"
                                alt="chat-bubble"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.peopleCount}>
                <span>{room.totalPeople}</span>
                <img src="/images/user-icon.png" alt="user-icon" />
            </div>
        </div>
    );
};    

export default RoomCard