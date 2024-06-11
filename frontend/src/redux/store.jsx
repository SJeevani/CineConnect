// create redux store
import {configureStore} from '@reduxjs/toolkit'
import userAdminReducer from './slices/UserAdminSlice'

export const store=configureStore({
    reducer:{
        userAdminLoginReducer:userAdminReducer
    }
})