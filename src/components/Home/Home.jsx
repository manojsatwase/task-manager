import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import { deleteAllTask, deleteTask, toggleCheckbox } from '../store/Reducers/taskReducer';

import { filterData } from '../Helper/Helper';

const Home = () => {
    const [searchText,setSearchText] = useState('');
    const allTask = useSelector(state=>state.allTask);
    const [allTaskList,setAllTaskList] = useState([]);
    const [filtered,setFilteredTask] = useState([]); 

    const dispatch = useDispatch();
  
    const handleDelete = (id)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this task!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Poof! Your task has been deleted!", {
                icon: "success",
              });
              dispatch(deleteTask(id))
            } else {
              swal("Your task is safe!");
            }
          });   
    }

    const handleCheckboxClick = (id)=> {
        dispatch(toggleCheckbox(id));
    }

     useEffect(() => {
        setAllTaskList(allTask);
        setFilteredTask(allTask);
     }, [searchText,allTask])
    
    const deleteAll=()=> dispatch(deleteAllTask());


  return (
    <div className='container'>
   
      <nav className="navbar navbar-dark bg-dark text-white my-5">
      <h3 className='mx-2'>Task Manager</h3>
      <h5 className='mx-5'>Total Task : {allTask?.length}</h5>
     </nav>

      <div className='row'>
        <div className='col-md-8'>
        <Link to="/create" className='btn btn-success '>Create +</Link>
        </div>
      <div className='col-md-4 mb-2' style={{display:"flex"}}>
      <input type='text' value={searchText} onChange={({target:{value}})=>setSearchText(value)} placeholder='search task' className='form-control py-2' />
      <button onClick={()=>{
       const data = filterData(searchText,allTaskList );
       setFilteredTask(data);
      }} className='btn btn-primary'>search</button>
      </div>
    
      </div>
    
      <table className='table'>
        <thead>
            <tr>
                <th></th>
                <th className='w-50'>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                filtered.map(item=>{
                    const currentDate = item?.startDate?.substring(1,11);
                  return  <tr key={item.id} style={item.completed===true?{textDecoration:'line-through'}:{textDecoration:'none'}}>
                        <td className='m-0'>
                        <input
						type='checkbox'
						className='mr-3'
                        defaultChecked={item?.completed}
						onClick={()=>handleCheckboxClick(item.id)}
					></input>
                        </td>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{currentDate}</td>
                        <td>
                            <Link to={`/edit/${item.id}`} className='btn btn-sm btn-primary'>Edit</Link>
                            <button onClick={()=>handleDelete(item.id)} className='btn btn-sm btn-danger ms-2'>Delete</button>
                        </td>
                    </tr>
          }  )
            }
        </tbody>
      </table>
     <div className='text-center col-md-4 mx-auto'>
     {allTask.length === 0 && <p style={{padding:"5px 20px"}}>No Tasks are added yet</p>}
      {allTask.length!==0 && <button onClick={deleteAll} className='btn btn-danger btn-md m-2 delete-all  w-100'>REMOVE ALL</button>}
     </div>
    </div>
  )
}

export default Home