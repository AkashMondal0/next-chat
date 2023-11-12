import { User } from "@/interface/type";
import { create } from "zustand";

interface personalizedData {
    searchUsers:User[];
    setSearchUsers: (data: User[]) => void;
}


const usePersonalizedData = create<personalizedData>((set) => ({
    searchUsers:[],
    setSearchUsers: (data) => set({ searchUsers: data }),
}))

export default usePersonalizedData;