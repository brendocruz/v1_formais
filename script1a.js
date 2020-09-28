function validateInput() {
	let answer = document.querySelector("#answer");
	let string = getInput();

	result = /[^ab]/.test(string);
	if(result === true) {
		answer.innerHTML = "Caracteres inválidos";
		return;
	}

	if(string.length % 2 === 1) {
		answer.innerHTML = "Cadeia inválida";
		return;
	}

	if(string.length === 0) {
		answer.innerHTML = "Cadeia válida";
		return;
	}

	let i, j;
	for(i = 0, j = string.length - 1; i < j; i++, j--) {
		if(string[i] != string[j]) {
			i = j = -1;
			break;
		}
	}

	if(i === -1 && j === -1) {
		answer.innerHTML = "Cadeia inválida";
		return;
	} else {
		answer.innerHTML = "Cadeia válida";
		return;
	}
}

function getInput() {
	let EltInput = document.querySelector("#input");
	let	inputText = EltInput.value;
	return inputText;
}