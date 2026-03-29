import { useState } from 'react';
import { useStore } from '../contexts/StoreContext';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../data/products';
import styles from './Catalog.module.css';

export default function Catalog() {
  const { products } = useStore();
  const [filter, setFilter] = useState('Todos');
  const [search, setSearch] = useState('');

  const visible = products.filter(p => {
    const matchCat = filter === 'Todos' || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className={styles.catalog}>
      <div className={styles.header}>
        <h2 className={styles.title}>Produtos</h2>
        <input
          className={styles.search}
          type="text"
          placeholder="🔍  Buscar produto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.filters}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className={styles.empty}>
          Nenhum produto encontrado.
        </div>
      ) : (
        <div className={styles.grid}>
          {visible.map((p, i) => (
            <div key={p.id} style={{ animationDelay: `${i * 40}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
