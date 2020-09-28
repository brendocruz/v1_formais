function validateInput() {
	let answer = document.querySelector("#answer");
	let input = getInput();
	let isInvalid = /[^01]/.test(input);

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

	input0() { }
	input1() { }
}

class Context {
	constructor(_text) {
		this.text = _text;
		this.state = new Par0Par1(this);
	}

	validate() {
		for(let char of this.text) {
			if(char === "0")
				this.input0();
			else this.input1();			
		}

		if(this.state instanceof Par0Par1)
			return true;
		else return false;
	}

	input0() {
		this.state.input0();
	}

	input1() {
		this.state.input1();
	}

	set changeState(newState) {
		this.state = newState;
	}

}

class Par0Par1 extends State {
	constructor(_context) {
		super(_context);
	}

	input0() {
		this.context.changeState = new Impar0Par1(this.context);
	}

	input1() {
		this.context.changeState = new Par0Impar1(this.context);
	}
}

class Par0Impar1 extends State {
	constructor(_context) {
		super(_context);
	}

	input0() {
		this.context.changeState = new Impar0Impar1(this.context);
	}

	input1() {
		this.context.changeState = new Par0Par1(this.context);
	}
}

class Impar0Par1 extends State {
	constructor(_context) {
		super(_context);
	}

	input0() {
		this.context.changeState = new Par0Par1(this.context);
	}

	input1() {
		this.context.changeState = new Impar0Impar1(this.context);
	}
}

class Impar0Impar1 extends State {
	constructor(_context) {
		super(_context);
	}

	input0() {
		this.context.changeState = new Par0Impar1(this.context);
	}

	input1() {
		this.context.changeState = new Impar0Par1(this.context);
	}
}