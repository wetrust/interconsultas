<?php

class ApiController extends Controller{
    public function send(){
       if (Session::get('user_account_type') == 4){
        $this->View->renderJSON(InterconsultaModel::solicitarInterconsultaInternal(Request::post('nombreReferente'), Request::post('correoReferente'),Request::post('nombre'), Request::post('apellido'), Request::post('rut'), Request::post('fecha'),Request::post('diagnostico'),Request::post('lugar'),Request::post('ciudad'),Request::post('fum'),Request::post('eg'),Request::post('telefono'),Request::post('sistolica'),Request::post('diastolica'),Request::post('media'),Request::post('talla'),Request::post('peso'),Request::post('imc'),Request::post('antecedentes'),Request::post('edadMaterna'),Request::post('paridad'), Request::post('parto')));
       }else{
        $this->View->renderJSON(InterconsultaModel::solicitarInterconsulta(Request::post('nombreContrarreferente'),Request::post('correoContrarreferente'),Request::post('nombre'),Request::post('apellido'),Request::post('rut'),Request::post('fecha'),Request::post('diagnostico'),Request::post('lugar'),Request::post('ciudad'),Request::post('profesional'),Request::post('nombreReferente'),Request::post('correoReferente'),Request::post('fum'),Request::post('eg'),Request::post('telefono'),Request::post('sistolica'),Request::post('diastolica'),Request::post('media'),Request::post('talla'),Request::post('peso'),Request::post('imc'),Request::post('antecedentes'),Request::post('edadMaterna'),Request::post('paridad')));
       }
    }

    public function profesionales(){
        $this->View->renderJSON(UserModel::getMedicos());
    }

    public function cerebelo($eg, $cerebelo){
        $this->View->renderJSON(CurvasModel::cerebelo($eg, $cerebelo));
    }

    public function emails($tipo){
        $this->View->renderJSON(DirectorioModel::getDirectorioTipo($tipo));
    }

    public function pacientes(){
        $this->View->renderJSON(PacientesModel::getAllPacientes());
    }

    public function buscarpaciente(){
        $paciente = trim(Request::get('url'), '/');
        $paciente = explode('/', $paciente);
        $paciente = $paciente[count($paciente)-1];
        $paciente = html_entity_decode($paciente);
        $paciente = Filter::XSSFilter($paciente);
        $paciente = str_replace("_", " ",$paciente); 
        //$this->View->renderJSON($paciente);
        $this->View->renderJSON(PacientesModel::findPacienteID($paciente));
    }

    public function paciente($paciente){
        $this->View->renderJSON(PacientesModel::getPacienteID($paciente));
    }

    public function getPaciente($rut){
        $response = new stdClass();
        $response->return = PacientesModel::getPaciente($rut);
        $this->View->renderJSON($response);
    }

    public function newPacientes(){
        $data = new stdClass();
        $data->nombre = Request::post('nombre');
        $data->apellido = Request::post('apellido');
        $data->rut = Request::post('rut');
        $data->fum = Request::post('fum');
        $data->ciudad = Request::post('ciudad');
        $data->lugar = Request::post('lugar');
        $data->nacionalidad = Request::post('nacionalidad');
        $data->patologia = Request::post('patologia');
        $data->telefono = Request::post('telefono');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = PacientesModel::createPaciente($data);
        $response->modal = $data->modal;
        $response->rut = $data->rut;
        $this->View->renderJSON($response);
    }

