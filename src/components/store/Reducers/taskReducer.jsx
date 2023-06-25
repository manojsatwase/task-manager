import { createSlice } from "@reduxjs/toolkit";


const taskSlice = createSlice({
    name:"task",
    initialState:[],
    reducers:{
       addTask(state,action){
         state.push(action.payload);
       },
       updateTask(state,action){
        const {id,name,description,startDate,completed} = action.payload;
        const updateTask = state.find(task=>task.id === id);

        if(updateTask){
            updateTask.name = name;
            updateTask.description = description;
            updateTask.startDate = startDate;
            updateTask.completed = completed;
        }
       },
       deleteTask(state,{payload:id}){
         const exist = state.find(task=>task.id === id);
         if(exist){
            return state.filter(task=>task.id !== id)
         }
       },
       toggleCheckbox(state,{payload}){
        const newTask = state.find(task=>task.id === payload);
      if(newTask){
        newTask.completed = !state.find(task=>task.id === payload).completed
      }
     },
     deleteAllTask(){
        return [];
     } ,
     toggleComplete: (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        state[index].completed = action.payload.completed;
    },
    }
})

export const {addTask,updateTask,deleteTask,toggleCheckbox,deleteAllTask,toggleComplete} = taskSlice.actions;
export default taskSlice.reducer;