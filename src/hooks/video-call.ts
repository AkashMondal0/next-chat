import { User, VideoCall } from "@/interface/type";
import { create } from "zustand";

interface videoCallingState {
    currentVideoState: {
        user: User | null;
        isVideoCall: boolean;
        videoCallUserId: string;
        conversationId: string;
    }
    startVideoCalling: (user: User, data: VideoCall) => void;
    endVideoCalling: () => void;
}


const useVideoCalling = create<videoCallingState>((set) => ({
    currentVideoState: {
        user: null,
        isVideoCall: false,
        videoCallUserId: "",
        conversationId: "",
    },
    startVideoCalling: (user: User, data: VideoCall) => set((pre) => ({
        currentVideoState: {
            isVideoCall: true,
            videoCallUserId: data.receiverId,
            user: user,
            conversationId: data.conversationId,
        }
    })),
    endVideoCalling: () => set((pre) => ({
        currentVideoState: {
            isVideoCall: false,
            videoCallUserId: "",
            user: null,
            conversationId: "",
        }
    })),
}))

export default useVideoCalling;