import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Create from './components/Create/Create';
import Update from './components/Update/Update';


function App() {
  return (
    <div className="App">
      {/* <Form /> */}
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/create" element={<Create/>}></Route>
      <Route path="/edit/:id" element={<Update/>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
