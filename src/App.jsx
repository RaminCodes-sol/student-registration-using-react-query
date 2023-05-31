import { Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage'
import StudentPage from "./pages/StudentPage"
import EditStudent from "./pages/EditStudent"
import AddStudent from "./pages/AddStudent"


const App = () => {
  return (
   <div id='app'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/studentPage/:id' element={<StudentPage />} />
        <Route path='/editStudent/:id' element={<EditStudent />} />
        <Route path='/addStudent' element={<AddStudent />} />
      </Routes>
   </div>
  )
}

export default App
