'use client'
import { FC, createContext, useMemo } from 'react';
export const PeerContext = createContext<any>(null)


interface Web_RtcProviderProps {
    children?: React.ReactNode
}
const Web_RtcProvider: FC<Web_RtcProviderProps> = ({
    children
}) => {

    const peer = useMemo(() =>  new RTCPeerConnection({
            iceServers: [
                {
                    urls: ['stun:stun.l.google.com:19302']
                }
            ]
        })

    , [])

    const createOffer = async () => {
        const offer = await peer.createOffer()
        await peer.setLocalDescription(offer)
        return offer
    }

    const createAnswer = async (ans:any) => {
        await peer.setRemoteDescription(ans)
        const answer = await peer.createAnswer()
        await peer.setLocalDescription(answer)
        return answer
    }

    const setRemoteDescription = async (offer:any) => {
        await peer.setRemoteDescription(offer)
    }


    return (
        <PeerContext.Provider value={{
            peer,
            createOffer,
            createAnswer,
            setRemoteDescription
        }}>
            {children}
        </PeerContext.Provider>
    );
};

export default Web_RtcProvider;