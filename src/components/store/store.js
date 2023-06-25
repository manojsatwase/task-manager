import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./Reducers/taskReducer";

const store = configureStore({
    reducer:{
        allTask: taskReducer
    }
})

export default store;