<?php

class InterconsultaModel
{
    public static function solicitarInterconsulta($solicitud_nombre_referente, $solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional)
    {
        //verificar si el profesional está habilitado para recibir interconsultas
        $contrareferente = UserModel::getUserDataByUserNameOrEmail($solicitud_profesionalemail);
        $response = new stdClass();

        if (isset($contrareferente->user_email)){
            if ($contrareferente->user_email == $solicitud_profesionalemail){
                //almacenar la interconsulta

                if (Session::userIsLoggedIn()) {
                    $solicitud_profesional = UserModel::getPublicProfileOfUser(Session::get('user_id'))->user_profesion;
                    $solicitud_nombreprofesional = Session::get('user_name');
                    $solicitud_email = Session::get('user_email');
                }
                
                SolicitudesModel::createSolicitud($solicitud_nombre_referente, $solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional);
                
                //enviar un email al médico contrareferente
                EmailModel::sendContrareferenteEmail($solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional);
                //enviar una copia al que solicito la interconsulta
                EmailModel::sendSolicitanteEmail($solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional);
                $response->result = true;
            }
        }
        else{
            $response->result = false;
        }
        
        return $response;
    }

    public static function solicitarInterconsultaInternal($solicitud_nombre_referente, $solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional)
    {
        //verificar si el profesional está habilitado para recibir interconsultas
        $contrareferente = UserModel::getUserDataByUserNameOrEmail($solicitud_profesionalemail);
        $response = new stdClass();

        if (isset($contrareferente->user_email)){
            if ($contrareferente->user_email == $solicitud_profesionalemail){
                //almacenar la interconsulta

                if (Session::userIsLoggedIn()) {
                    $solicitud_profesional = UserModel::getPublicProfileOfUser(Session::get('user_id'))->user_profesion;
                    $solicitud_nombreprofesional = Session::get('user_name');
                    $solicitud_email = Session::get('user_email');
                }
                
                $solicitud_id = SolicitudesModel::createSolicitud($solicitud_nombre_referente, $solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional);
                EvaluacionModel::createEvaluacion($solicitud_id, $solicitud_fecha, "");7
                SolicitudesModel::updateStateSolicitud($solicitud_id, 1);
                $response->result = true;
            }
        }
        else{
            $response->result = false;
        }
        
        return $response;
    }
}
