<style> 
    .btn-animado { background-color: red; animation: example 5s infinite; color:#000;}
    @keyframes example {
    0% { background-color: #BDCE30; }
    11% { background-color: #6ABB81; }
    23% { background-color: #00B29A; }
    33% { background-color: #0099AE; }
    45% { background-color: #4F72B8; }
    54% { background-color: #A065AA; }
    66% { background-color: #EE4D7A; }
    77% { background-color: #EF4C45; }
    89% { background-color: #F4792B; color:#FFF;}
    100% { background-color: #FAA634; color:#FFF;}}
    .btn-secondary:not(:disabled):not(.disabled).active, .btn-secondary:not(:disabled):not(.disabled):active, .show > .btn-secondary.dropdown-toggle{
        background-color: var(--gray-dark) !important; border-color: var(--gray-dark) !important;}
    .modal-dialog.modal-lgx{ max-width:8000px !important;}
    a{ color:#FFF;}
    .headTop{
        color:#b3b5b7; 
    }
    .headTop:hover{
        color:#b3b5b7; 
        text-decoration:none;
    }
</style>
<nav class="bg-secondary">
    <div class="px-5">
        <div class="row">
            <div class="col-8">
                <a class="navbar-brand" href="#">Administración de interconsultas</a>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item"><a class="nav-link active" id="interconsulta-tab" data-toggle="tab" href="#interconsulta" role="tab" aria-controls="interconsulta" aria-selected="true"><small>Módulo prenatal, exámenes ecográficos</small></a></li>
                    <li class="nav-item"><a class="nav-link" id="parto-tab" data-toggle="tab" href="#parto" role="tab" aria-controls="parto" aria-selected="false"><small>Módulo postnatal, parto y RN</small></a></li>
                    <li class="nav-item d-none"><a class="nav-link" id="directorio-tab" data-toggle="tab" href="#directorio" role="tab" aria-controls="directorio" aria-selected="false"><small>Lista de destinatario</small></a></li>
                    <li class="nav-item d-none"><a class="nav-link" id="configuracion-tab" data-toggle="tab" href="#configuracion" role="tab" aria-controls="configuracion" aria-selected="false"><small>Configuración</small></a></li>
                </ul>
            </div>
            <div class="col">
                <div class="dropdown float-right">
                    <a class="text-decoration-none dropdown-toggle headTop" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <?php $interests = array(1 => 'Usuario invitado',  2 => 'Referente', 3 => 'Contrarreferente', 4 => 'Autorreferido'); ?>
                        Nombre de usuario: <span id="user_name"><?php echo Session::get('user_name'); ?></span><br>Correo: <span id="user_email"><?php echo Session::get('user_email'); ?></span><br>Tipo de usuario: <?php echo $interests[Session::get('user_account_type')]; ?>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="user/editUsername">Modificar nombre</a>
                        <?php if (Session::get('user_account_type') > 3){ ?>
                        <a class="dropdown-item" href="user/changePassword">Modificar contraseña</a>
                        <a class="dropdown-item" href="user/editUserEmail">Cambiar correo</a>
                        <a class="dropdown-item" href="user/editProfesion">Profesion del usuario</a>
                        <?php } ?>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="login/logout">Cerrar sesion</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>
<div class="container">
    <?php $this->renderFeedbackMessages(); ?>
    <div class="tab-content" id="myPrincipaTab">
        <div class="tab-pane fade show active" id="interconsulta" role="tabpanel" aria-labelledby="interconsulta-tab">
            <div class="card my-2 shadow">
                <div class="card-body d-flex flex-row">
                    <div class="w-100 d-flex flex-row">
                        <div class="btn-group-toggle" data-toggle="buttons">
                            <label id="interconsultas.estado.solicitar" class="btn interconsulta btn-secondary active">
                                <input type="radio" value="0" name="interconsultas" checked autocomplete="off">Solicitud de exámen ecográfico
                            </label>
                            <label id="interconsultas.estado.solicitadas" class="btn interconsulta btn-secondary">
                                <input type="radio" value="1" name="interconsultas" autocomplete="off"> Solicitudes en espera
                            </label>
                            <label id="interconsultas.estado.nuevas" class="btn interconsulta btn-secondary">
                                <input type="radio" value="2" name="interconsultas" autocomplete="off"> Nuevas solicitudes ecográficas
                            </label>
                            <label id="interconsultas.estado.agendadas" class="btn interconsulta btn-secondary">
                                <input type="radio" value="3" name="interconsultas" autocomplete="off"> Solicitudes agendadas
                            </label>
                            <label id="interconsultas.estado.espera" class="btn interconsulta btn-secondary">
                                <input type="radio" value="4" name="interconsultas" autocomplete="off"> Solicitudes ecográficas en espera
                            </label>
                            <label id="interconsultas.estado.finalizadas" class="btn interconsulta btn-secondary">
                                <input type="radio" value="5" name="interconsultas" autocomplete="off"> Ecografías realizadas
                            </label>
                            <label id="interconsultas.estado.respuesta" class="btn interconsulta btn-secondary">
                                <input type="radio" value="6" name="interconsultas" autocomplete="off"> Ecografías realizadas
                            </label>
                        </div>
                    </div>
                    <button type="button" class="btn btn-animado" id="filtro.activar">Ver Filtros</button>
                </div>
            </div>
            <div class="card my-2 shadow d-none" id="filtro.contenedor">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <label>Ciudad</label>
                            <select class="form-control" id="filtro.ciudad"></select></div>
                        <div class="col">
                            <label>Lugar de control</label>
                            <select class="form-control" id="filtro.lugar"></select></div>
                        <div class="col">
                            <label>Fecha desde</label>
                            <input type="date" id="filtro.fecha" class="form-control" placeholder="Fecha"></div>
                        <div class="col">
                            <label>Fecha hasta</label>
                            <input type="date" id="filtro.fecha.hasta" class="form-control" placeholder="Fecha"></div>
                        <div class="col">
                            <label>Tipo de exámen</label>
                            <select class="form-control" id="filtro.tipo">
                                <option value="8">No Seleccionado</option>
                                <option value="1">1.- Ecografía precoz de urgencia</option>
                                <option value="4">2.- Ecografía 11-14 semanas</option>
                                <option value="2">3.- Eco 2do / 3cer trimestre</option>
                                <option value="0">4.- Doppler + Eco. crecimiento</option>
                                <option value="3">5.- Eco Ginecológica</option>
                            </select></div>
                        <div class="col">
                            <label>Filtro</label>
                            <div class="btn-group" role="group">
                                <button id="filtro.accion" class="btn btn-primary">Aplicar</button>
                                <button id="filtro.borrar" class="btn btn-danger">Borrar</button>
                            </div></div>
                    </div>
                </div>
            </div>
            <div class="card my-2 shadow">
                <div class="card-header bg-secondary d-none" id="card.header"><h4 class="text-white text-center">Formulario de referencia para evaluación ecográfica gineco - Obstétrica</h4></div>
                <div class="card-body">
                    <div id="formulario.solicitud" class="d-none"> <div class="row"> <div class="col form-group"> <label>Nombre del paciente</label> <input type="text" class="form-control" id="a"> </div><div class="col form-group"> <label>RUT del paciente</label> <input type="text" class="form-control" id="b"> </div><div class="col form-group"> <label>Teléfono materno</label> <input type="number" class="form-control" id="c"> </div></div><div class="row"> <div class="col-4 form-group"> <label>FUM referida o corregida</label> <input type="date" class="form-control bg-secondary text-white" id="d"> </div><div class="col form-group"> <label>Fecha de solicitud del exámen</label> <input type="date" class="form-control bg-secondary text-white" id="e"> </div><div class="col-4 form-group"> <label>Edad Gestacional (Ege)</label> <input type="text" class="form-control bg-secondary text-white" id="f" disabled> </div></div><div class="row"> <div class="col-4 form-group"> <label>Edad materna (años)</label> <select class="form-control" id="g"> <option value="< 10">&lt; 10 años</option> <option value="10">10 años</option> <option value="11">11 años</option> <option value="12">12 años</option> <option value="13">13 años</option> <option value="14">14 años</option> <option value="15">15 años</option> <option value="16">16 años</option> <option value="17">17 años</option> <option value="18">18 años</option> <option value="19">19 años</option> <option value="20">20 años</option> <option value="21">21 años</option> <option value="22">22 años</option> <option value="23">23 años</option> <option value="24">24 años</option> <option value="25" selected>25 años</option> <option value="26">26 años</option> <option value="27">27 años</option> <option value="28">28 años</option> <option value="29">29 años</option> <option value="30">30 años</option> <option value="31">31 años</option> <option value="32">32 años</option> <option value="33">33 años</option> <option value="34">34 años</option> <option value="35">35 años</option> <option value="36">36 años</option> <option value="37">37 años</option> <option value="38">38 años</option> <option value="39">39 años</option> <option value="40">40 años</option> <option value="41">41 años</option> <option value="42">42 años</option> <option value="43">43 años</option> <option value="44">44 años</option> <option value="45">45 años</option> <option value="46">46 años</option> <option value="47">47 años</option> <option value="48">48 años</option> <option value="49">49 años</option> <option value="50">50 años</option> <option value="51">51 años</option> <option value="52">52 años</option> <option value="53">53 años</option> <option value="54">54 años</option> <option value="55">55 años</option> <option value="56">56 años</option> <option value="57">57 años</option> <option value="58">58 años</option> <option value="59">59 años</option> <option value="60">60 años</option> <option value="> 60">&gt; 60 años</option> </select> </div><div class="col form-group"> <label>Ciudad procedencia de la paciente</label> <input type="text" class="form-control" id="h"> </div><div class="col form-group"> <label>Lugar de control prenatal</label> <input type="text" class="form-control" id="i"> </div></div><div class="row"> <div class="col-4 form-group"> <label>Diagnóstico de referencia a exámen ecográfico:</label> </div><div class="col-8 form-group"> <input type="text" class="form-control" id="j"> </div></div><hr> <h5 class="card-title">Datos profesional referente a exámen ecográfico</h5> <div class="row"> <div class="col form-group"> <label>Nombre del profesional</label> <input type="text" class="form-control" id="k" disabled> </div><div class="col form-group"> <label>Email (profesional referente)</label> <input type="email" class="form-control" id="m" disabled> </div></div><div class="row" id="div.a"> <div class="col"> <label><strong>Seleccione profesional de contrareferencia</strong></label> </div><div class="col"> <label>Nombre del profesional</label> </div><div class="col"> <label>Email (profesional de contrareferencia)</label> </div></div><div class="row" id="div.b"> <div class="col form-group"> <select class="form-control" id="n"> </select> </div><div class="col form-group"> <input type="text" class="form-control" id="o" disabled> </div><div class="col form-group"> <input type="email" class="form-control" id="p" disabled> </div></div><button class="btn g-verde text-white" id="q">Enviar solicitud de exámen ecográfico</button></div>
                    <div class="alert alert-primary d-none" role="alert" id="mensaje.resultado">No tienes interconsultas en este ítem</div>
                    <table class="table table-bordered mt-2" id="tabla.resultado">
                        <thead class="thead-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Rut</th>
                                <th>Fecha</th>
                                <th>Diagnóstico</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="parto" role="tabpanel" aria-labelledby="parto-tab">
            <div class="card my-2 shadow">
                <div class="card-body d-flex flex-row">
                    <div class="w-100 d-flex flex-row">
                        <div class="btn-group-toggle" data-toggle="buttons">
                            <label class="btn parto btn-secondary active">
                                <input type="radio" value="0" name="parto" checked autocomplete="off">En espera de parto
                            </label>
                            <label class="btn parto btn-secondary">
                                <input type="radio" value="1" name="parto" autocomplete="off">Partos atendidos
                            </label>
                        </div>
                    </div>
                    <button type="button" class="btn btn-animado d-none" id="filtro.parto.activar">Ver Filtros</button>
                </div>
            </div>
            <div class="card my-2 shadow d-none" id="filtro.parto.contenedor">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <label>Ciudad</label>
                            <select class="form-control" id="filtro.parto.ciudad"></select></div>
                        <div class="col">
                            <label>Lugar de control</label>
                            <select class="form-control" id="filtro.parto.lugar"></select></div>
                        <div class="col">
                            <label>Fecha desde</label>
                            <input type="date" id="filtro.parto.fecha" class="form-control" placeholder="Fecha"></div>
                        <div class="col">
                            <label>Fecha hasta</label>
                            <input type="date" id="filtro.parto.fecha.hasta" class="form-control" placeholder="Fecha"></div>
                        <div class="col">
                            <label>Semanas</label>
                            <select class="form-control" id="filtro.parto.tipo">
                                <option value="" selected>No Seleccionado</option>
                                <option value="43">43</option>
                                <option value="42">42</option>
                                <option value="41">41</option>
                                <option value="40">40</option>
                                <option value="39">39</option>
                                <option value="38">38</option>
                                <option value="37">37</option>
                                <option value="36">36</option>
                                <option value="35">35</option>
                                <option value="34">34</option>
                                <option value="33">33</option>
                                <option value="32">32</option>
                                <option value="31">31</option>
                                <option value="30">30</option>
                                <option value="29">29</option>
                                <option value="28">28</option>
                                <option value="27">27</option>
                                <option value="26">26</option>
                                <option value="25">25</option>
                                <option value="24">24</option>
                                <option value="23">23</option>
                                <option value="22">22</option>
                                <option value="21">21</option>
                                <option value="20">20</option>
                            </select></div>
                        <div class="col">
                            <label>Filtro</label>
                            <div class="btn-group" role="group">
                                <button id="filtro.parto.accion" class="btn btn-primary">Aplicar</button>
                                <button id="filtro.parto.borrar" class="btn btn-danger">Borrar</button>
                            </div></div>
                    </div>
                </div>
            </div>
            <div class="card my-2 shadow">
                <div class="card-body">
                    <div class="alert alert-primary d-none" role="alert" id="mensaje.parto">No tiene pacientes</div>
                    <table class="table table-bordered mt-2" id="tabla.parto">
                    </table>
                </div>
            </div>
        </div>
        <div class="tab-pane fade d-none" id="directorio" role="tabpanel" aria-labelledby="directorio-tab">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between py-sm-3"><h4>Datos relativos a destinatario opcional</h4><button type="button" class="btn btn-primary" id="directorio.nuevo">Generar nuevo destinatario</button></div>
                    <table class="table table-hover">
                        <thead class="table-secondary"><tr><th scope="col">Nombre del destinatario</th><th scope="col">Tipo de destinatario</th><th scope="col">Email destinatario</th><th scope="col">Opciones</th></tr></thead>
                        <tbody id="tabla.directorio.email"></tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="tab-pane fade d-none" id="configuracion" role="tabpanel" aria-labelledby="configuracion-tab">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between py-sm-3"><h4>Membrete</h4><button type="button" class="btn btn-primary" id="membrete.guardar">Guardar Membrete</button></div>
                    <div class="mb-3">
                        <label for="membrete">Membrete</label>
                        <textarea class="form-control" id="membrete" rows="3" required></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="ver.interconsulta" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lgx h-100" role="document">
        <div class="modal-content h-100">
            <div class="modal-header">
                <h5 class="modal-title" id="ver.interconsulta.titulo">Interconsulta</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body" id="ver.interconsulta.contenedor">
            </div>
            <div class="modal-footer" id="ver.interconsulta.footer">
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="expandir.informacion" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lgx" role="document">
        <div class="modal-content">
            <div class="modal-header"><h5 class="modal-title">Solicitudes enviadas por este correo</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>
            <div class="modal-body" id="expandir.informacion.contenedor"></div>
            <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div>
        </div>
    </div>
</div>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Enviar informe y gráfica por email</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item bg-secondary">
                        <a class="nav-link bg-secondary text-white active" id="home-tab" data-toggle="tab" href="#Mhome" role="tab" aria-controls="home" aria-selected="true">Elegir otro correo de destino</a>
                    </li>
                    <li class="nav-item d-none">
                        <a class="nav-link text-dark" id="profile-tab" data-toggle="tab" href="#Mprofile" role="tab" aria-controls="profile" aria-selected="false">Escribir correo</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="Mhome" role="tabpanel" aria-labelledby="home-tab">
                        <div class="form-group">
                            <select class="form-control" id="interfaz.email"></select>
                        </div>
                    </div>
                    <div class="tab-pane fade d-none" id="Mprofile" role="tabpanel" aria-labelledby="profile-tab">
                        <div class="form-group">
                            <label for="interfaz.email.write">Escriba un correo electrónico</label>
                            <input type="email" class="form-control" id="interfaz.email.write">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="interfaz.enviar">Enviar correo</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
<script>
    var a = <?= Session::get('user_account_type'); ?>;
    var _api = "<?php echo Config::get('URL'); ?>dashboard/";
    var _URL = "<?= Config::get('URL') ?>";
</script>
<script src="js/main.js"></script>
<script src="js/textos.js"></script>
<?php if (Session::get("user_account_type") < 3) { ?>
    <script src="js/jquery.rut.chileno.min.js"></script>
    <script src="js/solicitud.js"></script>
    <script src="js/basico.js"></script>
    <script src="js/partos.js"></script>
<?php } else if (Session::get("user_account_type") == 3) { ?>
    <script src="js/principal.js"></script>
    <script src="js/membrete.js"></script>
    <script src="js/partos.js"></script>
<?php } else if (Session::get("user_account_type") == 4) { ?>
    <script src="js/jquery.rut.chileno.min.js"></script>
    <script src="js/solicitud.js"></script>
    <script src="js/autorreferido.js"></script>
    <script src="js/membrete.js"></script>
    <script src="js/partos.js"></script>
<?php } ?>