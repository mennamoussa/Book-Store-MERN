import './App.css';
 //import Navbar from './components/Navbar/Navbar';
 import { BrowserRouter, Routes, Route } from 'react-router-dom';
 import HomePage from './pages/HomePage/HomePage.jsx';
 
 
 function App() {
   return (
     <div>
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<HomePage />} />
         </Routes>
       </BrowserRouter>
     </div>
   );
 }
 
 export default App;