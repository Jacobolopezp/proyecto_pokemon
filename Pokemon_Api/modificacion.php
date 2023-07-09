<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input');

$params = json_decode($json);

require("conexion.php");
$con=retornarConexion();

mysqli_query($con,"update atributos set 
nombre='$params->nombre',
tipo='$params->tipo',
descripcion='$params->descripcion',
peso=$params->peso
where codigo=$params->codigo");

class Result {
    public $resultado;
    public $mensaje;
}
$response = new Result();
$response->resultado = 'OK';
$response->mensaje = 'datos modificados';

header('Content-Type: application/json');
echo json_encode($response);
?>