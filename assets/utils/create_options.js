const DEFAULT_OPTION = `<option value="" selected></option>`

const limpiarHTML = (dropdown) => {
    while(dropdown.firstChild) {
        dropdown.removeChild(dropdown.firstChild)
    }
}

const crearHTMLOpcion = (elemento) => {
    const nuevaOpcion = document.createElement('option');
    nuevaOpcion.setAttribute('value', elemento.id);
    nuevaOpcion.innerText = elemento.nombre;
    
    return nuevaOpcion
}

export const agregarOpciones = (dropdown, elementos) => {
    limpiarHTML(dropdown);

    dropdown.insertAdjacentHTML("afterbegin", DEFAULT_OPTION)

    elementos.forEach( elemento => {
        const nuevaOpcion = crearHTMLOpcion(elemento)
        dropdown.appendChild(nuevaOpcion)
    })
}