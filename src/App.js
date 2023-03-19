import './App.css';
// Importation des modules
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";


// Importation des pages
import Home from "./pages/home/home.jsx";
import Navbar from './components/NavBar/NavBar.jsx';
import Recherche from './pages/Recherche/recherche.jsx'
import Footer from './components/Footer/Footer.jsx'
// App
function App() {
  

  return (
    <>
    
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/recherche' element={<div><Recherche /></div>} />
        
          <Route path="*" element={<h1> error 404</h1>} />
        </Routes>
        <Footer/> 
    </>
  );
}

export default App;