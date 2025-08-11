<?php
    require __DIR__.'/../config/conexion.php';
    header('Content-Type: application/json');

    try {
        $bodega_id = $_GET['bodega_id'];
        
        $query = $pdo->query("SELECT * FROM sucursales WHERE bodega_id = $bodega_id;");
        $sucursales = $query->fetchAll(PDO::FETCH_ASSOC);
    
        echo json_encode($sucursales);

    } catch (PDOException $e) {
        http_response_code(500);

        echo json_encode([
            'status' => 'error',
            'mensaje' => 'Error en el servidor'
        ]);
    }
    

?>