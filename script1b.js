function validateInput() {
	let answer = document.querySelector("#answer");
	let string = getInput();

	result = /[^a]/.test(string);
	if(result === true) {
		answer.innerHTML = "Caracteres inválidos";
		return;
	}

	if(string.length === 0) {
		answer.innerHTML = "Cadeia inválida";
		return;
	}

	if(Number.isInteger(Math.log(string.length) / Math.log(2))) {
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