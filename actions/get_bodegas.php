<?php
    require __DIR__.'/../config/conexion.php';
    header('Content-Type: application/json');

    try {
        $query = $pdo->query("SELECT * FROM bodegas;");
        $bodegas = $query->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($bodegas);
    } catch (PDOException $e) {
        http_response_code(500);

        echo json_encode([
            'status' => 'error',
            'mensaje' => 'Error en el servidor'
        ]);
    }
    

?>