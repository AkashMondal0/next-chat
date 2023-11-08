"use client"
import { messaging } from '@/firebase.config';
import React, { useEffect } from 'react'
import { getToken, isSupported } from 'firebase/messaging';
import { useMutation } from '@tanstack/react-query';
import { updateProfileCloudMessageId } from '@/Query/user';


const Notification_Provider = ({ children }: { children: React.ReactNode }) => {

    const mutation = useMutation({ mutationFn: updateProfileCloudMessageId })

    const fun = async () => {
        const isSupportedBrowser = await isSupported();
        if (isSupportedBrowser) {
            await getToken(messaging as any,
                { vapidKey:process.env.NEXT_PUBLIC_FIREBASE_VAP_ID_KEY })
                .then((currentToken) => {
                    if (currentToken) {
                        // ...
                        // console.log(currentToken)
                        // Send the token to your db for storing
                        mutation.mutate(currentToken)
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
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default Notification_Provider