import React, { useState ,useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addTask } from '../store/Reducers/taskReducer';
import { Link, useNavigate } from 'react-router-dom';

const Create = () => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [message,setMessage] = useState('');
  
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const handleNameChange = ({target:{value}})=>setName(value);
    const handleDescriptionChange = ({target:{value}})=> setDescription(value);
  

    const handleSubmit = (e)=>{
        e.preventDefault();  
        if(name.length < 2 && description.length < 1){
            setMessage("Name length should be less then 2 && Description length should be less than 1 ")
        }else{
          const newTask = {id:uuidv4(),name,description,startDate:JSON.stringify(startDate),completed:false};
          dispatch(addTask(newTask));
          setName('');
          setDescription('');
        }
        navigation("/");
    }
  
useEffect(()=>{
  let timer = setTimeout(()=>{
    setMessage("");
  },3000)
 return ()=> clearTimeout(timer);
})

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'> 
      <div className='w-50 border bg-secondary text-white p-5'>
        <h3>Add New Task</h3>
        <form onSubmit={handleSubmit}>
            <div className='mt-2'>
                 <label htmlFor='name'>Name:</label>
                 <input 
                  type="text" 
                  name="name" 
                  value={name}
                  onChange={handleNameChange}
                  className='form-control'
                  placeholder='Name'
                  />
            </div>
            <div className='mt-2'>
                 <label htmlFor='description'>Description:</label>
                 <input 
                 type="text"
                 name="description" 
                 value={description} 
                 onChange={handleDescriptionChange} 
                 className='form-control'
                 placeholder='Description'
                 />
            </div>
            <div className='mt-2'>
                 <label htmlFor='dueDate'>dueDate:</label>
                 <br/>
                 <DatePicker
                  selected={startDate}
                  className='form-control' 
                  onChange={(date) => setStartDate(date)} 
                  />
            </div>
            <br/>
            <div>
            <button className='btn btn-info'>Submit</button>
            <Link to="/" className='btn btn-primary mx-2'>Back to Home</Link>
            </div>
            <p className={`text-danger bg-white ${message && 'p-2'} my-3`} style={{width:"37rem"}}>{message}</p>
        </form>
      </div>
    </div>
  )
}

export default Create