<?php
    require __DIR__.'/../config/conexion.php';
    header('Content-Type: application/json');

    try {
        $query = $pdo->query("SELECT * FROM monedas;");
        $monedas = $query->fetchAll(PDO::FETCH_ASSOC);
    
        echo json_encode($monedas);

    } catch (PDOException $e) {
        http_response_code(500);

        echo json_encode([
            'status' => 'error',
            'mensaje' => 'Error en el servidor'
        ]);
    }


?>