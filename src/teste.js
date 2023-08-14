const cardapio = new Map([
  [
    "cafe",
    {
      descricao: "Café",
      valor: 3,
    },
  ],
  [
    "chantily",
    {
      descricao: "Chantily (extra do Café)",
      valor: 1.5,
    },
  ],
  [
    "suco",
    {
      descricao: "Suco Natural",
      valor: 6.2,
    },
  ],
  [
    "sanduiche",
    {
      descricao: "Sanduíche",
      valor: 6.5,
    },
  ],
  [
    "queijo",
    {
      descricao: "Queijo (extra do Sanduíche)",
      valor: 2,
    },
  ],
  [
    "salgado",
    {
      descricao: "Salgado",
      valor: 7.25,
    },
  ],
  [
    "combo1",
    {
      descricao: "1 Suco e 1 Sanduíche",
      valor: 9.5,
    },
  ],
  [
    "combo2",
    {
      descricao: "1 Café e 1 Sanduíche",
      valor: 7.5,
    },
  ],
]);

const items = ["e,0", "r,0"];

const orderItems = items.map((item) => {
  const [cod, quantidade] = item.split(",");
  const menuItem = cardapio.get(cod);
  const value = menuItem ? menuItem.valor : 0;
  return { codigo: cod, quantidade: +quantidade, valor: value };
});

const valor = orderItems.map((item) => {
  return item.valor;
});

console.log(valor.includes(0));

const totalValue = orderItems.reduce((total, item) => {
  return total + item.valor * item.quantidade;
}, 0);

// console.log(totalValue);
