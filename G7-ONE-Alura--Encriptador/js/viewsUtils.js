import * as EncryptionUtils from './encryptionUtils.js';

export function buildRulesViewContent() {
    const rulesViewContent = document.createElement('div');
    rulesViewContent.id = 'rules-content';
    rulesViewContent.classList.add('content', 'list-content');
    rulesViewContent.innerHTML = `
        <h3>Reglas</h3>
        <ul>
            <li>No usar mayúsculas.</li>
            <li>No usar caracteres especiales.</li>
            <li>Los saltos de línea están permitidos.</li>
            <li>Hacer caso omiso a las reglas puede producir salidas inesperadas.</li>
        </ul>
    `;

    return rulesViewContent;
}

export function buildEncryptionViewContent(action) {
    if (!(action === 'encrypt' || action === 'decrypt'))
        return document.createElement('div');

    const content = document.createElement('div');
    content.id = 'encryption-content';
    content.classList.add('content');
    content.innerHTML = `
        <h3>${
            action === 'encrypt' ? 'Encriptar Texto' : 'Desencriptar Texto'
        }</h3>
    `;

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    const textarea = buildTextarea(action);
    const clearButton = buildClearTextareaButton(textarea);
    const actionButton = buildEncryptionButton(action, textarea);

    buttonsContainer.appendChild(clearButton);
    buttonsContainer.appendChild(actionButton);

    content.appendChild(textarea);
    content.appendChild(buttonsContainer);

    return content;
}

export function buildOutputViewContent(output) {
    const outputContent = document.createElement('div');
    outputContent.innerHTML = `
        <h3>Salida</h3>

        <p>El resultado es:</p>
        <div class="output">
            <p>${output}</p>
        </div>
    `;
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    const copyButton = buildCopyButton(output);
    buttonsContainer.appendChild(copyButton);

    outputContent.appendChild(buttonsContainer);

    return outputContent;
}

export function buildErrorsViewContent(errors = []) {
    if (!errors.length) return document.createElement('div');

    const errorsContent = document.createElement('div');
    errorsContent.innerHTML = `
        <h3>Error</h3>
        <p>Se han encontrado los siguientes errores:</p>
        <ul>
            ${errors.map((error) => `<li>${error}</li>`).join('')}
        </ul>
    `;

    return errorsContent;
}

function buildTextarea(action) {
    if (!(action === 'encrypt' || action === 'decrypt'))
        return document.createElement('div');

    const textarea = document.createElement('textarea');
    textarea.id = 'textarea';
    textarea.placeholder =
        action === 'encrypt'
            ? 'Ingresa el texto a encriptar.'
            : 'Ingresa el texto a desencriptar.';
    textarea.rows = '8';

    return textarea;
}

function buildClearTextareaButton(textareaElement) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('button-wrapper');

    const button = document.createElement('button');
    button.id = 'clear-button';
    button.innerText = 'Limpiar';

    button.addEventListener('click', (e) => {
        if (!textareaElement) return;
        textareaElement.value = '';
    });

    wrapper.appendChild(button);

    return wrapper;
}

function buildEncryptionButton(action, textarea) {
    if (!(action === 'encrypt' || action === 'decrypt') || !textarea)
        return document.createElement('div');

    const buttonInnerText = action === 'encrypt' ? 'Encriptar' : 'Desencriptar';

    const wrapper = document.createElement('div');
    wrapper.classList.add('button-wrapper');

    const button = document.createElement('button');
    button.innerText = buttonInnerText;

    if (action === 'encrypt') button.id = 'encrypt-button';
    if (action === 'decrypt') button.id = 'decrypt-button';

    button.addEventListener('click', (e) => {
        const value = textarea.value;

        if (action === 'encrypt') EncryptionUtils.encrypt(value);
        if (action === 'decrypt') EncryptionUtils.decrypt(value);
    });

    wrapper.appendChild(button);

    return wrapper;
}

function buildCopyButton(output) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('button-wrapper');

    const button = document.createElement('button');
    button.id = 'copy-button';
    button.innerText = 'Copiar';

    button.addEventListener('click', (e) => {
        navigator.clipboard.writeText(output);

        alert('Se ha copiado el texto');
    });

    wrapper.appendChild(button);

    return wrapper;
}
