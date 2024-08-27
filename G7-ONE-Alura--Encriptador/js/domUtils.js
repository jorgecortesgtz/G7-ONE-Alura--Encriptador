import * as UIUtils from './uiUtils.js';

const Buttons = {
    start: { element: null, id: 'start-button' },
    rulesModal: { element: null, id: 'rules-modal-button' },
    encryptionModal: { element: null, id: 'encryption-modal-button' },
    decryptionModal: { element: null, id: 'decryption-modal-button' },
};

const Elements = {
    body: { element: null, id: 'body' },
    actionsSection: { element: null, id: 'app-actions-section' },
};

export function handleDomContentLoaded(ev) {
    buildAndStoreDomElements();
    addEventListeners();
}

function buildAndStoreDomElements() {
    Elements.body.element = document.querySelector(Elements.body.id);

    /**
     * Botones visibles en la interfaz al iniciar la página.
     */
    Buttons.start.element = document.querySelector(`#${Buttons.start.id}`);
    Buttons.rulesModal.element = document.querySelector(
        `#${Buttons.rulesModal.id}`
    );
    Buttons.encryptionModal.element = document.querySelector(
        `#${Buttons.encryptionModal.id}`
    );
    Buttons.decryptionModal.element = document.querySelector(
        `#${Buttons.decryptionModal.id}`
    );

    Elements.actionsSection.element = document.querySelector(
        `#${Elements.actionsSection.id}`
    );
}

function addEventListeners() {
    if (Buttons.start.element) {
        Buttons.start.element.addEventListener('click', (e) => {
            if (Elements.actionsSection.element) {
                Elements.actionsSection.element.scrollIntoView();
            }
        });
    }

    if (Buttons.rulesModal.element) {
        Buttons.rulesModal.element.addEventListener('click', (e) => {
            UIUtils.openModal('rules');
        });
    }

    if (Buttons.encryptionModal.element) {
        Buttons.encryptionModal.element.addEventListener('click', (e) => {
            UIUtils.openModal('encrypt');
        });
    }

    if (Buttons.decryptionModal.element) {
        Buttons.decryptionModal.element.addEventListener('click', (e) => {
            UIUtils.openModal('decrypt');
        });
    }
}

export function checkBodyExistence() {
    if (!Elements.body.element)
        throw new DOMException('body element not found.');
}

export function getBodyElement() {
    return Elements.body.element;
}
