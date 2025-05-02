import './App.css';
 //import Navbar from './components/Navbar/Navbar';
 import { BrowserRouter, Routes, Route } from 'react-router-dom';
 import HomePage from './pages/HomePage/HomePage.jsx';
 import Register from './pages/Registration/Register.jsx'
 import Login from './pages/Login/Login.jsx'
 import AllBooks from './pages/Books/AllBooks.jsx'
 import UserProfile from './pages/Profile/UserProfile.jsx';
 import LibraryCardOptions from './pages/LibraryCard/LibraryCardOptions.jsx';
 import RenewCard from './pages/LibraryCard/Forms/RenewCard.jsx';
import LostCard from './pages/LibraryCard/Forms/LostCard.jsx';
import NewCard from './pages/LibraryCard/Forms/NewCard.jsx';
 
 
 function App() {
   return (
     <div>
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/registration" element={<Register />} />
           <Route path="/login" element={<Login />} />
           <Route path="/all-books" element={<AllBooks />} />
           <Route path="/profile" element={<UserProfile />} />
           <Route path="/library-card" element={<LibraryCardOptions />} />
           <Route path="/library-card/renew" element={<RenewCard />} />
           <Route path="/library-card/lost" element={<LostCard />} />
           <Route path="/library-card/new" element={<NewCard />} />
         </Routes>
       </BrowserRouter>
     </div>
   );
 }
 
 export default App;