    public function updatePaciente(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->nombre = Request::post('nombre');
        $data->apellido = Request::post('apellido');
        $data->rut = Request::post('rut');
        $data->fum = Request::post('fum');
        $data->ciudad = Request::post('ciudad');
        $data->lugar = Request::post('lugar');
        $data->telefono = Request::post('telefono');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = PacientesModel::updatePaciente($data);
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function deletePaciente(){
        $data = new stdClass();
        $data->id = Request::post('id');

        $response = new stdClass();
        $response->return = PacientesModel::deletePaciente($data);
        $this->View->renderJSON($response);
    }

    public function getComunas(){
        $this->View->renderJSON(ApiModel::getAllComunas());
    }

    public function partouser(){
        $this->View->renderJSON(ApiModel::partoUser());
    }

    public function autorizarparto(){
        $this->View->renderJSON(ResponsablesModel::createResponsables(Request::post('usuario_parto')));
    }

    public function responsables(){
        $this->View->renderJSON(ResponsablesModel::getAllResponsables());
    }

    public function getPrepartosAutorizados(){
        $this->View->renderJSON(RespuestaModel::getAllResponsables());
    }
    
    public function examen($pacienteId){
        $this->View->renderJSON(SolicitudesModel::getAllOldSolicitudesWherePaciente($pacienteId));
    }

    //////////
    /////////
    public function getEsperaParto($token){
        if ($token) {
            $this->View->renderJSON(ApiModel::getAllPartos($token));
        }
    }

    public function agendar($token, $solicitud_id){
        if ($token) {
            $this->View->renderJSON(ApiModel::getSolicitud($token,$solicitud_id));
        }
    }

    public function baseParto($token, $user_id){
        if ($token) {
            $this->View->renderJSON(ApiModel::getOldSolicitudes($token,$user_id));
        }
    }

    public function partos($token){
        if ($token) {
            $this->View->renderJSON(ApiModel::getAllPartosEfectuados($token));
        }
    }

    public function dataPartos($token, $parto_id){
        if ($token) {
            $this->View->renderJSON(ApiModel::getPartos($token, $parto_id));
        }
    }

    public function deleteParto($token, $solicitud_id){
        if ($token) {
            $this->View->renderJSON(ApiModel::deleteParto($token, $solicitud_id));
        }
    }

    public function savePartos($token){
        if ($token) {
            $solicitud_id = Request::post('solicitud_id');
            $fecha_parto = Request::post('fecha_parto');
            $semanas = Request::post('semanas');
            $dias = Request::post('dias');
            $peso = Request::post('peso');
            $talla = Request::post('talla');
            $imc = Request::post('imc');
            $estado_nutricional = Request::post('estado_nutricional');
            $etnia = Request::post('etnia');
            $paridad = Request::post('paridad');
            $lugar = Request::post('lugar');
            $pesofetal = Request::post('pesofetal');
            $tallafetal = Request::post('tallafetal');
            $craneofetal = Request::post('craneofetal');
            $apgar_uno = Request::post('apgar_uno');
            $apgar_cinco = Request::post('apgar_cinco');
            $sexo = Request::post('sexo');
            $meconio = Request::post('meconio');
            $ipn = Request::post('ipn');
            $peso_eg = Request::post('peso_eg');
            $peso_eg_estado = Request::post('peso_eg_estado');
            $ipn_eg = Request::post('ipn_eg');
            $ipn_eg_estado = Request::post('ipn_eg_estado');
            $comentarios = Request::post('comentarios');
            
            $rnsintomatico = Request::post('rnsintomatico');
            $rn = Request::post('rn');
            $factores = Request::post('factores');

            $edad_materna = Request::post('edad_materna');
            $pesoegcorregido = Request::post('pesoegcorregido');
            $pesoegcorregidoestado = Request::post('pesoegcorregidoestado');

            $this->View->renderJSON(ApiModel::createPartos($token, $solicitud_id, $fecha_parto, $semanas, $dias, $peso, $talla, $imc, $estado_nutricional, $etnia, $paridad, $lugar, $pesofetal, $tallafetal, $craneofetal, $apgar_uno, $apgar_cinco, $sexo, $meconio, $ipn, $peso_eg, $peso_eg_estado, $ipn_eg, $ipn_eg_estado, $comentarios, $rnsintomatico, $rn,$factores, $edad_materna,$pesoegcorregido,$pesoegcorregidoestado));
        }
    }

    public function actualizarPartos($token){
        if ($token) {
            $parto_id = Request::post('parto_id');
            $peso = Request::post('peso');
            $talla = Request::post('talla');
            $imc = Request::post('imc');
            $estado_nutricional = Request::post('estado_nutricional');
            $etnia = Request::post('etnia');
            $paridad = Request::post('paridad');
            $lugar = Request::post('lugar');
            $pesofetal = Request::post('pesofetal');
            $tallafetal = Request::post('tallafetal');
            $craneofetal = Request::post('craneofetal');
            $apgar_uno = Request::post('apgar_uno');
            $apgar_cinco = Request::post('apgar_cinco');
            $sexo = Request::post('sexo');
            $meconio = Request::post('meconio');
            $ipn = Request::post('ipn');
            $peso_eg = Request::post('peso_eg');
            $peso_eg_estado = Request::post('peso_eg_estado');
            $ipn_eg = Request::post('ipn_eg');
            $ipn_eg_estado = Request::post('ipn_eg_estado');
            $comentarios = Request::post('comentarios');
            $rnsintomatico = Request::post('rnsintomatico');
            $rn = Request::post('rn');
            $factores = Request::post('factores');
            $edad_materna = Request::post('edad_materna');
            $pesoegcorregido = Request::post('pesoegcorregido');
            $pesoegcorregidoestado = Request::post('pesoegcorregidoestado');

            $this->View->renderJSON(ApiModel::updatePartos($token, $parto_id, $peso, $talla, $imc, $estado_nutricional, $etnia, $paridad, $lugar, $pesofetal, $tallafetal, $craneofetal, $apgar_uno, $apgar_cinco, $sexo, $meconio, $ipn, $peso_eg, $peso_eg_estado, $ipn_eg, $ipn_eg_estado, $comentarios, $rnsintomatico, $rn, $factores, $edad_materna,$pesoegcorregido,$pesoegcorregidoestado));
        }
    }

    public function actualizarPartoFactores($token){
        if ($token) {
            $parto_id = Request::post('parto_id');
            $factores = Request::post('factores');
            $rnsintomatico = Request::post('rnsintomatico');
            $factoresjson = Request::post('factoresjson');
            $rn = Request::post('rn');
            $otras = Request::post('otras');
            
            $this->View->renderJSON(ApiModel::updateFactores($token, $parto_id, $factores, $rnsintomatico, $factoresjson,$rn,$otras));
        }
    }

    public function hipoglicemia($token, $parto_id){
        if ($token) {
            $this->View->renderJSON(ApiModel::getHipoglicemia($token, $parto_id));
        }
    }

    public function nuevoHipoglicemia($token){
        if ($token) {
            $parto_id = Request::post('parto_id');
            $hora = Request::post('hora');
            $dextro = Request::post('dextro');
            $conducta = Request::post('conducta');

            $this->View->renderJSON(ApiModel::createHipoglicemia($token, $parto_id, $hora, $dextro, $conducta));
        }
    }

    public function eliminarHipoglicemia($token, $hipoglicemia){
        if ($token) {
            $this->View->renderJSON(ApiModel::deleteHipoglicemia($token, $hipoglicemia));
        }
    }

    public function configuraciones(){
        $data = array();
        $data[0] = ConfiguracionModel::getAllNacionalidades();
        $data[1] = ConfiguracionModel::getAllCiudades();
        $data[2] = ConfiguracionModel::getAllLugares();
        $data[3] = ConfiguracionModel::getAllPatologias();

        $this->View->renderJSON($data);
    }

    public function reservas($fecha = NULL){
        $this->View->renderJSON(ReservasModel::getAllReservas($fecha ));
    }

    public function newReserva(){
        $data = new stdClass();
        $data->rut = Request::post('rut');
        $data->nombre = Request::post('nombre');
        $data->apellido = Request::post('apellido');
        $data->dia = Request::post('dia');
        $data->hora = Request::post('hora');
        $data->minutos = Request::post('minutos');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ReservasModel::createReserva($data);
        $response->modal = $data->modal;
        $response->data = ReservasModel::getAllReservas(NULL);
        $this->View->renderJSON($response);
    }

    public function newNacionalidad(){
        $data = new stdClass();
        $data->nacionalidad = Request::post('nacionalidad');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::createNacionalidad($data);
        $response->data = ConfiguracionModel::getAllNacionalidades();
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function newCiudad(){
        $data = new stdClass();
        $data->ciudad = Request::post('ciudad');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::createCiudad($data);
        $response->data = ConfiguracionModel::getAllCiudades();
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function newLugar(){
        $data = new stdClass();
        $data->lugar = Request::post('lugar');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::createLugar($data);
        $response->data = ConfiguracionModel::getAllLugares();
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function newPatologia(){
        $data = new stdClass();
        $data->patologia = Request::post('patologia');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::createPatologia($data);
        $response->data = ConfiguracionModel::getAllPatologias();
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function deleteNacionalidad(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::deleteNacionalidad($data);
        $response->data = ConfiguracionModel::getAllNacionalidades();
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }

    public function deleteCiudad(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::deleteCiudad($data);
        $response->data = ConfiguracionModel::getAllCiudades();
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }

    public function deleteLugar(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::deleteLugar($data);
        $response->data = ConfiguracionModel::getAllLugares();
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }

    public function deletePatologia(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = ConfiguracionModel::deletePatologia($data);
        $response->data = ConfiguracionModel::getAllPatologias();
        $response->modal = $data->modal;

        $this->View->renderJSON($response);
    }

}