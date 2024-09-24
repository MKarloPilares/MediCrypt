
import { BrowserRouter } from 'react-router-dom';
import MainPage from './MainPage';
import { Buffer } from 'buffer';

if (typeof global === 'undefined') {
  var global = window as any;
}

if (typeof global !== 'undefined') {
  global.Buffer = Buffer;
}


const App = () => {
  
  return (
  <BrowserRouter>
    <MainPage/>
  </BrowserRouter>
  )
}

export default App;