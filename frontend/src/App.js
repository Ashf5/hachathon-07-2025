
import './App.css';
import MainNavbar from './components/MainNavbar';
import MainPage from './MainPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/MainNavbar.css'
import './components/MainContentCard.css'
import {Routes, Route} from 'react-router-dom';

import 'react-calendar/dist/Calendar.css'

import BookPage from './BookPage';
import DashboardPage from './DashboardPage.js';

function App() {
  return (
    <div className="App">
      <MainNavbar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/book' element={<BookPage />} />
        <Route path='/admin' element={<DashboardPage />} />
      </Routes>
      
      
    </div>
  );
}

export default App;
