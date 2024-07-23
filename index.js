document.getElementById('generatePassword').addEventListener('click', () =>
{
    const passworLength = document.getElementById('passwordLength').value;
    const includeLowerCase = document.getElementById('includeLowerCase').checked;
    const includeUpperCase = document.getElementById('includeUpperCase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    const outputPassword = document.getElementById('outputPassword');
    const message = document.getElementById('message');

    message.style.color = '#333333';

    if (passworLength < 20)
    {
        message.textContent = 'Palavra-Passe tem que conter pelo menos 20 caracteres';
        return;
    }

    if (!includeLowerCase && !includeUpperCase && !includeNumbers && !includeSymbols)
    {
        message.textContent = 'Tem que incluir pelo menos um parâmetro';
        return;
    }

    message.textContent = '';

    let password = generatePassword(passworLength, includeLowerCase,
            includeUpperCase, includeNumbers, includeSymbols);
    outputPassword.value = password;
});


function generatePassword(length, includeLowerCase,
    includeUpperCase, includeNumbers, includeSymbols)
{
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%&*()-_=+';

    let allowedChars = '';
    let password = '';

    allowedChars += includeLowerCase ? lowerCaseChars : '';
    allowedChars += includeUpperCase ? upperCaseChars : '';
    allowedChars += includeNumbers ? numberChars : '';
    allowedChars += includeSymbols ? symbolChars : '';

    for (let i = 0; i < length; i++)
    {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    return(password);
}


document.getElementById('copyPassword').addEventListener('click', async function()
{
    const outputPassword = document.getElementById('outputPassword').value;
    const message = document.getElementById('message');

    if (!outputPassword)
    {
        message.textContent = 'Por favor, gere uma senha primeiro';
        message.style.color = 'orange';
        return;
    }

    try
    {
        await navigator.clipboard.writeText(outputPassword);
        message.textContent = 'Senha copiada para a área de transferência';
        message.style.color = 'green';
    }
    catch(error)
    {
        message.textContent = `Erro ao copiar a senha: ${error.message}`;
        message.style.color = 'red';
    }
});