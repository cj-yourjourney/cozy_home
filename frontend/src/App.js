import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProfileUpdateScreen from "./screens/ProfileUpdateScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import ReviewScreen from "./screens/ReviewScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from 'react-bootstrap'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id/" element={<ProductScreen />} />
            <Route path="/product/:id/reviews/" element={<ReviewScreen />} />

            <Route path="/cart/:id?" element={<CartScreen />} />

            <Route path="/register/" element={<RegisterScreen />} />
            <Route path="/login/" element={<LoginScreen />} />
            <Route path="/profile/" element={<ProfileScreen />} />
            <Route path="/profile/update/" element={<ProfileUpdateScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
