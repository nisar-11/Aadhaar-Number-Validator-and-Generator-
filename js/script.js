// Predefined tables for Verhoeff algorithm
const d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];

const inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

const p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

// Generate Verhoeff check digit
function generateVerhoeff(a) {
    let c = 0;
    for (let i = 11; i >= 0; i--) {
        let ni = (i === 11) ? 0 : a[i];
        let pi = p[(11 - i) % 8][ni];
        c = d[c][pi];
    }
    return inv[c];
}

// Generate a random Aadhar-like number
function generateAadhar() {
    let aadhar = [];
    for (let i = 0; i < 11; i++) {
        aadhar.push(i === 0 ? Math.floor(Math.random() * 8) + 2 : Math.floor(Math.random() * 10));
    }
    aadhar.push(generateVerhoeff(aadhar));

    document.getElementById('result').innerHTML = `Generated Aadhar: ${aadhar.join('')}`;
}

// Display the validation input field
function validateAadhar() {
    document.getElementById('validate-section').style.display = 'block';
}

// Validate the given Aadhar number
function checkAadhar() {
    let input = document.getElementById('aadharInput').value.replace(/\s+/g, '');  // Remove spaces
    if (input.length !== 12 || input[0] === '0' || input[0] === '1') {
        document.getElementById('result').innerHTML = "Invalid Aadhar Number";
        return;
    }

    let aadhar = input.split('').map(Number);
    let c = 0;
    for (let i = 11; i >= 0; i--) {
        let ni = (i === 11) ? 0 : aadhar[i];
        let pi = p[(11 - i) % 8][ni];
        c = d[c][pi];
    }

    let check = inv[c];
    if (check === aadhar[11]) {
        document.getElementById('result').innerHTML = "Valid Aadhar Number";
    } else {
        document.getElementById('result').innerHTML = "Invalid Aadhar Number";
    }
}
