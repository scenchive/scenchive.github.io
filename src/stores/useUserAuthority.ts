import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserTypeState {
  userType: string;
  setUserType: (value: string) => void;
  resetUserType: () => void;
}
// userAuthority.ts
let resetUserTypeOutside = () => {};

const useUserTypeStore = create(
  persist<UserTypeState>(
    (set) => {
      resetUserTypeOutside = () => set({ userType: "" });

      return {
        userType: "",
        setUserType: (value: string) => set({ userType: value }),
        resetUserType: () => set({ userType: "" }),
      };
    },
    {
      name: "user-storage",
      getStorage: () =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            },
    }
  )
);

export const resetUserType = resetUserTypeOutside;
export default useUserTypeStore;
