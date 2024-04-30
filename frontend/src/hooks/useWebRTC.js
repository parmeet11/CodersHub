import { useEffect, useState, useRef, useCallback } from 'react';
import { useStateWithCallback } from './useStateWithCallBack'
import {socketInit} from '../socket';



export const useWebRTC = (roomId, user) => {
    
    const [clients, setClients] = useStateWithCallback([]);
    const audioElements = useRef({});
    const connections = useRef({});
    const socket = useRef(null);
    const localMediaStream = useRef(null);
    
   
    useEffect(() => {
        socket.current = socketInit();
    },[]);

    const addNewClient = useCallback(
        (newClient, cb) => {
            const lookingFor = clients.find(
                (client) => client.id === newClient.id
            );

            if (lookingFor === undefined) {
                setClients(
                    (existingClients) => [...existingClients, newClient],
                    cb
                );
            }
        },
        [clients, setClients]
    );

    useEffect(() => {
        const startCapture = async () => {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
        }
        startCapture().then(() =>{
            addNewClient(user, () =>{
                const localElement = audioElements.current[user.id];
                if (localElement) {
                    localElement.volume = 0;
                    localElement.srcObject = localMediaStream.current;
                }
                //socket emit join socket io
                socket.current.emit('ACTIONS.JOIN', {roomId, user});
            });
        });
    }, []);

    const provideRef = (instance, userId)  => {
        audioElements.current[userId] = instance;
    }

    

  return {clients, provideRef};
  
}
