import { type StateCreator } from "zustand";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
}

interface UserState {
  _hasHyderated: boolean;
  isLoggedIn: boolean;
  authToken: string | null;
  userInfo: User | null;
}

interface UserActions {
  setHasHyderated: (status?: boolean) => void;
  setLoggedInInfo: (info: User & { token: string }) => void;
  logout: () => void;
}

export type UserSlice = UserState & UserActions;

const initialValues: Omit<UserState, "_hasHyderated"> = {
  authToken: null,
  isLoggedIn: false,
  userInfo: null,
};

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set,
) => ({
  ...initialValues,
  _hasHyderated: false,
  logout: () => {
    set({
      ...initialValues,
    });
  },
  setHasHyderated: (status = true) => {
    set({ _hasHyderated: status });
  },
  setLoggedInInfo: ({ token, ...rest }) => {
    set({ authToken: token, userInfo: { ...rest } });
  },
});
