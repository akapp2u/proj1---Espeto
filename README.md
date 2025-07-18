# WF OrderFlow - Sistema de Autoatendimento

Sistema de autoatendimento para restaurante de espetinhos, desenvolvido com React e TypeScript.

## Funcionalidades

- Seleção de mesa
- Cardápio digital interativo
- Carrinho de compras
- Envio de pedidos via WhatsApp
- Interface responsiva e intuitiva

## Como executar o projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```sh
git clone <URL_DO_SEU_REPOSITORIO>
```

2. Navegue até o diretório do projeto:
```sh
cd orderflow-web-app-main
```

3. Instale as dependências:
```sh
npm install
```

4. Execute o projeto em modo de desenvolvimento:
```sh
npm run dev
```

5. Acesse o projeto em: `http://localhost:8080`

### Scripts disponíveis

- `npm run dev` - Executa o projeto em modo de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run build:dev` - Gera a build em modo de desenvolvimento
- `npm run lint` - Executa o linter
- `npm run preview` - Visualiza a build de produção

## Tecnologias utilizadas

- **Vite** - Build tool e dev server
- **React** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de interface
- **React Router** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Lucide React** - Ícones

## Estrutura do projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── hooks/         # Hooks customizados
├── lib/           # Utilitários e configurações
└── main.tsx       # Ponto de entrada da aplicação
```

## Configuração do WhatsApp

Para configurar o envio de pedidos via WhatsApp, edite o número no arquivo `src/pages/OrderFlow.tsx`:

```typescript
const WHATSAPP_NUMBER = "5511999998888"; // Substitua pelo número real
```

## Deploy

O projeto pode ser deployado em qualquer serviço de hospedagem estática como:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

Execute `npm run build` para gerar os arquivos de produção na pasta `dist/`.
