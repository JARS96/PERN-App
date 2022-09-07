import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Navbar from './components/NavBar';
import {Container} from '@mui/material';



export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
      <Routes>
        <Route path='/'element={<TaskList/>} />
        <Route path='/tasks/new' element={<TaskForm/>}/>
        {/*Edit route is empty, fix it*/}
      </Routes>
      </Container>
    </BrowserRouter>
  );
};
