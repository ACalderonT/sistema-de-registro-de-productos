INSERT INTO bodegas (id, nombre) VALUES 
(1, 'Bodega 1'),
(2, 'Bodega 2');

INSERT INTO sucursales (id, nombre, bodega_id) VALUES 
(1, 'Sucursal 1', 1),
(2, 'Sucursal 2', 1),
(3, 'Sucursal 3', 1),
(4, 'Sucursal 4', 2),
(5, 'Sucursal 5', 2),
(6, 'Sucursal 6', 2);

INSERT INTO monedas (id, nombre) VALUES
(1, 'Peso Chileno'),
(2, 'Dólar'),
(3, 'Euro');

INSERT INTO materiales (id, nombre) VALUES
(1, 'plastico'),
(2, 'metal'),
(3, 'madera'),
(4, 'vidrio'),
(5, 'textil');
