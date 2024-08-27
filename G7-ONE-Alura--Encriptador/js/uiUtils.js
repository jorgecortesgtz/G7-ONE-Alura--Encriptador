import * as DomUtils from './domUtils.js';
import * as ViewUtils from './viewsUtils.js';

let isAlertVisible = false;

function buildAndShowModal(content) {
    DomUtils.checkBodyExistence();
    const body = DomUtils.getBodyElement();

    const show = () => {
        body.style.overflowY = 'hidden';
        body.appendChild(modal);
    };

    const close = () => {
        if (isAlertVisible) return;

        body.style.overflowY = 'auto';
        modal.remove();
    };

    const modal = document.createElement('div');
    modal.id = 'modal';

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-card');
    modalContent.appendChild(content);

    const closeButton = document.createElement('button');
    closeButton.id = 'close-modal-button';
    closeButton.innerText = 'x';
    closeButton.onclick = () => close();

    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            close();
        }
    });

    show();
}

export function openModal(view) {
    if (!['rules', 'decrypt', 'encrypt'].includes(view)) return;

    let content = null;

    if (view === 'rules') {
        content = ViewUtils.buildRulesViewContent();
    }
    if (view === 'encrypt' || view === 'decrypt') {
        content = ViewUtils.buildEncryptionViewContent(view);
    }

    buildAndShowModal(content);
}

export function showErrors(errors) {
    const content = ViewUtils.buildErrorsViewContent(errors);

    buildAndShowAlert(content);
}

export function showOutput(output) {
    const content = ViewUtils.buildOutputViewContent(output);

    buildAndShowAlert(content);
}

function buildAndShowAlert(content) {
    DomUtils.checkBodyExistence();
    const body = DomUtils.getBodyElement();

    const show = () => {
        body.appendChild(alert);
        isAlertVisible = true;
    };

    const close = () => {
        alert.remove();
        isAlertVisible = false;
    };

    const alert = document.createElement('div');
    alert.id = 'alert';

    const alertContent = document.createElement('div');
    alertContent.classList.add('alert-card');
    alertContent.appendChild(content);

    const closeButton = document.createElement('button');
    closeButton.id = 'close-alert-button';
    closeButton.innerText = 'x';
    closeButton.onclick = () => close();

    alertContent.appendChild(closeButton);
    alert.appendChild(alertContent);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            close();
        }
    });

    show();
}
