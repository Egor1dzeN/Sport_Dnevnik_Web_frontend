console.log('test')

function isNumberKey(evt) {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));

}

function submitForm(event) {
    event.preventDefault();
    console.log('Test')
}

function moveFocus(currentIndex) {
    const currentInput = document.getElementById(`input${currentIndex}`);
    const nextInput = document.getElementById(`input${currentIndex + 1}`);
    let flag = true
    // console.log(1)
    for (let i = 1; i <= 6; ++i) {
        let id = 'input' + i;
        const value = document.getElementById(id).value
        // console.log(value)
        if (value === '')
            flag = false
    }
    if (flag) {
        // const form = document.getElementById('form');
        sendCode()
    }
    if (currentInput.value.length === 1 && nextInput) {
        nextInput.focus();
    }
}
function sendCode(){
    console.log('send')
}