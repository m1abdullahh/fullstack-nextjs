import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createUserSlice } from "./user-slice";
import { type AuthStore } from "./types";

export const useAuthStore = create<AuthStore>()(
  persist(
    immer((...a) => ({
      ...createUserSlice(...a),
    })),
    {
      name: "auth-store",
      onRehydrateStorage: (state) => {
        state.setHasHyderated(true);
      },
    },
  ),
);

/**
 * Required for zustand stores, as the lib doesn't expose this type
 */
export type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

const accessTokenSelector = (state: ExtractState<typeof useAuthStore>) =>
  state.authToken;

export const getAccessToken = () =>
  accessTokenSelector(useAuthStore.getState());
