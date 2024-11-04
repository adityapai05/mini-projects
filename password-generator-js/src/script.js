const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const copyEl = document.getElementById('copy');
const generateEl = document.getElementById('generate');

// Generating random lowercase character (ASCII 97-122)
const getLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

// Generating random Uppercase character (ASCII 65-90)
const getUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

// Generating random numerical character (ASCII 48-57)
const getNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

// Generating random symbol character
const getSymbol = () => {
    const symbols = "!@#$%^&*()_+-=[]{}|;:.<>?/\\"; 
    return symbols[Math.floor(Math.random() * symbols.length)];
};

const randomFunction = {
    lower: getLowerCase,
    upper: getUpperCase,
    number: getNumber,
    symbol: getSymbol
};

generateEl.addEventListener('click', () => {
    const length = lengthEl.value; 
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

const generatePassword = (lower, upper, number, symbol, length) => {
    let generatedPassword = '';
    const typesArr = [
        { lower: lower },
        { upper: upper },
        { number: number },
        { symbol: symbol }
    ].filter(type => Object.values(type)[0]);

    const typeCount = typesArr.length;

    if (typeCount === 0) return '';

    for (let i = 0; i < length; i++) {
        const randomType = typesArr[Math.floor(Math.random() * typeCount)]; 
        const keyFromRandFunc = Object.keys(randomType)[0]; 
        generatedPassword += randomFunction[keyFromRandFunc]();
    }

    return generatedPassword;
};

const copyText = () => {
    const passwordText = resultEl.textContent;
    navigator.clipboard.writeText(passwordText).then(() => {
        alert("Password copied to clipboard!");
    }).catch(err => {
        console.error("Error copying text: ", err);
    });
}

