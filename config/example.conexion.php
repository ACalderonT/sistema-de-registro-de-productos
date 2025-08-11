<?php

$host = 'localhost';
$port = 5432;
$dbname = 'your-db-name';
$user = 'your-user';
$password = 'your-password';

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

?>