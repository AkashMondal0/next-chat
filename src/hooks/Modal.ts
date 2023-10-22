import { create } from 'zustand'


type name = "Search_Modal" | "Add_Modal" | "Edit_Modal" | "Delete_Modal" | null

type ModalState = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  type: name
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  type: null
}))