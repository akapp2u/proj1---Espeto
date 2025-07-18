import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

// Dados do Menu - 100% Validado
const menuData = {
  espetos: [
    { id: 1, name: "Carne", price: 6.00, img: "/assets/93758d4b-f9dc-4f57-8312-1afbef69181e.png" },
    { id: 2, name: "Misto", price: 6.00, img: "/assets/63abf10f-99e6-4fac-9f10-2c1e15bb1087.png" },
    { id: 3, name: "Frango", price: 6.00, img: "/assets/182c57ca-915e-4192-9d8d-379af3298c8e.png" },
    { id: 4, name: "Linguiça", price: 6.00, img: "/assets/e240b3b6-dc60-42a3-97d7-93254f189d66.png" },
    { id: 5, name: "Coração", price: 6.00, img: "/assets/2408bac0-4342-44ea-abc5-08bfe8f9552d.png" },
    { id: 6, name: "Kafta com Queijo", price: 6.00, img: "/assets/fc5f63af-c3ce-4deb-b387-75cf0d80ebc2.png" },
    { id: 7, name: "Tulipa (Asa de Frango)", price: 6.00, img: "/assets/7d4a607a-fd22-4b5c-a049-35259d916322.png" },
    { id: 8, name: "Panceta", price: 6.00, img: "/assets/93758d4b-f9dc-4f57-8312-1afbef69181e.png" },
    { id: 9, name: "Medalhão de Carne", price: 6.00, img: "/assets/e7f09118-8e91-4f8c-8246-ea5c42ab83c0.png" },
    { id: 10, name: "Medalhão de Frango", price: 6.00, img: "/assets/182c57ca-915e-4192-9d8d-379af3298c8e.png" },
    { id: 11, name: "Queijo Coalho", price: 6.00, img: "/assets/fc5f63af-c3ce-4deb-b387-75cf0d80ebc2.png" },
    { id: 12, name: "Pão de Alho", price: 6.00, img: "/assets/7d4a607a-fd22-4b5c-a049-35259d916322.png" },
    { id: 13, name: "Costelinha Suína", price: 8.00, img: "/assets/e7f09118-8e91-4f8c-8246-ea5c42ab83c0.png" },
    { id: 14, name: "Linguiça Cuiabana", price: 8.00, img: "/assets/e240b3b6-dc60-42a3-97d7-93254f189d66.png" }
  ],
  bebidas: [
    { id: 15, name: "Água Mineral", price: 3.00, img: "/assets/1967edff-ffe3-4ded-9113-e85f82b1ed0e.png" },
    { id: 16, name: "Suco", price: 6.00, img: "/assets/1967edff-ffe3-4ded-9113-e85f82b1ed0e.png" },
    { id: 17, name: "Refrigerante (Lata)", price: 6.00, img: "/assets/1967edff-ffe3-4ded-9113-e85f82b1ed0e.png" },
    { id: 18, name: "Skol (Lata)", price: 6.00, img: "/assets/011c3180-acae-4d16-9b11-407d5bf36df7.png" },
    { id: 19, name: "Heineken (Long Neck)", price: 8.00, img: "/assets/011c3180-acae-4d16-9b11-407d5bf36df7.png" },
    { id: 20, name: "Budweiser (Long Neck)", price: 8.00, img: "/assets/011c3180-acae-4d16-9b11-407d5bf36df7.png" }
  ]
};

// Estado Global da Aplicação
interface AppState {
  currentView: 'table-selection' | 'name-input' | 'menu';
  tableNumber: number | null;
  customerName: string | null;
  cart: { [key: number]: number };
}

