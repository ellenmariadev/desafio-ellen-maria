import { cardapio } from "./cardapio";

const DESCONTO = 0.05;
const ACRESCIMO = 0.03;

class CaixaDaLanchonete {
  validarFormaDePagamento(metodoDePagamento) {
    const validPagamento = new Set(["dinheiro", "credito", "debito"]);
    return validPagamento.has(metodoDePagamento);
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!this.validarFormaDePagamento(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    const cardapioItens = itens.map((item) => {
      const [cod, quantidade] = item.split(",");
      const codItem = cardapio.has(cod) ? cardapio.get(cod) : { valor: 0 };
      const quant = quantidade !== "0" ? parseInt(quantidade) : 0;
      return { codigo: cod, quantidade: quant, valor: codItem.valor };
    });

    const cod = new Set(cardapioItens.map((item) => item.codigo));

    if (
      (cod.has("queijo") && !cod.has("sanduiche")) ||
      (cod.has("chantily") && !cod.has("cafe"))
    ) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (cardapioItens.some((item) => item.quantidade === 0)) {
      return "Quantidade inválida!";
    }

    if (cardapioItens.some((item) => item.valor === 0)) {
      return "Item inválido!";
    }

    const valor = cardapioItens.reduce((total, item) => {
      return total + item.valor * item.quantidade;
    }, 0);

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    return `R$ ${this.valorTotal(metodoDePagamento, valor)
      .toFixed(2)
      .replace(".", ",")}`;
  }

  valorTotal(metodoDePagamento, valor) {
    switch (metodoDePagamento) {
      case "dinheiro":
        return valor - valor * DESCONTO;
      case "credito":
        return valor + valor * ACRESCIMO;
      default:
        return valor;
    }
  }
}

export { CaixaDaLanchonete };
