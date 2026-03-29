# E-commerce

Projeto de estudo de um sistema de E-commerce focado em produtos de tecnologia construído com React 18, CSS Modules e Context API.

## Estrutura do projeto

```
src/
├── contexts/
│   ├── StoreContext.jsx   # Estado global: produtos, carrinho, navegação
│   └── ThemeContext.jsx   # Tema dark/light com persistência em localStorage
├── data/
│   └── products.js        # Dados iniciais dos produtos e categorias
├── components/
│   ├── Navbar.jsx         # Navegação principal + toggle de tema
│   ├── Navbar.module.css
│   ├── ProductCard.jsx    # Card reutilizável de produto
│   ├── ProductCard.module.css
│   ├── Toast.jsx          # Notificações de feedback
│   └── Toast.module.css
├── pages/
│   ├── Home.jsx           # Hero + chamada para ação
│   ├── Home.module.css
│   ├── Catalog.jsx        # Listagem com filtros e busca
│   ├── Catalog.module.css
│   ├── ProductDetail.jsx  # Detalhe do produto + carrinho
│   ├── ProductDetail.module.css
│   ├── Cart.jsx           # Carrinho de compras
│   ├── Cart.module.css
│   ├── Admin.jsx          # Gestão de produtos (CRUD completo)
│   └── Admin.module.css
├── App.jsx                # Roteador e providers
├── index.js               # Entry point
└── index.css              # Variáveis CSS globais (temas dark/light)
```

## Como rodar

```bash
npm install
npm start
```

Acesse: http://localhost:3000

## Funcionalidades

### Loja
- **Hero** – banner principal com animações e estatísticas
- **Catálogo** – filtros por categoria + busca em tempo real
- **Detalhe do produto** – especificações, quantidade, alerta de estoque baixo
- **Carrinho** – CRUD completo, cálculo de frete grátis acima de R$ 2.000

### Painel de gestão (`/admin`)
- Dashboard com KPIs (total de produtos, valor em estoque, categorias, estoque baixo)
- Tabela de produtos com busca
- Criação de produtos com picker de emoji e specs dinâmicas
- Edição inline de qualquer produto
- Remoção com confirmação dupla

### UX
- **Modo dark/light** com persistência em localStorage
- **Toast notifications** ao adicionar ao carrinho / salvar produto
- **CSS Modules** – zero conflito de estilos
- **Context API** – estado global sem Redux

## Próximos passos

- Integrar com uma API REST (ex: Node + Express, ou Firebase)
- Adicionar autenticação para a área admin (ex: Firebase Auth)
- Implementar checkout com Stripe ou Mercado Pago
- Adicionar persistência do carrinho via localStorage
- Implementar paginação no catálogo
