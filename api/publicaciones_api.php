<?php
// Incluimos la configuración de la base de datos y la nueva clase.
require_once '../supabase_config.php';
require_once 'GestorPublicaciones.php';

// Establecemos la cabecera para indicar que la respuesta es JSON.
header('Content-Type: application/json');

// Obtenemos las publicaciones usando la clase y las credenciales.
$publicaciones = GestorPublicaciones::obtenerTodas($supabase_url, $supabase_key);

// Imprimimos el resultado en formato JSON.
echo json_encode($publicaciones);

?>