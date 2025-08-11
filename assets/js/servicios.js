export async function getBodegas() {
    try {
        const respuesta = await fetch('../../actions/get_bodegas.php');
        
        if(!respuesta.ok) {
            throw new Error(`Error en la respuesta del servidor ${respuesta.status}`);
        }

        return await respuesta.json();

    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getSucursales(bodegaId) {
    try {
        const respuesta = await fetch(`../../actions/get_sucursales.php?bodega_id=${bodegaId}`)

        if(!respuesta.ok) {
            throw new Error(`Error en la respuesta del servidor ${respuesta.status}`);
        }

        return await respuesta.json();

    } catch (error) {
        console.error(error)
        return [];
    }
}

export async function getMonedas() {
    try {
        const respuesta = await fetch('../../actions/get_monedas.php');

        if(!respuesta.ok) {
            throw new Error(`Error en la respuesta del servidor ${respuesta.status}`);
        }

        return await respuesta.json();

    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function existeCodigo(codigo) {
    try {
        const respuesta = await fetch(`../../actions/get_existencia_codigo.php?codigo=${codigo}`)

        if (!respuesta.ok) {
            throw new Error(`Error en la respuesta del servidor ${respuesta.status}`);
        }

        return await respuesta.json();

    } catch(error) {
        console.error(error);
    }
}

export async function insertProducto(producto) {
    try {
        const respuesta = await fetch('../../actions/insertar_producto.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)

        })
        
        if(!respuesta.ok) {
            throw new Error(`Error en la respuesta del servidor ${respuesta.status}`);
        }

        return respuesta.json()

    } catch (error) {
        console.error(error)
        return []
    }
}