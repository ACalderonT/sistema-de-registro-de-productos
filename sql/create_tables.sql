CREATE TABLE IF NOT EXISTS materiales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS monedas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS bodegas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS sucursales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    bodega_id INTEGER NOT NULL,
    FOREIGN KEY (bodega_id) REFERENCES bodegas(id) ON DELETE CASCADE 
);

CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(15) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(1000) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL,
    moneda_id INTEGER NOT NULL,
    sucursal_id INTEGER NOT NULL,

    FOREIGN KEY (moneda_id) REFERENCES monedas(id),
    FOREIGN KEY (sucursal_id) REFERENCES sucursales(id)
);

CREATE TABLE IF NOT EXISTS productos_material (
    producto_id INTEGER NOT NULL,
    material_id INTEGER NOT NULL,

    PRIMARY KEY (producto_id, material_id),
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (material_id) REFERENCES materiales(id)
);