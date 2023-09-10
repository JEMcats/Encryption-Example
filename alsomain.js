function copyOutKeyText() {
    var outkeyText = document.getElementById('outkey').textContent;
    var copyText = document.createElement('textarea');
    copyText.value = outkeyText;
    document.body.appendChild(copyText);
    copyText.select();
    document.execCommand('copy');
    document.body.removeChild(copyText);
    alert('Text copied to clipboard.');
}
function encryptText() {
    var inputText = document.getElementById('inputText').value;

    // Generate a random encryption key (simple XOR)
    const encryptionKey = generateRandomKey();

    // Encrypt the text using XOR
    const encryptedText = xorEncrypt(inputText, encryptionKey);

    // Save the encryption key to local storage
    localStorage.setItem(encryptedText, encryptionKey);

    // Display the encrypted text
    document.getElementById('encryptedText').textContent = encryptedText;
}

function decryptText() {
    var storedEncryptedText = document.getElementById('inputText').value;
    var storedKey = localStorage.getItem(storedEncryptedText);

    // Check if the encryption key is stored
    if (!storedKey) {
        alert('Sorry, you don\'t have access to view this.');
        return;
    }

    // Decrypt the stored encrypted text using XOR
    var decryptedText = xorEncrypt(storedEncryptedText, storedKey);
    const digitCount = countCharacters(storedKey);

    if (digitCount !== 9) {
        alert("Wrong Key");
    } else {
        // Display the decrypted text
        document.getElementById('decryptedText').textContent = decryptedText;
    }
}

function copyEncryptedText() {
    var encryptedText = document.getElementById('encryptedText').textContent;
    var copyText = document.createElement('textarea');
    copyText.value = encryptedText;
    document.body.appendChild(copyText);
    copyText.select();
    document.execCommand('copy');
    document.body.removeChild(copyText);
    alert('Encrypted text copied to clipboard.');
}

function generateRandomKey() {
    // Generate a random key of the same length as the text
    var keyLength = 9;
    let key = '';
    for (let i = 0; i < keyLength; i++) {
        key += String.fromCharCode(Math.floor(Math.random() * 256));
    }
    return key;
}

function xorEncrypt(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        result += String.fromCharCode(charCode);
    }
    return result;
}

// Function to clear local storage after 30 days
function clearLocalStorageAfter30Days() {
    var currentTime = new Date().getTime();
    var storedTime = localStorage.getItem('storageTime');

    if (!storedTime) {
        localStorage.setItem('storageTime', currentTime);
    } else {
        var daysDifference = (currentTime - storedTime) / (1000 * 60 * 60 * 24);
        if (daysDifference >= 5) {
            localStorage.clear();
            localStorage.setItem('storageTime', currentTime);
        }
    }
}

function countCharacters(inputString) {
    return inputString.length;
}

// Call the function when the page loads
clearLocalStorageAfter30Days();

function openPopup() {
    var overlay = document.getElementById('overlay');
    var popup = document.getElementById('popup');
    var closePopupButton = document.getElementById('closePopup');

    overlay.style.display = 'block';
    popup.classList.add('active');
    closePopupButton.style.display = 'block';
}

function openPopup2() {
    var overlay = document.getElementById('overlay');
    var popup2 = document.getElementById('popup2');
    var closePopupButton = document.getElementById('closePopup');

    overlay.style.display = 'block';
    popup2.classList.add('active');
    closePopupButton.style.display = 'block';
}

function closePopup() {
    var overlay = document.getElementById('overlay');
    var popup = document.getElementById('popup');
    var popup2 = document.getElementById('popup2');
    var closePopupButton = document.getElementById('closePopup');

    overlay.style.display = 'none';
    popup.classList.remove('active');
    popup2.classList.remove('active');
    closePopupButton.style.display = 'none';
}

function submitForm() {
    var fieldValue1 = document.getElementById('field1').value;
    var fieldValue2 = document.getElementById('field2').value;

    localStorage.setItem(fieldValue1, fieldValue2);

    closePopup();
}

function submitForm2() {
    var fieldValue3 = document.getElementById('field3').value;

    var key = localStorage.getItem(fieldValue3);
    if (key) {
        document.getElementById('field3').style.display = 'none';
        document.getElementById('submit2').style.display = 'none';
        document.getElementById('popuptext').innerText = "Share This With Someone You Want To See It";
        document.getElementById('outkey').innerText = key;
        document.getElementById('outkey').style.display = ''
        document.getElementById('copyer').style.display = ''
        document.getElementById('Close').style.display = 'none'
        document.getElementById('submit3').style.display = 'block';
    } else {
        document.getElementById('field3').style.display = 'none';
        document.getElementById('submit2').style.display = 'none';
        document.getElementById('popuptext').innerText = "No Such Encrypted Text Found";
        document.getElementById('outkey').innerText = key;
        document.getElementById('outkey').style.display = ''
        document.getElementById('copyer').style.display = 'none'
        document.getElementById('Close').style.display = 'none'
        document.getElementById('submit3').style.display = 'block';
    }
}

function submitForm3() {
    document.getElementById('field3').style.display = '';
    document.getElementById('field3').value = "";
    document.getElementById('submit2').style.display = '';
    document.getElementById('popuptext').innerText = "Enter Your Encrypted Text You Want The Key For";
    document.getElementById('outkey').innerText = "Loading...";
    document.getElementById('outkey').style.display = 'none'
    document.getElementById('copyer').style.display = 'none'
    document.getElementById('Close').style.display = ''
    document.getElementById('submit3').style.display = 'none';
    closePopup();
}