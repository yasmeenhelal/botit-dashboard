import{BrowserRouter,Routes,Route} from 'react-router-dom'

//pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import SignUp from './pages/SignUp';
import Login from './pages/Login';


function App () {

 return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="pages">
      <Routes>
    
      <Route
        path="/"
        element={<Login />}
        />

     <Route
      path="/products"
      element={<Products />}
      />

      <Route
      path="/home"
      element={<Home />}
      />

      <Route
      path="/signup"
      element={<SignUp />}
      />

    
      </Routes>

      </div>

      </BrowserRouter>
    </div>
 );
}

export default App;