import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes , Route } from 'react-router-dom';
import Favourites from './pages/Favourites';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [count, setCount] = useState(0)
  const [fav,setFav] = useState([])

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/fav' element={<Favourites set = {setFav} response={fav}/>}/>
        <Route path='/' element={<Home set = {setFav} response={fav} />}/>
      </Routes>
      <Footer/>
    <ToastContainer/>
  </>
  )
}

export default App
