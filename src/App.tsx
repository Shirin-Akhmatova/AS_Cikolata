import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/Home/HomePage";
import DessertsPage from "./pages/DessertsPage/DessertsPage";
import HotDrinksPage from "./pages/HotDrinksPage/HotDrinksPage";
import ColdDrinksPage from "./pages/ColdDrinksPage/ColdDrinksPage";
import BreakfastPage from "./pages/BreakfastPage/BreakfastPage";
import CartIcon from "./components/CartIcon/CartIcon";
import { CartProvider } from "./components/CartContext/CartContext";

function AppContent() {
  const location = useLocation();

  const showCartPaths = ["/desserts", "/hot", "/cold", "/breakfast"];
  const showCart = showCartPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <Header />
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/desserts" element={<DessertsPage />} />
          <Route path="/hot" element={<HotDrinksPage />} />
          <Route path="/cold" element={<ColdDrinksPage />} />
          <Route path="/breakfast" element={<BreakfastPage />} />
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
