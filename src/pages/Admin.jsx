import { useState } from 'react';
import { useStore } from '../contexts/StoreContext';
import { CATEGORIES, EMOJI_OPTIONS } from '../data/products';
import styles from './Admin.module.css';

const fmt = v => `R$ ${Number(v).toLocaleString('pt-BR')}`;

const EMPTY_FORM = {
  name: '', category: 'Smartphones', emoji: '📱',
  price: '', oldPrice: '', badge: '', stock: '',
  description: '', specs: [['', '']],
};

function ProductForm({ initial = EMPTY_FORM, onSave, onCancel }) {
  const [form, setForm] = useState(initial);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const setSpec = (i, col, val) => {
    const specs = form.specs.map((s, idx) => idx === i ? (col === 0 ? [val, s[1]] : [s[0], val]) : s);
    setForm(f => ({ ...f, specs }));
  };
  const addSpec    = () => setForm(f => ({ ...f, specs: [...f.specs, ['', '']] }));
  const removeSpec = i  => setForm(f => ({ ...f, specs: f.specs.filter((_, idx) => idx !== i) }));

  const handleSave = () => {
    if (!form.name.trim() || !form.price) return alert('Nome e preço são obrigatórios.');
    onSave({
      ...form,
      price:    parseFloat(form.price),
      oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : null,
      stock:    parseInt(form.stock) || 0,
      specs:    form.specs.filter(([k]) => k.trim()),
    });
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.formGrid}>
        {/* Name */}
        <div className={styles.field}>
          <label className={styles.label}>Nome *</label>
          <input className={styles.input} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Ex: NexPhone Pro 15" />
        </div>

        {/* Category */}
        <div className={styles.field}>
          <label className={styles.label}>Categoria *</label>
          <select className={styles.input} value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORIES.filter(c => c !== 'Todos').map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Price */}
        <div className={styles.field}>
          <label className={styles.label}>Preço (R$) *</label>
          <input className={styles.input} type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="0.00" />
        </div>

        {/* Old price */}
        <div className={styles.field}>
          <label className={styles.label}>Preço anterior (R$)</label>
          <input className={styles.input} type="number" value={form.oldPrice} onChange={e => set('oldPrice', e.target.value)} placeholder="Opcional" />
        </div>

        {/* Stock */}
        <div className={styles.field}>
          <label className={styles.label}>Estoque</label>
          <input className={styles.input} type="number" value={form.stock} onChange={e => set('stock', e.target.value)} placeholder="0" />
        </div>

        {/* Badge */}
        <div className={styles.field}>
          <label className={styles.label}>Badge</label>
          <select className={styles.input} value={form.badge} onChange={e => set('badge', e.target.value)}>
            <option value="">Nenhum</option>
            <option value="NOVO">NOVO</option>
            <option value="OFERTA">OFERTA</option>
          </select>
        </div>
      </div>

      {/* Emoji picker */}
      <div className={styles.field} style={{ marginTop: '1rem' }}>
        <label className={styles.label}>Ícone do produto</label>
        <div className={styles.emojiPicker}>
          {EMOJI_OPTIONS.map(e => (
            <button
              key={e}
              className={`${styles.emojiBtn} ${form.emoji === e ? styles.emojiActive : ''}`}
              onClick={() => set('emoji', e)}
              type="button"
            >{e}</button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className={styles.field} style={{ marginTop: '1rem' }}>
        <label className={styles.label}>Descrição</label>
        <textarea
          className={styles.textarea}
          rows={3}
          value={form.description}
          onChange={e => set('description', e.target.value)}
          placeholder="Descreva o produto..."
        />
      </div>

      {/* Specs */}
      <div className={styles.field} style={{ marginTop: '1rem' }}>
        <div className={styles.specsHeader}>
          <label className={styles.label}>Especificações</label>
          <button className={styles.addSpecBtn} onClick={addSpec} type="button">+ Adicionar</button>
        </div>
        {form.specs.map((spec, i) => (
          <div key={i} className={styles.specRow}>
            <input className={styles.input} placeholder="Ex: RAM" value={spec[0]} onChange={e => setSpec(i, 0, e.target.value)} />
            <input className={styles.input} placeholder="Ex: 12GB" value={spec[1]} onChange={e => setSpec(i, 1, e.target.value)} />
            <button className={styles.removeSpecBtn} onClick={() => removeSpec(i)} type="button">✕</button>
          </div>
        ))}
      </div>

      <div className={styles.formActions}>
        <button className={styles.btnSave} onClick={handleSave}>Salvar produto</button>
        <button className={styles.btnCancel} onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [view, setView]         = useState('list');   // list | create | edit
  const [editing, setEditing]   = useState(null);
  const [search, setSearch]     = useState('');
  const [confirmId, setConfirmId] = useState(null);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = p => { setEditing(p); setView('edit'); };

  const handleDelete = id => {
    deleteProduct(id);
    setConfirmId(null);
  };

  const totalRevenue = products.reduce((a, p) => a + p.price * (p.stock || 0), 0);

  if (view === 'create') {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <button className={styles.back} onClick={() => setView('list')}>← Voltar</button>
          <h2 className={styles.title}>Novo produto</h2>
        </div>
        <ProductForm
          onSave={data => { addProduct(data); setView('list'); }}
          onCancel={() => setView('list')}
        />
      </div>
    );
  }

  if (view === 'edit' && editing) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <button className={styles.back} onClick={() => setView('list')}>← Voltar</button>
          <h2 className={styles.title}>Editar: {editing.name}</h2>
        </div>
        <ProductForm
          initial={{
            ...editing,
            price:    String(editing.price),
            oldPrice: editing.oldPrice ? String(editing.oldPrice) : '',
            stock:    String(editing.stock || 0),
            specs:    editing.specs?.length ? editing.specs : [['', '']],
          }}
          onSave={data => { updateProduct(editing.id, data); setView('list'); }}
          onCancel={() => setView('list')}
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h2 className={styles.title}>Gestão de produtos</h2>
        <button className={styles.btnNew} onClick={() => setView('create')}>+ Novo produto</button>
      </div>

      {/* KPI cards */}
      <div className={styles.kpis}>
        <div className={styles.kpi}>
          <div className={styles.kpiLabel}>Total de produtos</div>
          <div className={styles.kpiVal}>{products.length}</div>
        </div>
        <div className={styles.kpi}>
          <div className={styles.kpiLabel}>Valor em estoque</div>
          <div className={styles.kpiVal}>{fmt(totalRevenue)}</div>
        </div>
        <div className={styles.kpi}>
          <div className={styles.kpiLabel}>Categorias</div>
          <div className={styles.kpiVal}>{[...new Set(products.map(p => p.category))].length}</div>
        </div>
        <div className={styles.kpi}>
          <div className={styles.kpiLabel}>Estoque baixo (&le;10)</div>
          <div className={`${styles.kpiVal} ${styles.kpiWarn}`}>
            {products.filter(p => (p.stock || 0) <= 10).length}
          </div>
        </div>
      </div>

      {/* Search */}
      <input
        className={styles.search}
        placeholder="🔍  Buscar por nome ou categoria..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Badge</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>
                  <div className={styles.productCell}>
                    <span className={styles.cellEmoji}>{p.emoji}</span>
                    <span className={styles.cellName}>{p.name}</span>
                  </div>
                </td>
                <td><span className={styles.catChip}>{p.category}</span></td>
                <td className={styles.priceCell}>{fmt(p.price)}</td>
                <td>
                  <span className={`${styles.stockBadge} ${(p.stock || 0) <= 10 ? styles.stockLow : ''}`}>
                    {p.stock || 0}
                  </span>
                </td>
                <td>
                  {p.badge
                    ? <span className={`${styles.badge} ${p.badge === 'NOVO' ? styles.badgeNew : styles.badgeSale}`}>{p.badge}</span>
                    : <span className={styles.badgeNone}>—</span>}
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.editBtn} onClick={() => handleEdit(p)}>✏️ Editar</button>
                    {confirmId === p.id ? (
                      <>
                        <button className={styles.confirmBtn} onClick={() => handleDelete(p.id)}>Confirmar</button>
                        <button className={styles.cancelDelBtn} onClick={() => setConfirmId(null)}>Cancelar</button>
                      </>
                    ) : (
                      <button className={styles.delBtn} onClick={() => setConfirmId(p.id)}>🗑️ Remover</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className={styles.tableEmpty}>Nenhum produto encontrado.</div>
        )}
      </div>
    </div>
  );
}
