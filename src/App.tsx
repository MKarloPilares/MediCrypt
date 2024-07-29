import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './MainPage';

const App = () => {
  
  return (
  <BrowserRouter>
    <MainPage/>
  </BrowserRouter>
  )
}

export default App;