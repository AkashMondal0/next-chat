import { create } from "zustand";

interface ScrollToTopState {
    state: number;
    setState: () => void;
}


const useScrollToTop = create<ScrollToTopState>((set) => ({
    state: 0,
    setState: () => set((pre) => ({ state: pre.state + 1 })),
}))

export default useScrollToTop;