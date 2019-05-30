<?php

class CurvasModel
{
    public static function cerebelo($eg, $cerebelo)
    {
        $tabla = DataModel::cerebelo();

        if ($eg < 15 || $eg > 40) {
            return 0;
        }
        else {
            $uno = $tabla[2][$eg] - $tabla[0][$eg];
            $dos = $cerebelo - $tabla[0][$eg];
            return $dos;
            $resultado = intval((95 / ($uno) * ($dos)) + 5);

            if ($resultado > 99) {
                return '> 99';
            }
            else if ($resultado < 1) {
                return '< 1';
            }
            else {
                return $resultado;
            }
        }
    }
}