import './App.css'
import StudentTable from './component/StudentTable';
import CourseTable from './component/CourseTable';
import ScheduleTable from './component/ScheduleTable';
import Nav from './Nav';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className="p-4">
      <Nav />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<StudentTable />}></Route>
        <Route path='students' element={<StudentTable />}></Route>
        <Route path='courses' element={<CourseTable />}></Route>
        <Route path='schedules' element={<ScheduleTable />}></Route>
      </Routes>
    </div>
  )
}

export default App
