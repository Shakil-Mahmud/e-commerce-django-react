import {Container} from 'react-bootstrap'
import Header  from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App container">
        <Header />
          <main>
            <Container>
              <Routes>
                <Route  path='/' element={<HomeScreen />} />
                <Route  path='/login' element={<LoginScreen />} />
                <Route  path='/register' element={<RegisterScreen />} />
                <Route  path='/profile' element={<ProfileScreen />} />
                <Route  path='/shipping' element={<ShippingScreen />} />
                <Route  path='/payment' element={<PaymentScreen />} />
                <Route  path='/placeorder' element={<PlaceOrderScreen />} />
                <Route  path='/product/:id' element={<ProductScreen />} />
                <Route  path='/cart' element={<CartScreen />} />
                <Route  path='/cart/:id' element={<CartScreen />} />
              </Routes>
            </Container>
          </main>
          <Footer />
      </div>
    </Router>
  );
}

export default App;