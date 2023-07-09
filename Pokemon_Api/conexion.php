<?php
function retornarConexion() {
    $con=mysqli_connect("localhost","root", "", "bd_pokemon");
    return $con;
}
?>