import './App.css';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Cart from './pages/Cart';
import {ItemProvider} from './ItemContext';

function App() {
  return (
    <div className="App">
      <ItemProvider>
        <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Home />}/>
              <Route path={"/cart"} element={<Cart />}/>
          </Routes>
        </BrowserRouter>
        </ItemProvider>
    </div>
  );
}

export default App;
 