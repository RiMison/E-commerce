import { useStore } from '../contexts/StoreContext';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { navigate, cartCount, page } = useStore();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.nav}>
      <button className={styles.logo} onClick={() => navigate('home')}>
        E-commerce
      </button>

      <div className={styles.links}>
        {[
          { key: 'home',    label: 'Home' },
          { key: 'catalog', label: 'Produtos' },
          { key: 'cart',    label: 'Carrinho' },
          { key: 'admin',   label: 'Gestão' },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`${styles.link} ${page === key ? styles.active : ''}`}
            onClick={() => navigate(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.right}>
        <button className={styles.themeBtn} onClick={toggleTheme} title="Alternar tema">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <button className={styles.cartBtn} onClick={() => navigate('cart')}>
          🛒 Carrinho
          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}
