
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Jugar from './pages/Jugar'
import Resultado from './pages/Resultado'
import Puntajes from './pages/puntajes'
import Configuracion from './pages/Configuracion'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/jugar' element={<Jugar/>}/>
          <Route path='/configuracion' element={<Configuracion/>}/>
          <Route path='/puntajes' element={<Puntajes/>}/>
          <Route path='/resultado' element={<Resultado/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
