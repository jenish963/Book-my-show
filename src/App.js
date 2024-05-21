import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import SingleMovie from './Components/SingleMovie';
import TimeSelect from './Components/TimeSelect';
import SeatSelect from './Components/SeatSelect';

function App() {
  return (
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='movie' element={<SingleMovie/>}/>
    <Route path='time' element={<TimeSelect/>}/>
    <Route path='seat' element={<SeatSelect/>}/>
    </Routes>
  );
}

export default App;
