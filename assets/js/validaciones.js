import ERRORES_PERSONALIZADOS from "./errores.js"
import { existeCodigo } from "./servicios.js"

const MIN_LONGITUD = {
    codigo: 5,
    nombre: 2,
    descripcion: 10
}

const MAX_LONGITUD = {
    codigo: 15,
    nombre: 50,
    descripcion: 1000
}

const FORMATO_REGEX = {
    codigo: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
    precio: /^\d+(\.\d{1,2})?$/
}

function noEstaVacio(respuesta) {
    const largoRespuesta = respuesta.replaceAll(" ", "").length

    return largoRespuesta > 0;
}

function cumpleMinyMax(campo, respuesta) {
    const largoRespuesta = respuesta.trim().length

    return campo in MIN_LONGITUD ? largoRespuesta >= MIN_LONGITUD[campo] && largoRespuesta <= MAX_LONGITUD[campo] : true
}

function formatoValido(campo, respuesta) {
    return campo in FORMATO_REGEX ? FORMATO_REGEX[campo].test(respuesta) : true
}

function tieneMinimoDosMateriales(materiales) {
    return materiales.length >= 2
}

export async function existeCodigoEnDB(respuesta) {
    const resultado = await existeCodigo(respuesta);
    return !resultado || ERRORES_PERSONALIZADOS.codigo.unicidad
}

export const validacionesPorCampo =  {
    codigo: [
        (respuesta) => noEstaVacio(respuesta) || ERRORES_PERSONALIZADOS.codigo.obligatorio,
        (respuesta) => cumpleMinyMax('codigo', respuesta) || ERRORES_PERSONALIZADOS.codigo.longitud,
        (respuesta) => formatoValido('codigo', respuesta) || ERRORES_PERSONALIZADOS.codigo.formato
    ],
    nombre: [
        (respuesta) => noEstaVacio(respuesta) || ERRORES_PERSONALIZADOS.nombre.obligatorio,
        (respuesta) => cumpleMinyMax('nombre', respuesta) || ERRORES_PERSONALIZADOS.nombre.longitud
    ],
    precio: [
        (respuesta) => noEstaVacio(respuesta) || ERRORES_PERSONALIZADOS.precio.obligatorio,
        (respuesta) => formatoValido('precio', respuesta) || ERRORES_PERSONALIZADOS.precio.formato
    ],
    materiales: [
        (respuesta) => tieneMinimoDosMateriales(respuesta) || ERRORES_PERSONALIZADOS.materiales.obligatorio
    ],
    bodega: [
        (respuesta) => noEstaVacio(respuesta) || ERRORES_PERSONALIZADOS.bodega.obligatorio
    ],
    sucursal: [
        (respuesta) => noEstaVacio(respuesta) || ERRORES_PERSONALIZADOS.sucursal.obligatorio
    ],
    moneda: [
        (respuesta) => noEstaVacio(respuesta) || ERRORES_PERSONALIZADOS.moneda.obligatorio
    ],
    descripcion: [
        (respuesta) => noEstaVacio(respuesta) || ERRORES_PERSONALIZADOS.descripcion.obligatorio,
        (respuesta) => cumpleMinyMax('descripcion', respuesta) || ERRORES_PERSONALIZADOS.descripcion.longitud
    ]
}