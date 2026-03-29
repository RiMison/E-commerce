import { useStore } from '../contexts/StoreContext';
import styles from './Home.module.css';

export default function Home() {
  const { navigate } = useStore();

  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={styles.heroGrid} />

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          Novidades 2025
        </div>

        <h1 className={styles.h1}>
          O futuro da <em className={styles.em}>tecnologia</em> está aqui
        </h1>

        <p className={styles.sub}>
          Gadgets, eletrônicos e acessórios de ponta para quem vive no ritmo
          digital. Entrega rápida, preços competitivos.
        </p>

        <div className={styles.btns}>
          <button className={styles.btnPrimary} onClick={() => navigate('catalog')}>
            Explorar produtos
          </button>
          <button className={styles.btnOutline} onClick={() => navigate('catalog')}>
            Ver ofertas
          </button>
        </div>

        <div className={styles.stats}>
          {[
            { num: '2.4k+', label: 'Produtos' },
            { num: '98%',   label: 'Satisfação' },
            { num: '24h',   label: 'Entrega SP' },
          ].map(s => (
            <div key={s.label}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
