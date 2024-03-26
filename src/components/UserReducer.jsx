import { createSlice } from "@reduxjs/toolkit";
import { userList } from "./Data";

const userSlice = createSlice({
    name:"users",
    initialState:userList,
    reducers:{
        addUser:(state,action)=>{
            state.push(action.payload)
            console.log(action)
        },
        updateUser:(state,action) =>{
            const{id,title,description} = action.payload;
            const uu=state.find(user =>user.id == id);
            if(uu){
                uu.title = title;
                uu.description =description;
            }
        },
        deleteUser:(state,action) =>{
            const{id} = action.payload;
            const uu=state.find(user =>user.id == id);
            if(uu){
              return state.filter(f => f.id !== id);
            }
        }
        
    }
})

export const {addUser,updateUser,deleteUser} = userSlice.actions
export default userSlice.reducer;