import { useStore } from '../contexts/StoreContext';
import styles from './Cart.module.css';

const fmt = v => `R$ ${Number(v).toLocaleString('pt-BR')}`;

export default function Cart() {
  const { cart, removeFromCart, updateCartQty, cartSubtotal, navigate } = useStore();

  const shipping = cartSubtotal >= 2000 ? 0 : 29.9;
  const total = cartSubtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className={styles.page}>
        <h2 className={styles.title}>Meu carrinho</h2>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🛒</div>
          <p>Seu carrinho está vazio.</p>
          <button className={styles.btnExplore} onClick={() => navigate('catalog')}>
            Explorar produtos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Meu carrinho</h2>

      <div className={styles.layout}>
        <div className={styles.items}>
          {cart.map(item => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemIcon}>{item.emoji}</div>

              <div className={styles.itemInfo}>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemCat}>{item.category}</div>
              </div>

              <div className={styles.qtyCtrl}>
                <button className={styles.qBtn} onClick={() => updateCartQty(item.id, -1)}>−</button>
                <span className={styles.qNum}>{item.qty}</span>
                <button className={styles.qBtn} onClick={() => updateCartQty(item.id, 1)}>+</button>
              </div>

              <div className={styles.itemPrice}>{fmt(item.price * item.qty)}</div>

              <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <h3 className={styles.summaryTitle}>Resumo</h3>

          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>{fmt(cartSubtotal)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Frete</span>
            <span>{shipping === 0 ? 'Grátis' : fmt(shipping)}</span>
          </div>

          {shipping === 0 && (
            <div className={styles.freeShipping}>✓ Frete grátis acima de R$ 2.000</div>
          )}

          <div className={styles.totalRow}>
            <span>Total</span>
            <span className={styles.totalVal}>{fmt(total)}</span>
          </div>

          <button className={styles.checkoutBtn}>
            Finalizar compra →
          </button>

          <button className={styles.continueBtn} onClick={() => navigate('catalog')}>
            Continuar comprando
          </button>
        </div>
      </div>
    </div>
  );
}
