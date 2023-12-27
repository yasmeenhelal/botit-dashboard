import{BrowserRouter,Routes,Route} from 'react-router-dom'

//pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Products from './pages/Products';


function App () {

 return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="pages">
      <Routes>
    
      <Route
        path="/"
        element={<Home />}
        />

     <Route
      path="/products"
      element={<Products />}
      />
    
      </Routes>

      </div>

      </BrowserRouter>
    </div>
 );
}

export default App;