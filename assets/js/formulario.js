import { existeCodigoEnDB, validacionesPorCampo } from "./validaciones.js";

export class Formulario { 
    constructor() {
        this.estado = {
            codigo: '',
            nombre: '',
            bodega: '',
            sucursal: '',
            moneda: '',
            precio: '',
            materiales: [],
            descripcion: ''
        };

        this.errores = [];
    }

    actualizarValor(campo, valor) {
        this.estado[campo] = valor;
    }

    agregarMaterial(valor) {
        this.estado['materiales'].push(valor)
    }

    eliminarMaterial(valor) {
        this.estado['materiales'] = this.estado['materiales'].filter(material => material != valor)
    }

    validar() {
        this.errores = [];

        for (const [campo, respuesta] of Object.entries(this.estado)) {

            if(validacionesPorCampo[campo]){
                for(const validador of validacionesPorCampo[campo]){
                    const resultado = validador(respuesta)

                    if(typeof resultado === 'string') this.errores.push(resultado);
                }
            }
        }
    }

    async validarExistenciaDeCodigo() {
        if(this.estado.codigo) {
            const resultado = await existeCodigoEnDB(this.estado.codigo);

            if(typeof resultado === 'string') this.errores.push(resultado);
        }
    }

    mostrarErrores() {
        this.errores.forEach(error => alert(error));
    }
}