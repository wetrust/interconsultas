<div class="container">
    <div class="row">
        <div class="col">
            <p class="mt-0 mb-2 text-center"><small><em>Software obstétrico propiedad intelectual Dr. Rudecindo Lagos,  Maternidad Hospital Regional de Temuco, Facultad de Medicina Universidad de La Frontera Temuco - Chile <img src="https://servidor.crecimientofetal.cl/img/chile.jpg" alt="Chile"></em></small></p>
        </div>
    </div>
    <div class="row">
        <div class="card col-12 col-sm-4 mt-2">
            <div class="card-body">
                <?php if (Session::userIsLoggedIn()) { ?>
                    <h5>Ingresar a plataforma</h5>
                    <style>
                        .btn-outline-dark {background-color: #ebefff;}
                    </style>
                    <?php if (Session::get("user_account_type") == 5) { ?>
                        <div role="group">
                            <a class="btn btn-outline-dark rounded text-left w-100 my-1" href="pacientes"><small>Pacientes</small></a>
                            <a class="btn btn-outline-dark rounded text-left w-100 my-1" href="dashboard/prenatal"><small>Prenatal (exámenes ecográficos)</small></a>
                            <a class="btn btn-outline-dark rounded text-left w-100 my-1" href="parto"><small>Parto</small></a>
                            <a class="btn btn-outline-dark rounded text-left w-100 my-1" href="AcercaDe"><small>Acerca de la plataforma y autor</small></a>
                        </div>
                    <?php } else if (Session::get("user_account_type") == 4) { ?>
                    <div role="group">
                        <a class="btn btn-outline-dark rounded text-left w-100 my-1" href="pacientes"><small>Pacientes</small></a>
                        <a class="btn btn-outline-dark rounded text-left w-100 my-1" id="menu.activo.cinco" href="#"><small>Ver guías clínicas relacionadas</small></a>
                        <a class="btn btn-outline-primary rounded text-left w-100 my-1 ml-3 d-none" id="menu.activo.cinco.tres" href="https://www.isuog.org/clinical-resources/isuog-guidelines/translations/spanish.html"><small>&gt; Guías clínicas ISUOG, en español</small></a>
                        <a class="btn btn-outline-primary rounded text-left w-100 my-1 ml-3 d-none" id="menu.activo.cinco.uno" href="https://medicinafetalbarcelona.org/protocolos"><small>&gt; Guías clínicas Medicina Fetal - Barcelona</small></a>
                        <a class="btn btn-outline-primary rounded text-left w-100 my-1 ml-3 d-none" id="menu.activo.cinco.dos" href="dashboard/referencias"><small>&gt; Referencias seleccionadas</small></a>
                        <a class="btn btn-outline-dark rounded text-left w-100 my-1" href="AcercaDe"><small>Acerca de la plataforma y autor</small></a>
                    </div>
                    <?php } else { ?>
                    <div role="group">
                        <a class="btn btn-outline-dark rounded text-left w-100 my-1" href="dashboard/sistema#configuracion"><small>Configuración de plataforma</small></a>
                        <a class="btn btn-outline-dark rounded text-left w-100 my-1" href="pacientes"><small>Pacientes</small></a>
                        <a class="btn btn-outline-dark rounded text-left w-100 my-1" href="dashboard/sistema#interconsulta"><small>Prenatal (exámenes ecográficos)</small></a>
                        <a class="btn btn-outline-dark rounded text-left w-100 my-1" href="parto"><small>Postnatal (parto y RN)</small></a>
                        <a class="btn btn-outline-dark rounded text-left w-100 my-1" id="menu.activo.cinco" href="#"><small>Ver guías clínicas relacionadas</small></a>
                        <a class="btn btn-outline-primary rounded text-left w-100 my-1 ml-3 d-none" id="menu.activo.cinco.tres" href="https://www.isuog.org/clinical-resources/isuog-guidelines/translations/spanish.html"><small>&gt; Guías clínicas ISUOG, en español</small></a>
                        <a class="btn btn-outline-primary rounded text-left w-100 my-1 ml-3 d-none" id="menu.activo.cinco.uno" href="https://medicinafetalbarcelona.org/protocolos"><small>&gt; Guías clínicas Medicina Fetal - Barcelona</small></a>
                        <a class="btn btn-outline-primary rounded text-left w-100 my-1 ml-3 d-none" id="menu.activo.cinco.dos" href="dashboard/referencias"><small>&gt; Referencias seleccionadas</small></a>
                        <a class="btn btn-outline-dark rounded text-left w-100 my-1" href="AcercaDe"><small>Acerca de la plataforma y autor</small></a>
                    </div>
                    <?php } ?>
                    <script>
                        $(document).ready(function(){
                            $("#menu\\.activo\\.cinco").on("click", function(){
                                var botones = ["menu.activo.cinco.uno", "menu.activo.cinco.dos","menu.activo.cinco.tres"];
                                if (document.getElementById(botones[0]).classList.contains("d-none")){
                                    botones.forEach(function myFunction(value, index, array) {
                                        document.getElementById(value).classList.remove("d-none");
                                    });
                                }else{
                                    botones.forEach(function myFunction(value, index, array) {
                                        document.getElementById(value).classList.add("d-none");
                                    });
                                }
                            });
                        });
                    </script>
                <?php } else { ?>
                <h5 class="card-title text-center">INGRESAR A PLATAFORMA</h5>
                <?php $this->renderFeedbackMessages(); ?>
                <form action="<?php echo Config::get('URL'); ?>login/login" method="post">
                    <div class="form-group">
                        <label>Correo</label>
                        <input class="form-control" type="text" name="user_name" required />
                    </div>
                    <div class="form-group">
                        <label>Contraseña</label>
                        <input class="form-control" type="password" name="user_password" required />
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="set_remember_me_cookie"  />
                        <label class="form-check-label">
                            recordarme
                        </label>
                    </div>
                    <!-- when a user navigates to a page that's only accessible for logged a logged-in user, then
                         the user is sent to this page here, also having the page he/she came from in the URL parameter
                         (have a look). This "where did you came from" value is put into this form to sent the user back
                         there after being logged in successfully.
                         Simple but powerful feature, big thanks to @tysonlist. -->
                    <?php if (!empty($this->redirect)) { ?>
                        <input type="hidden" name="redirect" value="<?php echo $this->encodeHTML($this->redirect); ?>" />
                    <?php } ?>
					<!--
						set CSRF token in login form, although sending fake login requests mightn't be interesting gap here.
						If you want to get deeper, check these answers:
							1. natevw's http://stackoverflow.com/questions/6412813/do-login-forms-need-tokens-against-csrf-attacks?rq=1
							2. http://stackoverflow.com/questions/15602473/is-csrf-protection-necessary-on-a-sign-up-form?lq=1
							3. http://stackoverflow.com/questions/13667437/how-to-add-csrf-token-to-login-form?lq=1
					-->
					<input type="hidden" name="csrf_token" value="<?= Csrf::makeToken(); ?>" />
                    <input type="submit" class="btn btn-primary my-2" value="Ingresar"/>
                </form>
                <a class="card-link" href="<?php echo Config::get('URL'); ?>login/requestPasswordReset">¿Olvido su contraseña?</a> <a class="card-link" href="<?php echo Config::get('URL'); ?>register/index">Registrar</a>
                <p class="mt-2">Si ud. no es usuario registrado en la plataforma, puede temporalmente usar contraseña de usuario invitado</p>
                <ul><li>Correo: prueba@prueba.cl</li><li>Contraseña: 123abc</li></ul>
                <?php } ?>
            </div>
        </div>
        <div class="col-8 mt-2 d-none d-sm-block">
            <div class="mx-3 px-5">
            <h5 class="text-center">SISTEMA DE REFERENCIA Y CONTRARREFERENCIA PARA SOLICITUD DE ECOGRAFIA OBSTETRICA</h5>
            <ul class="mt-3">
                <li class="text-justify">Sitio web diseñado para profesionales de la salud vinculados con la <strong>vigilancia del control prenatal</strong>. Especialmente para quienes se desempeñan en los niveles básico y medio de atención en salud materna.</li>
            </ul>
            <img class="mx-auto d-block" src="imagenes/ecografo.png" alt="Ecógrafo">
            <ul>
            <li class="text-justify">El objetivo principal de esta herramienta informática es favorecer la <strong>Referencia y Contraferencia</strong> para exámenes ecográficos obstétrico, entre profesionales de distintos niveles de atención en salud materna.</li>
            </ul>
            <div class="row px-4">
                <div class="col-6"><small><a href="contacto">Solicitud de suscripción al sistema</a></small></div>
                <div class="col-6"><small><a href="consentimiento">Consentimiento informado</a></small></div>
            </div>
        </div>
    </div>
</div>
<script>
<?php if (Session::userIsLoggedIn()) { ?>
    localStorage.setItem('login', '<?php echo session_id();?>');
<?php } ?>
</script>