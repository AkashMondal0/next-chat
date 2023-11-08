"use client"
import { messaging } from '@/firebase.config';
import React, { useEffect } from 'react'
import { getToken, isSupported, onMessage } from 'firebase/messaging';


const Notification_Provider = ({ children }: { children: React.ReactNode }) => {


    const fun = async () => {
        const isSupportedBrowser = await isSupported();
        if (isSupportedBrowser) {
            await getToken(messaging as any,
                { vapidKey: process.env.VAPIDKEY })
                .then((currentToken) => {
                    if (currentToken) {
                        // Send the token to your server and update the UI if necessary
                        // ...
                        console.log(currentToken)
                    } else {
                        // Show permission request UI
                        console.log('No registration token available. Request permission to generate one.');
                        // ...
                    }
                }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                    // ...
                });
        }
    }

    useEffect(() => {
        if (!('Notification' in window)) {
            console.log('This browser does not support system notifications');
        } else if (Notification.permission === 'granted') {
            // new Notification(message);
            // console.log('granted')
            fun()
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    // new Notification(message);
                    console.log('granted')
                }
            });
        }
        onMessage(messaging as any, (payload) => {
            console.log('Message received. ', payload);
        });
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default Notification_Provider