import React,{useState} from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { updateTask } from '../store/Reducers/taskReducer';

const Update = () => {
    const  { id } = useParams();
   const allTask = useSelector(state=>state?.allTask);

    const existingTask = allTask.filter(task=>task?.id === id);
    const {name,description,completed} = existingTask?.[0];

    const [updateName,setUpdateName] = useState(name);
    const [updateDescription,setUpdateDescription] = useState(description);
    const [startDate, setStartDate] = useState(new Date());

    const dispatch = useDispatch();
    const navigation = useNavigate();

   const handleUpdate = (e)=>{
    e.preventDefault();
    dispatch(updateTask(
        {
            id,
            name:updateName,
            description:updateDescription,
            startDate:JSON.stringify(startDate),
            completed: completed 
        }
    ))
    navigation("/");
   } 
  
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'> 
      <div className='w-50 border bg-secondary text-white p-5'>
        <h3>Update Task</h3>
        <form onSubmit={handleUpdate}>
            <div className='mt-2'>
                 <label htmlFor='name'>Name:</label>
                 <input 
                  type="text" 
                  name="name" 
                  value={updateName}
                  className='form-control'
                  placeholder='Name'
                  onChange={e=>setUpdateName(e.target.value)}
                  />
            </div>
            <div className='mt-2'>
                 <label htmlFor='description'>Description:</label>
                 <input 
                 type="text"
                 name="description" 
                 value={updateDescription}
                 className='form-control'
                 placeholder='Description'
                 onChange={e=>setUpdateDescription(e.target.value)}
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
            <button className='btn btn-info'>Update</button>
            <Link to="/" className='btn btn-primary mx-2'>Back to Home</Link>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Update