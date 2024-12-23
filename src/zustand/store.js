import { create } from "zustand";

const useStatusStore = create((set) => ({
  selectedStatus: "",
  setSelectedStatus: (status) => set({ selectedStatus: status }),
}));

export default useStatusStore;
