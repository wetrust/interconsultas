<?php

class ProcesadorModel
{
    public static function informeCrecimientoFetal()
    {
        $resultado = new stdClass();

        $resultado->nombre = Request::post('nombre');
        $resultado->edadMaterna = Request::post('edad_materna') . ' años.';
        $resultado->fechaExamen = Request::post('fecha_examen');
        $resultado->idPaciente = Request::post('id');
        $resultado->motivoExamen = Request::post('motivo_examen');
        $resultado->patologiaObstetrica = Request::post('patologia');
        $resultado->fum = Request::post('fecha_fum');
        $resultado->eg = Request::post('edad_gestacional') . ' semanas.';
        $resultado->fpp = Request::post('fecha_fpp');
        $resultado->ecografista = Request::post('ecografista');

        $resultado->DBP = Request::post('dbp');
        $resultado->DBPPCT = Request::post('dbp_pct');
        $resultado->DBPRANGO = Request::post('dbp_rango');
        $resultado->DOF = Request::post('dof');
        $resultado->DOFPCT = Request::post('dof_pct');
        $resultado->DOFRANGO = Request::post('dof_rango');
        $resultado->CC = Request::post('cc');
        $resultado->CCPCT = Request::post('cc_pct');
        $resultado->CCRANGO = Request::post('cc_rango');
        $resultado->CA = Request::post('ca');
        $resultado->CAPCT = Request::post('ca_pct');
        $resultado->CARANGO = Request::post('ca_rango');
        $resultado->LF = Request::post('lf');
        $resultado->LFPCT = Request::post('lf_pct');
        $resultado->LFRANGO = Request::post('lf_rango');
        $resultado->PFE = Request::post('pfe');
        $resultado->PFEPCT = Request::post('pfe_pct');
        $resultado->PFERANGO = Request::post('pfe_rango');
        $resultado->CCCA = Request::post('ccca');
        $resultado->CCCAPCT = Request::post('ccca_pct');
        $resultado->CCCARANGO = Request::post('ccca_rango');
        $resultado->IC = Request::post('ic');

        //datos internos
        $actCard = Request::post('actividad_cardiaca');
        $movCorp = Request::post('movimientos_corporales');
        $presentacion =  Request::post('presentacion');
        $dorso = Request::post('dorso');
        $fcf = Request::post('frecuencia');
        $anatomia = Request::post('anatomia');
        $insercion = Request::post('insercion');
        $ubicacion = Request::post('ubicacion');
        $grado = Request::post('grado');
        $cordon = Request::post('cordon');
        $vasos = Request::post('vasos');
        $liquido = Request::post('liquido');
        $bvm = Request::post('bvm');

        //decisiones
        $actCard = ($actCard == 0 ? "sin actividad cardiaca" : "con actividad cardiaca");
        $movCorp = ($movCorp == 0 ? "sin movimientos corporales" : "con movimientos corporales");

        $resultado->linea_primera = "Feto en presentación " . $presentacion. ", dorso " . $dorso . ", " . $actCard . " y " . $movCorp . ".";
        $resultado->linea_segunda = "Frecuencia cardiaca fetal de " . $fcf . " x minuto.";	
        $resultado->linea_tercera = "<strong>Anatomía fetal ***</strong> " . $anatomia;
        $resultado->linea_cuarta = "<strong>Placenta</strong> inserción " . $insercion . " y de ubicación " . $ubicacion . ", grado " . $grado;
        $resultado->linea_quinta = "<strong>Cordón umbilical</strong> " . $cordon . ", identificandose " . $vasos . " vasos.";
        $resultado->linea_sexta = "<strong>Líquido amniótico **</strong>" . $liquido . ", con bolsillo vertical mayor de " . $bvm . " mm.";

        $resultado->comentario = Request::post('comentario');
        return $resultado;
    }
}