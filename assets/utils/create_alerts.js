
const limpiarHTML = (dropdown) => {
    while(dropdown.firstChild) {
        dropdown.removeChild(dropdown.firstChild)
    }
}

const crearHTMLItemsError = (error) => {
    const nuevoErrorItem = document.createElement('li');
    nuevoErrorItem.setAttribute('value', error);
    nuevoErrorItem.innerText = error;
    
    return nuevoErrorItem;
}

export const agregarErrores = (spanTag, errores) => {
    limpiarHTML(spanTag);

    spanTag.classList.remove('ocultar');
    spanTag.classList.add('mostrar', 'error');

    const ulElement = document.createElement('ul');
    spanTag.appendChild(ulElement);

    errores.forEach(error => {
        const nuevoErrorItem = crearHTMLItemsError(error);
        ulElement.appendChild(nuevoErrorItem);
    });
}

export const successAlert = (spanTag, mensaje) => {
    limpiarHTML(spanTag);

    spanTag.classList.remove('ocultar');
    spanTag.classList.add('success', 'mostrar', 'centered-text');
    spanTag.innerText = mensaje;

    setTimeout(() => {
        spanTag.classList.remove('success', 'mostrar', '.centered-text');
        spanTag.classList.add('ocultar');
        spanTag.innerText = '';
    }, 3000)

} 