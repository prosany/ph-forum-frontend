import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  isLoggedIn: false,
  loading: false,
  error: false,
  message: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginComplete: (state, { payload }: PayloadAction<any>) => {
      state.isLoggedIn = true;
      state.error = false;
      state.user = payload;
    },
    loginFailure: (state, { payload }: PayloadAction<any>) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = true;
      state.message = payload;
    },
    logOut: (state, action: PayloadAction) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.error = false;
      state.message = null;
      state.user = null;
    },
  },
});

// Actions
export const authAction = authSlice.actions;
const persistConfig = {
  keyPrefix: `phforum-`,
  key: "login",
  storage,
};

export default persistReducer(persistConfig, authSlice.reducer);
