import { getBodegas, getMonedas, getSucursales, insertProducto } from "./servicios.js";
import { Formulario } from "./formulario.js";
import { agregarOpciones } from "../utils/create_options.js";
import { existeCodigoEnDB } from "./validaciones.js";

const formulario = new Formulario();
const form = document.querySelector('#formulario');
const { bodega, sucursal, moneda } = form.elements;

form.addEventListener('change', actualizarFormulario);
form.addEventListener('keydown', evitarDefault);
form.addEventListener('submit', enviarFormulario);
bodega.addEventListener('change', cargarSucursales);

cargarBodegas(bodega);
cargarMonedas(moneda);

function evitarDefault(event) {
    if(event.key === 'Enter') {
        event.preventDefault();
    }
}

function actualizarFormulario(event) {
    const { value, checked, name: campo } = event.target;

    if(campo !== 'materiales') {
        formulario.actualizarValor(campo, value)
    } else {
        if (checked) {
            formulario.agregarMaterial(value)
        } else {
            formulario.eliminarMaterial(value)
        }
    }
}

async function enviarFormulario(event) {
    event.preventDefault()

    formulario.validar()
    await formulario.validarExistenciaDeCodigo()

    if(formulario.errores.length === 0) {
        const respuesta = await insertProducto(formulario.estado);
        
        if (respuesta.status === 'success') {
            alert(respuesta.mensaje)
            form.reset();
        }
    } else {
        formulario.mostrarErrores()
    }
}


async function cargarBodegas(dropdown) {
    const bodegas = await getBodegas()
    agregarOpciones(dropdown, bodegas)
}

async function cargarMonedas(dropdown) {
    const monedas = await getMonedas()
    agregarOpciones(dropdown, monedas)
}

async function cargarSucursales(event) {
    event.stopPropagation();
    const { name:campo, value: bodegaId } = event.target;

    const sucursales = await getSucursales(bodegaId)

    formulario.actualizarValor('sucursal', '');
    formulario.actualizarValor(campo, bodegaId);
    agregarOpciones(sucursal, sucursales)
}