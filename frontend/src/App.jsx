import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import ProductForm from './pages/ProductForm'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'



import './App.css'

function App() {

    
   
  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Navigate to="/login" />}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      <Route path='/product-form' element={<ProductForm/>}/>
      <Route path='/product-form/:id' element={<ProductForm/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
