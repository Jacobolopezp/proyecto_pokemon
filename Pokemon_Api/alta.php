<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input');

$params = json_decode($json);

require("conexion.php");
$con=retornarConexion();

$nombre = mysqli_real_escape_string($con, $params->nombre);
$tipo = mysqli_real_escape_string($con, $params->tipo);
$descripcion = mysqli_real_escape_string($con, $params->descripcion);
$peso = mysqli_real_escape_string($con, $params->peso);

mysqli_query($con, "INSERT INTO atributos (nombre, tipo, descripcion, peso) VALUES
('$nombre', '$tipo', '$descripcion', '$peso')");

class Result {
    public $resultado;
    public $mensaje;
}

$response = new Result();
$response->resultado = "OK";
$response->mensaje = 'datos grabados';

header('Content-Type: application/json');
echo json_encode($response);

?>
