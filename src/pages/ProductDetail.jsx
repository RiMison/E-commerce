import { useState } from 'react';
import { useStore } from '../contexts/StoreContext';
import styles from './ProductDetail.module.css';

const fmt = v => `R$ ${Number(v).toLocaleString('pt-BR')}`;
const stars = r => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));

export default function ProductDetail() {
  const { selectedProduct, addToCart, navigate } = useStore();
  const [qty, setQty] = useState(1);

  if (!selectedProduct) return null;
  const p = selectedProduct;

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('catalog')}>
        ← Voltar ao catálogo
      </button>

      <div className={styles.layout}>
        <div className={styles.imgBox}>
          <span className={styles.emoji}>{p.emoji}</span>
          {p.stock <= 10 && (
            <div className={styles.stockWarn}>⚡ Apenas {p.stock} em estoque</div>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.cat}>{p.category}</div>
          <h1 className={styles.name}>{p.name}</h1>

          <div className={styles.rating}>
            <span className={styles.stars}>{stars(p.rating)}</span>
            <span className={styles.ratingVal}>{p.rating}</span>
            <span className={styles.reviews}>({p.reviews} avaliações)</span>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.price}>{fmt(p.price)}</span>
            {p.oldPrice && <span className={styles.oldPrice}>{fmt(p.oldPrice)}</span>}
          </div>

          <p className={styles.desc}>{p.description}</p>

          {p.specs && p.specs.length > 0 && (
            <div className={styles.specs}>
              {p.specs.map(([k, v]) => (
                <div key={k} className={styles.specRow}>
                  <span className={styles.specKey}>{k}</span>
                  <span className={styles.specVal}>{v}</span>
                </div>
              ))}
            </div>
          )}

          <div className={styles.qtyRow}>
            <label className={styles.qtyLabel}>Quantidade:</label>
            <div className={styles.qtyCtrl}>
              <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className={styles.qtyNum}>{qty}</span>
              <button className={styles.qtyBtn} onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          <div className={styles.btns}>
            <button
              className={styles.btnCart}
              onClick={() => { addToCart(p, qty); navigate('cart'); }}
            >
              Adicionar ao carrinho
            </button>
            <button className={styles.btnWish}>♡</button>
          </div>
        </div>
      </div>
    </div>
  );
}
