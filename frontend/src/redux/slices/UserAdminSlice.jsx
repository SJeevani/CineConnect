import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { axiosWithToken } from '../../axiosWithToken.jsx';

export const userAdminLoginThunk=createAsyncThunk('user-admin-login',async(userCredObj,thunkApi)=>{
    try{
        if (userCredObj.userType==='user'){
            const res=await axios.post('http://localhost:4000/user-api/login',userCredObj)
            if(res.data.message==='Login success'){
                // store token in local or session storage
                localStorage.setItem('token',res.data.token)
                // return data

            }else{
                return thunkApi.rejectWithValue(res.data.message)
            }
            return res.data
        }
        if(userCredObj.userType==='admin'){
            const res=await axios.post('http://localhost:4000/admin-api/login',userCredObj)
            if(res.data.message==='Login success'){
                // store token in local or session storage
                localStorage.setItem('token',res.data.token)
                // return data
                
            }else{
                return thunkApi.rejectWithValue(res.data.message)
            }
            return res.data
        }
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

// Thunk for adding a favorite
export const addFavoriteThunk = createAsyncThunk('add-favorite', async (movieId, thunkApi) => {
    try {
        const { username } = thunkApi.getState().userAdminLoginReducer.currentUser;
        const response = await axiosWithToken.post(`http://localhost:4000/user-api/movie/favorite/${movieId}/add`, { username });
        if (response.data.message === 'Successfully added to favorites') {
            return movieId;
        } else {
            return thunkApi.rejectWithValue(response.data.message);
        }
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

// Thunk for removing a favorite
export const removeFavoriteThunk = createAsyncThunk('remove-favorite', async (movieId, thunkApi) => {
    try {
        const { username } = thunkApi.getState().userAdminLoginReducer.currentUser;
        const response = await axiosWithToken.post(`http://localhost:4000/user-api/movie/favorite/${movieId}/remove`, { username });
        if (response.data.message === 'Successfully removed from favorites') {
            return movieId;
        } else {
            return thunkApi.rejectWithValue(response.data.message);
        }
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const userAdminSlice = createSlice({
    name: "user-admin-slice",
    initialState: {
        isPending: false,
        loginUserStatus: false,
        currentUser: {},
        errorOccured: false,
        errMsg: ''
    },
    reducers: {
        resetState: (state) => {
            state.isPending = false;
            state.loginUserStatus = false;
            state.currentUser = {};
            state.errorOccured = false;
            state.errMsg = '';
        }
    },
    extraReducers: (builder) => builder
        .addCase(userAdminLoginThunk.pending, (state) => {
            state.isPending = true;
        })
        .addCase(userAdminLoginThunk.fulfilled, (state, action) => {
            state.isPending = false;
            state.currentUser = action.payload.user;
            state.loginUserStatus = true;
            state.errMsg = '';
            state.errorOccured = false;
        })
        .addCase(userAdminLoginThunk.rejected, (state, action) => {
            state.isPending = false;
            state.currentUser = {};
            state.loginUserStatus = false;
            state.errMsg = action.payload;
            state.errorOccured = true;
        })
        .addCase(addFavoriteThunk.fulfilled, (state, action) => {
            state.currentUser.favorites = [...(state.currentUser.favorites || []), action.payload];
        })
        .addCase(removeFavoriteThunk.fulfilled, (state, action) => {
            state.currentUser.favorites = state.currentUser.favorites.filter(id => id !== action.payload);
        })
        .addCase(addFavoriteThunk.rejected, (state, action) => {
            state.errMsg = action.payload;
            state.errorOccured = true;
        })
        .addCase(removeFavoriteThunk.rejected, (state, action) => {
            state.errMsg = action.payload;
            state.errorOccured = true;
        })
});

export const { resetState } = userAdminSlice.actions;
export default userAdminSlice.reducer;





// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';
// import { axiosWithToken } from '../../axiosWithToken.jsx';

// // Thunk for user/admin login
// export const userAdminLoginThunk = createAsyncThunk('user-admin-login', async (userCredObj, thunkApi) => {
//     try {
//         let res;
//         if (userCredObj.userType === 'user') {
//             res = await axios.post('http://localhost:4000/user-api/login', userCredObj);
//         } else if (userCredObj.userType === 'admin') {
//             res = await axios.post('http://localhost:4000/admin-api/login', userCredObj);
//         }

//         if (res.data.message === 'Login success') {
//             // Store token in local storage
//             localStorage.setItem('token', res.data.token);
//             return res.data;
//         } else {
//             return thunkApi.rejectWithValue(res.data.message);
//         }
//     } catch (err) {
//         return thunkApi.rejectWithValue(err);
//     }
// });

// // Thunk for adding a favorite
// export const addFavoriteThunk = createAsyncThunk('add-favorite', async (movieId, thunkApi) => {
//     try {
//         const { username } = thunkApi.getState().userAdminLoginReducer.currentUser;
//         const response = await axiosWithToken.post(`http://localhost:4000/user-api/movie/favorite/${movieId}/add`, { username });
//         if (response.data.message === 'Successfully added to favorites') {
//             return movieId;
//         } else {
//             return thunkApi.rejectWithValue(response.data.message);
//         }
//     } catch (error) {
//         return thunkApi.rejectWithValue(error.message);
//     }
// });

// // Thunk for removing a favorite
// export const removeFavoriteThunk = createAsyncThunk('remove-favorite', async (movieId, thunkApi) => {
//     try {
//         const { username } = thunkApi.getState().userAdminLoginReducer.currentUser;
//         const response = await axiosWithToken.post(`http://localhost:4000/user-api/movie/favorite/${movieId}/remove`, { username });
//         if (response.data.message === 'Successfully removed from favorites') {
//             return movieId;
//         } else {
//             return thunkApi.rejectWithValue(response.data.message);
//         }
//     } catch (error) {
//         return thunkApi.rejectWithValue(error.message);
//     }
// });

// export const userAdminSlice = createSlice({
//     name: "user-admin-slice",
//     initialState: {
//         isPending: false,
//         loginUserStatus: false,
//         currentUser: {},
//         errorOccured: false,
//         errMsg: ''
//     },
//     reducers: {
//         resetState: (state) => {
//             state.isPending = false;
//             state.loginUserStatus = false;
//             state.currentUser = {};
//             state.errorOccured = false;
//             state.errMsg = '';
//         },
//         checkUser: (state) => {
//             const token = localStorage.getItem('token');
//             if (token) {
//                 const user = jwtDecode(token);
//                 state.loginUserStatus = true;
//                 state.currentUser = user;
//             }
//         }
//     },
//     extraReducers: (builder) => builder
//         .addCase(userAdminLoginThunk.pending, (state) => {
//             state.isPending = true;
//         })
//         .addCase(userAdminLoginThunk.fulfilled, (state, action) => {
//             state.isPending = false;
//             state.currentUser = action.payload.user;
//             state.loginUserStatus = true;
//             state.errMsg = '';
//             state.errorOccured = false;
//         })
//         .addCase(userAdminLoginThunk.rejected, (state, action) => {
//             state.isPending = false;
//             state.currentUser = {};
//             state.loginUserStatus = false;
//             state.errMsg = action.payload;
//             state.errorOccured = true;
//         })
//         .addCase(addFavoriteThunk.fulfilled, (state, action) => {
//             state.currentUser.favorites = [...(state.currentUser.favorites || []), action.payload];
//         })
//         .addCase(removeFavoriteThunk.fulfilled, (state, action) => {
//             state.currentUser.favorites = state.currentUser.favorites.filter(id => id !== action.payload);
//         })
//         .addCase(addFavoriteThunk.rejected, (state, action) => {
//             state.errMsg = action.payload;
//             state.errorOccured = true;
//         })
//         .addCase(removeFavoriteThunk.rejected, (state, action) => {
//             state.errMsg = action.payload;
//             state.errorOccured = true;
//         })
// });

// export const { resetState, checkUser } = userAdminSlice.actions;
// export default userAdminSlice.reducer;
