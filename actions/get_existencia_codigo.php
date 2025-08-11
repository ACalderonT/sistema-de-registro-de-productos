<?php
    require __DIR__.'/../config/conexion.php';
    header('Content-Type: application/json');

    try {
        $codigo = $_GET['codigo'];

        $codigo_quoted = $pdo->quote($codigo);

        $query = $pdo->query ("SELECT EXISTS (SELECT 1 FROM productos WHERE codigo = $codigo_quoted);");
        $existe = $query->fetchColumn();

        echo json_encode($existe);

    } catch (PDOException $e) {
        http_response_code(500);

        echo json_encode([
            'status' => 'error',
            'mensaje' => "Error en el servidor"
        ]);
    } finally {
        $pdo = null;
    }
?>