const OrderFlow = () => {
  const { toast } = useToast();
  const [state, setState] = useState<AppState>({
    currentView: 'table-selection',
    tableNumber: null,
    customerName: null,
    cart: {}
  });
  
  const [showModal, setShowModal] = useState(false);
  const [customerNameInput, setCustomerNameInput] = useState('');

  // Função para atualizar a view
  const updateView = (newView: AppState['currentView']) => {
    setState(prev => ({ ...prev, currentView: newView }));
  };

  // Seleção de Mesa
  const selectTable = (tableNumber: number) => {
    setState(prev => ({ ...prev, tableNumber }));
    updateView('name-input');
  };

  // Submissão do Nome
  const submitName = () => {
    if (!customerNameInput.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe seu nome para continuar",
        variant: "destructive"
      });
      return;
    }
    
    setState(prev => ({ ...prev, customerName: customerNameInput.trim() }));
    updateView('menu');
  };

  // Gerenciamento do Carrinho
  const addToCart = (itemId: number) => {
    setState(prev => ({
      ...prev,
      cart: {
        ...prev.cart,
        [itemId]: (prev.cart[itemId] || 0) + 1
      }
    }));
  };

  const removeFromCart = (itemId: number) => {
    setState(prev => {
      const newCart = { ...prev.cart };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return { ...prev, cart: newCart };
    });
  };

  // Cálculo do Total
  const calculateTotal = () => {
    return Object.entries(state.cart).reduce((total, [itemId, quantity]) => {
      const allItems = [...menuData.espetos, ...menuData.bebidas];
      const item = allItems.find(item => item.id === parseInt(itemId));
      return total + (item?.price || 0) * quantity;
    }, 0);
  };

  // Função de Envio para WhatsApp
  const sendWhatsAppOrder = () => {
    const WHATSAPP_NUMBER = "5511999998888"; // Substituir pelo número real
    
    // Construir mensagem formatada
    let message = `*-- 🔥 NOVO PEDIDO | ESPETINHOS WF 🔥 --*\n\n`;
    message += `*MESA:* ${state.tableNumber}\n`;
    message += `*CLIENTE:* ${state.customerName}\n\n`;
    message += `---------------------------------\n`;
    message += `*PEDIDO:*\n`;
    
    const allItems = [...menuData.espetos, ...menuData.bebidas];
    Object.entries(state.cart).forEach(([itemId, quantity]) => {
      const item = allItems.find(item => item.id === parseInt(itemId));
      if (item) {
        message += `${quantity}x ${item.name}\n`;
      }
    });
    
    message += `---------------------------------\n\n`;
    message += `*TOTAL: R$ ${calculateTotal().toFixed(2).replace('.', ',')}*\n\n`;
    
    const now = new Date();
    message += `_Pedido feito às ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}_`;
    
    // 1. PRIMEIRO: Abrir WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // 2. SEGUNDO: Mostrar toast de confirmação (com delay mínimo)
    setTimeout(() => {
      toast({
        title: "Pedido enviado!",
        description: "Seu pedido foi enviado pelo WhatsApp",
      });
    }, 100);
    
    // 3. TERCEIRO: Fechar modal (com delay maior)
    setTimeout(() => {
      setShowModal(false);
    }, 300);
  };

  // Contagem total de itens no carrinho
  const getTotalItems = () => {
    return Object.values(state.cart).reduce((total, quantity) => total + quantity, 0);
  };

  return (
    <div className="wf-container">
      {/* Header - Visível apenas no menu */}
      {state.currentView === 'menu' && (
        <div className="wf-header">
          <div className="wf-brand">ESPETINHOS WF</div>
          <div className="text-center text-sm text-muted-foreground mt-2">
            Mesa {state.tableNumber} • {state.customerName}
          </div>
        </div>
      )}

      {/* Visão 1: Seleção de Mesa */}
      <div className={`wf-view ${state.currentView !== 'table-selection' ? 'hidden' : ''}`} id="table-selection-view">
        <div className="text-center mb-8">
          <h1 className="wf-brand text-4xl mb-4">ESPETINHOS WF</h1>
          <p className="text-muted-foreground">Selecione sua mesa para começar</p>
        </div>
        
        <div className="table-grid">
          {Array.from({ length: 20 }, (_, i) => i + 1).map(tableNumber => (
            <button
              key={tableNumber}
              className="table-button"
              onClick={() => selectTable(tableNumber)}
            >
              {tableNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Visão 2: Inserção de Nome */}
      <div className={`wf-view ${state.currentView !== 'name-input' ? 'hidden' : ''}`} id="name-input-view">
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Mesa {state.tableNumber}</h2>
            <p className="text-muted-foreground">Para quem é o pedido?</p>
          </div>
          
          <div className="w-full max-w-sm space-y-4">
            <input
              type="text"
              placeholder="Seu nome"
              className="wf-input"
              value={customerNameInput}
              onChange={(e) => setCustomerNameInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && submitName()}
            />
            
            <button
              className="wf-button w-full"
              onClick={submitName}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>

      {/* Visão 3: Cardápio */}
      <div className={`wf-view ${state.currentView !== 'menu' ? 'hidden' : ''}`} id="menu-view">
        {/* Seção Espetos */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-accent">🔥 Espetos</h3>
          <div className="space-y-3">
            {menuData.espetos.map(item => (
              <div key={item.id} className="menu-item">
                <img src={item.img} alt={item.name} className="menu-item-image" />
                <div className="menu-item-info">
                  <div className="menu-item-name">{item.name}</div>
                  <div className="menu-item-price">R$ {item.price.toFixed(2).replace('.', ',')}</div>
                </div>
                <div className="menu-item-controls">
                  {state.cart[item.id] ? (
                    <>
                      <button
                        className="quantity-button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity-display">{state.cart[item.id]}</span>
                      <button
                        className="quantity-button"
                        onClick={() => addToCart(item.id)}
                      >
                        <Plus size={16} />
                      </button>
                    </>
                  ) : (
                    <button
                      className="quantity-button"
                      onClick={() => addToCart(item.id)}
                    >
                      <Plus size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção Bebidas */}
        <div className="mb-20">
          <h3 className="text-xl font-bold mb-4 text-accent">🍺 Bebidas</h3>
          <div className="space-y-3">
            {menuData.bebidas.map(item => (
              <div key={item.id} className="menu-item">
                <img src={item.img} alt={item.name} className="menu-item-image" />
                <div className="menu-item-info">
                  <div className="menu-item-name">{item.name}</div>
                  <div className="menu-item-price">R$ {item.price.toFixed(2).replace('.', ',')}</div>
                </div>
                <div className="menu-item-controls">
                  {state.cart[item.id] ? (
                    <>
                      <button
                        className="quantity-button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity-display">{state.cart[item.id]}</span>
                      <button
                        className="quantity-button"
                        onClick={() => addToCart(item.id)}
                      >
                        <Plus size={16} />
                      </button>
                    </>
                  ) : (
                    <button
                      className="quantity-button"
                      onClick={() => addToCart(item.id)}
                    >
                      <Plus size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ÁREA DO CARRINHO - SEMPRE CLICÁVEL */}
      {state.currentView === 'menu' && getTotalItems() > 0 && (
        <>
          {/* Overlay invisível para garantir que nada cubra o botão */}
          <div
            style={{
              position: 'fixed',
              bottom: '0px',
              right: '0px',
              width: '120px',
              height: '120px',
              zIndex: 999998,
              pointerEvents: 'none'
            }}
          />
          
          {/* Botão do Carrinho */}
          <div
            onClick={() => {
              console.log('CLICOU NO CARRINHO!');
              setShowModal(true);
            }}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              width: '80px',
              height: '80px',
              zIndex: 999999,
              cursor: 'pointer',
              pointerEvents: 'auto'
            }}
          >
            <div className="fab" style={{ width: '100%', height: '100%' }}>
              <ShoppingCart size={24} />
              <span className="fab-badge">{getTotalItems()}</span>
            </div>
          </div>
        </>
      )}

      {/* Modal do Resumo do Pedido */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-bold text-center">Resumo do Pedido</h3>
            </div>
            
            <div className="modal-body">
              <ul className="space-y-2">
                {Object.entries(state.cart).map(([itemId, quantity]) => {
                  const allItems = [...menuData.espetos, ...menuData.bebidas];
                  const item = allItems.find(item => item.id === parseInt(itemId));
                  if (!item) return null;
                  
                  return (
                    <li key={itemId} className="order-item">
                      <span>{quantity}x {item.name}</span>
                      <span className="font-bold">R$ {(item.price * quantity).toFixed(2).replace('.', ',')}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="modal-footer space-y-4">
              <div className="order-total">
                Total: R$ {calculateTotal().toFixed(2).replace('.', ',')}
              </div>
              
              <div className="flex gap-3">
                <button
                  className="flex-1 py-3 px-4 rounded-xl border border-border text-foreground"
                  onClick={() => setShowModal(false)}
                >
                  Continuar
                </button>
                <button
                  className="wf-button flex-1"
                  onClick={sendWhatsAppOrder}
                >
                  Enviar Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFlow;