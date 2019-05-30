<?php

class CurvasModel
{
    public static function cerebelo($eg, $cerebelo)
    {
        $Tabla = DataModel::cerebelo();

        if ($eg < 15 || $eg > 40) {
            return 0;
        }
        else {
            $uno = Tabla[2][eg] - Tabla[0][eg];
            $dos = $cerebelo - Tabla[0][eg];
            $resultado = parseInt(95 / (uno) * (dos) + 5);

            if (resultado > 99) {
                return '> 99';
            }
            else if (resultado < 1) {
                return '< 1';
            }
            else {
                return resultado;
            }
        }
    }
}