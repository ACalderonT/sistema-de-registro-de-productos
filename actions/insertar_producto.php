<?php 
    require __DIR__.'/../config/conexion.php';
    header('Content-Type: application/json');
    $pdo->beginTransaction();

    try {

        $rawData = file_get_contents('php://input');
        $data = json_decode($rawData, true);
        extract($data);

        $sql = "INSERT INTO productos (codigo, nombre, descripcion, precio, moneda_id, sucursal_id) VALUES (:codigo, :nombre, :descripcion, :precio, :moneda_id, :sucursal_id) RETURNING id, codigo;";
        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            ':codigo' => $codigo,
            ':nombre' => $nombre,
            ':descripcion' => $descripcion,
            ':precio' => (float)$precio,
            ':moneda_id' => (int)$moneda,
            ':sucursal_id' => (int)$sucursal
        ]);

        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        $stmt->closeCursor();

        $id_producto_insertado = $resultado['id'];
        $codigo_insertado = $resultado['codigo'];
        
        $values = [];
        $params = [];

        foreach ($materiales as $index => $material_id) {
            $values[] = "(:producto_id{$index}, :material_id{$index})";
            $params[":producto_id{$index}"] = $id_producto_insertado;
            $params[":material_id{$index}"] = $material_id;
        }

        $sql = "INSERT INTO productos_material (producto_id, material_id) VALUES " . implode(", ", $values);
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $stmt->closeCursor();

        $pdo->commit();

        http_response_code(201);

        $respuesta = [
            'status' => 'success',
            'mensaje' => 'Producto guardado satisfactoriamente',
            'codigo' => $codigo_insertado
        ];

        echo json_encode($respuesta);

    } catch (PDOException $e) {
        $pdo->rollBack();

        if ($e->getCode() === '23505') { 
            http_response_code(409);
            echo json_encode([
                'status' => 'error',
                'mensaje' => 'Este producto ya existe'
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'mensaje' => `Error en el servidor $e`
            ]);
        }
    } finally {
        $pdo = null;
    }
?>