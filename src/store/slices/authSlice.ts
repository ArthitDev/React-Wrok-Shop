import { UserData, UserState } from "@/models/user.model";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as serverService from '@/services/serverService'
import httpClient from "@/utils/httpClient";
import { RootState, store } from "../store";

const initialState : UserState = {
    user:undefined,
    accessToken: '',
    isAuthenticated:false,
    isAuthenticating:true
}

interface SetUser{
    user:UserData
}
interface SignInAction{
    username : string
    password : string
}

export const signIn = createAsyncThunk('user/signin',async (credential:SignInAction) => {
    const response = await serverService.singIn(credential)

    httpClient.interceptors.request.use((config) =>{
        config.headers['Authorization'] = `Bearer ${response.accessToken}`
        return config
    })

    return response
})


const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<SetUser>) => {
          state.user = action.payload.user;
        },
    },
   extraReducers:(builder)=>{
    builder.addCase(signIn.fulfilled,(state,action) =>{
        state.accessToken=action.payload.accessToken
        state.user=action.payload.user
        state.isAuthenticated= true
        state.isAuthenticating=false
    })
  }
})

export const {setUser} = authSlice.actions

export default authSlice.reducer

export const userSelector = (store:RootState): UserData | undefined => store.user.user