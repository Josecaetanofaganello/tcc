var input = document.querySelector('textoCaixa'); // get the input element
input.addEventListener('input', resizeInput); // bind the "resizeInput" callback on "input" event
resizeInput.call(input); // immediately call the function

function resizeInput() {
    this.style.width = this.value.length + "ch";
}