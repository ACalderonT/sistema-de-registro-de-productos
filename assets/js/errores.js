const ERRORES_PERSONALIZADOS = {
    codigo: {
        obligatorio: "El código del producto no puede estar en blanco.",
        formato: "El código del producto debe contener letras y números.",
        longitud: "El código del producto debe tener entre 5 y 15 carácteres.",
        unicidad: "El código del producto ya está registrado."
    },
    nombre: {
        obligatorio: "El nombre del producto no puede estar en blanco.",
        longitud: "El nombre del producto debe tener entre 2 y 50 caracteres."
    },
    precio: {
        obligatorio: "El precio del producto no puede estar en blanco.",
        formato: "El precio del producto debe ser un número positivo con hasta dos decimales."
    },
    materiales: {
        obligatorio: "Debe seleccionar al menos dos materiales para el producto."
    },
    bodega: {
        obligatorio: "Debe seleccionar una bodega."
    },
    sucursal: {
        obligatorio: "Debe seleccionar una sucursal para la bodega seleccionada."
    },
    moneda: {
        obligatorio: "Debe seleccionar una moneda para el producto."
    },
    descripcion: {
        obligatorio: "La descripción del producto no puede estar en blanco.",
        longitud: "La descripción del producto debe tener entre 10 y 1000 caracteres."
    }
}

export default ERRORES_PERSONALIZADOS;