import * as UIUtils from './uiUtils.js';

const VowelStructures = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat',
};

const SecretKeysStructures = {
    ai: 'a',
    enter: 'e',
    imes: 'i',
    ober: 'o',
    ufat: 'u',
};

const vowelsRegex = /[aeiou]/g;
const secretKeysRegex = /ai|enter|imes|ober|ufat/g;

export function encrypt(input) {
    const errors = validateInput(input);
    if (errors.length) {
        return UIUtils.showErrors(errors);
    }

    const output = input.replace(
        vowelsRegex,
        (matched) => VowelStructures[matched]
    );

    UIUtils.showOutput(output);
}

export function decrypt(input) {
    const errors = validateInput(input);
    if (errors.length) {
        return UIUtils.showErrors(errors);
    }

    const output = input.replace(
        secretKeysRegex,
        (matched) => SecretKeysStructures[matched]
    );

    UIUtils.showOutput(output);
}

function validateInput(string) {
    const isEmpty = string.trim() === '';

    const hasUppercaseLetters = /[A-Z]/.test(string);

    const hasSpecialCharacters = /[^a-z0-9\s]/.test(string);

    let errorMessages = [];

    if (isEmpty) errorMessages.push('Entrada vacía.');
    if (hasUppercaseLetters) errorMessages.push('Mayúsculas.');
    if (hasSpecialCharacters) errorMessages.push('Caracteres especiales.');

    return errorMessages;
}
