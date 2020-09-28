
function validateInput() {
	let answer = document.querySelector("#answer");
	let input = getInput();
	let isInvalid = /[^ok]/.test(input);

	if(isInvalid) {
		answer.innerHTML = "Entrada inválida: caracteres não pertencente ao alfabeto";
		return;
	}

	let ctx = new Context(input);
	let result = ctx.validate();
	if(result === true) {
		answer.innerHTML = "Cadeia válida";
	} else {
		answer.innerHTML = "Cadeia inválida";
	}
}

function getInput() {
	let EltInput = document.querySelector("#input");
	let	inputText = EltInput.value;
	return inputText;
}

class State {
	constructor(_context) {
		this.context = _context;
	}

	inputO() {}
	inputK() {}
}

class Context {
	constructor(_text) {
		this.text = _text;
		this.state = new StateQ0(this);
	}

	validate() {
		for(let char of this.text) {
			if(char === "o")
				this.inputO();
			else this.inputK();			
		}

		if(this.state instanceof StateQ2)
			return true;
		else return false;
	}

	inputO() {
		this.state.inputO();
	}

	inputK() {
		this.state.inputK();
	}

	set changeState(newState) {
		this.state = newState;
	}

}

class StateQ0 extends State {
	constructor(_context) {
		super(_context);
	}

	inputO() {
		this.context.changeState = new StateQ1(this.context);
	}

	inputK() {
		this.context.changeState = new StateQ0(this.context);
	}
}

class StateQ1 extends State {
	constructor(_context) {
		super(_context);
	}

	inputO() {
		this.context.changeState = new StateQ1(this.context);
	}

	inputK() {
		this.context.changeState = new StateQ2(this.context);
	}
}

class StateQ2 extends State {
	constructor(_context) {
		super(_context);
	}

	inputO() {
		this.context.changeState = new StateQ2(this.context);
	}

	inputK() {
		this.context.changeState = new StateQ2(this.context);		
	}
}

class StateError extends State {
	constructor(_context) {
		super(_context);
	}

	inputO() {
		this.context.changeState = new StateError(this.context);
	}

	inputK() {
		this.context.changeState = new StateError(this.context);	
	}
}