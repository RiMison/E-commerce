import { createContext, useContext, useState, useCallback } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [page, setPage] = useState('home');           // home | catalog | product | cart | admin
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);

  // ── Toast ──────────────────────────────────────────────
  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  }, []);

  // ── Navigation ─────────────────────────────────────────
  const navigate = useCallback((p, product = null) => {
    if (product) setSelectedProduct(product);
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ── Cart ───────────────────────────────────────────────
  const addToCart = useCallback((product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty }];
    });
    showToast(`${product.name} adicionado ao carrinho!`);
  }, [showToast]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateCartQty = useCallback((id, delta) => {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  }, []);

  const cartCount = cart.reduce((a, i) => a + i.qty, 0);
  const cartSubtotal = cart.reduce((a, i) => a + i.price * i.qty, 0);

  // ── Products CRUD ──────────────────────────────────────
  const addProduct = useCallback((product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      reviews: 0,
      rating: 0,
    };
    setProducts(prev => [...prev, newProduct]);
    showToast(`"${product.name}" criado com sucesso!`);
  }, [showToast]);

  const updateProduct = useCallback((id, data) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    showToast('Produto atualizado!');
  }, [showToast]);

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => prev.filter(i => i.id !== id));
    showToast('Produto removido.', 'danger');
  }, [showToast]);

  return (
    <StoreContext.Provider value={{
      page, navigate,
      products, addProduct, updateProduct, deleteProduct,
      cart, addToCart, removeFromCart, updateCartQty,
      cartCount, cartSubtotal,
      selectedProduct,
      toast, showToast,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
