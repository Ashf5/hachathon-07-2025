
import './App.css';
import MainNavbar from './components/MainNavbar';
import MainContentCard from './components/MainContentCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/MainNavbar.css'
import './components/MainContentCard.css'

import 'react-calendar/dist/Calendar.css'

import BookPage from './BookPage';

function App() {
  return (
    <div className="App">
      <MainNavbar />
      <MainContentCard />
      <BookPage />
    </div>
  );
}

export default App;
