import { useStore } from '../contexts/StoreContext';
import styles from './ProductCard.module.css';

const fmt = (v) => `R$ ${Number(v).toLocaleString('pt-BR')}`;

export default function ProductCard({ product }) {
  const { navigate, addToCart } = useStore();

  return (
    <div className={styles.card} onClick={() => navigate('product', product)}>
      <div className={styles.imgBox}>
        <span className={styles.emoji}>{product.emoji}</span>
        {product.badge && (
          <span className={`${styles.badge} ${product.badge === 'NOVO' ? styles.badgeNew : styles.badgeSale}`}>
            {product.badge}
          </span>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.category}>{product.category}</div>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.desc}>{product.description.substring(0, 72)}…</div>

        <div className={styles.footer}>
          <div>
            <div className={styles.price}>{fmt(product.price)}</div>
            {product.oldPrice && (
              <div className={styles.oldPrice}>{fmt(product.oldPrice)}</div>
            )}
          </div>
          <button
            className={styles.addBtn}
            onClick={e => { e.stopPropagation(); addToCart(product, 1); }}
          >
            + Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
