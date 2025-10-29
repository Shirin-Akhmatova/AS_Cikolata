import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/Home/HomePage";
import CartIcon from "./components/CartIcon/CartIcon";
import { CartProvider } from "./components/CartContext/CartContext";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import CartPage from "./pages/CartPage/CartPage";

function AppContent() {
  const location = useLocation();

  const showCart = location.pathname !== "/" && location.pathname !== "/cart";

  return (
    <>
      <Header />
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>

        {showCart && <CartIcon />}
      </div>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
