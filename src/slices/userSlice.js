import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const initialState = {
  id: null,
  username: null,
  avatar: null,
  movies: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.id = action.payload;
      Cookie.set("id", action.payload, {
        expires: 1,
      });
    },
    loginUser: (state, action) => {
      state.username = action.payload;
      Cookie.set("username", action.payload, { expires: 1 });
    },
    setAvatarId: (state, action) => {
      state.avatar = action.payload;
    },
    setMovies: (state, action) => {
      state.movies = [...state.movies, action.payload];
    },
    resetMovies: (state) => {
      state.movies = [];
    },

    logOutUser: (state, action) => {
      state.id = null;
      state.user = null;
      state.movies = [];
      Cookie.remove("id");
      Cookie.remove("username");
      Cookie.remove("movies");
    },
  },
});

export const {
  setUserId,
  loginUser,
  setAvatarId,
  setMovies,
  resetMovies,
  logOutUser,
} = userSlice.actions;

export const selectId = (state) => state.user.id;
export const selectAvatarId = (state) => state.user.avatar;
export const selectUserName = (state) => state.user.username;
export const selectMovies = (state) => state.user.movies;

export default userSlice.reducer;
