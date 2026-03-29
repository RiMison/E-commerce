import './index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { StoreProvider, useStore } from './contexts/StoreContext';
import Navbar      from './components/Navbar';
import Toast       from './components/Toast';
import Home        from './pages/Home';
import Catalog     from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart        from './pages/Cart';
import Admin       from './pages/Admin';

function Router() {
  const { page } = useStore();
  return (
    <>
      <Navbar />
      {page === 'home'    && <Home />}
      {page === 'catalog' && <Catalog />}
      {page === 'product' && <ProductDetail />}
      {page === 'cart'    && <Cart />}
      {page === 'admin'   && <Admin />}
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <StoreProvider>
        <Router />
      </StoreProvider>
    </ThemeProvider>
  );
}
