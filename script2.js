class Context {
	constructor() {
		this.state = new PedidoNovo(this);
	}

	aprovar() {
		this.state.aprovar();
	}

	cancelar() {
		this.state.cancelar();
	}

	encaminhar() {
		this.state.encaminhar();
	}

	enviar() {
		this.state.enviar();
	}

	extornar() {
		this.state.extornar();
	}

	pagar() {
		this.state.pagar();
	}

	rejeitar() {
		this.state.rejeitar();
	}

	recusar() {
		this.state.recusar();
	}


	set changeState(newState) {
		this.state = newState;
		addConsoleEntry(`# Pedido ${this.state.stateName}`);
	}

}

class State {
	constructor(_context) {
		this.context = _context;
		this.stateName = "Interface";
	}

	aprovar() {
		addConsoleEntry("[Ação Inválida]");
	}

	cancelar() {
		addConsoleEntry("[Ação Inválida]");
	}

	encaminhar() {
		addConsoleEntry("[Ação Inválida]");
	}

	enviar() {
		addConsoleEntry("[Ação Inválida]");
	}

	extornar() {
		addConsoleEntry("[Ação Inválida]");
	}

	pagar() {
		addConsoleEntry("[Ação Inválida]");
	}

	recusar() {
		addConsoleEntry("[Ação Inválida]");
	}

	rejeitar() {
		addConsoleEntry("[Ação Inválida]");
	}

}

class PedidoNovo extends State {
	constructor(_context) {
		super(_context);
		this.stateName = "Novo";
	}

	pagar() {
		addConsoleEntry("Pagando...");
		this.context.changeState = new PedidoAprovado(this.context);
	}

	recusar() {
		addConsoleEntry("Recusando...");
		this.context.changeState = new PedidoRecusado(this.context);
	}
}

class PedidoAprovado extends State {
	constructor(_context) {
		super(_context);
		this.stateName = "Aprovado";
	}

	cancelar() {
		addConsoleEntry("Canclando...");
		this.context.changeState = new PedidoEmTransporte(this.context);
	}

	encaminhar() {
		addConsoleEntry("Emcaminhando...");
		this.context.changeState = new PedidoEmTransporte(this.context);
	}
}

class PedidoEmTransporte extends State {
	constructor(_context) {
		super(_context);
		this.stateName = "Em Transporte";
	}

	enviar() {
		addConsoleEntry("Enviando...");
		this.context.changeState = new PedidoEntregue(this.context);
	}
}

class PedidoEntregue extends State {
	constructor(_context) {
		super(_context);
		this.stateName = "Entregue";
	}

	aprovar() {
		addConsoleEntry("Aprovando...");
		this.context.changeState = new PedidoFinalizado(this.context);
	}

	rejeitar() {
		addConsoleEntry("Rejeitando...");
		this.context.changeState = new PedidoRejeitado(this.context);
	}

}

class PedidoRejeitado extends State {
	constructor(_context) {
		super(_context);
		this.stateName = "Rejeitado";
	}

	extornar() {
		addConsoleEntry("Extornado...");
		this.context.changeState = new PedidoExtornado(this.context);
	}

}

class PedidoExtornado extends State {
	constructor(_context) {
		super(_context);
		this.stateName = "Extornado";
	}

	cancelar() {
		addConsoleEntry("Cancelado...");
		this.context.changeState = new PedidoCancelado(this.context);
	}
}

class PedidoRecusado extends State {
	constructor(_context) {
		super(_context);
		this.stateName = "Recusado";
	}

	cancelar() {
		addConsoleEntry("Cancelado...");
		this.context.changeState = new PedidoCancelado(this.context);
	}
}

class PedidoCancelado extends State {
	constructor(_context) {
		super(_context);
		this.stateName = "Cancelado";
	}
}

class PedidoFinalizado extends State {
	constructor(_context) {
		super(_context);
		this.stateName = "Finalizado";
	}
}




let context;
init();

function init() {
	context = new Context;
	setStateTitle(context.state)
}

function setStateTitle(state) {
	let span = document.querySelector("#stateTitle");
	if(!span) return;

	let newTitle = state.stateName;
	span.innerHTML = newTitle;
}

function changeState() {
	funcName = event.target.innerHTML;
	context[funcName]();
	setStateTitle(context.state);
}

function addConsoleEntry(text) {
	prompt = document.querySelector("#console");
	if(text[0] === "[" && text[text.length - 1] === "]") {
		prompt.insertAdjacentHTML("beforeend", `<span style="color:silver">${text}</span><br>`);
	} else if(text[0] === "#") {
		prompt.insertAdjacentHTML("beforeend", `<span style="color:orange">${text}</span><br>`);
	} else
		prompt.insertAdjacentHTML("beforeend", `${text}<br>`);
}