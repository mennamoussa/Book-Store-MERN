import './App.css';
 //import Navbar from './components/Navbar/Navbar';
 import { BrowserRouter, Routes, Route } from 'react-router-dom';
 import HomePage from './pages/HomePage/HomePage.jsx';
 import Register from './pages/Registration/Register.jsx'
 
 
 function App() {
   return (
     <div>
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/registration" element={<Register />} />
         </Routes>
       </BrowserRouter>
     </div>
   );
 }
 
 export default App;