<div class="container">
    <div class="row">
        <div class="card col-4 mt-2">
            <div class="card-body">
                <h5 class="card-title text-center">INGRESAR</h5>
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
                <a class="card-link" href="<?php echo Config::get('URL'); ?>login/requestPasswordReset">¿Olvidaste tu contraseña?</a> <a class="card-link" href="<?php echo Config::get('URL'); ?>register/index">Registrar</a>
                <p class="mt-2">Si ud. no es usuario registrado en la plataforma, puede temporalmente usar contraseña de usuario invitado</p>
                <ul><li>Correo: prueba@prueba.cl</li><li>Contraseña: 123abc</li></ul>
            </div>
        </div>
        <div class="col-8 mt-2">
            <div class="mx-3 px-5">
            <h3>SISTEMA DE REFERENCIA Y CONTRARREFERENCIA PARA SOLICITUD DE ECOGRAFIA OBSTETRICA</h3>
            <ul class="mt-2">
                <li class="text-justify">El objetivo de esta herramienta informática es favorecer el sistema de referencia y contrareferencia para el exámen ecográfico obstétrico entre los distintos niveles de atención en salud materna.</li>
            </ul>
            <img class="mx-auto d-block" src="imagenes/ecografo.png" alt="Ecógrafo">
            <ul>
                <li class="text-justify">El profesional contrareferente a quien le fue solicitada la interconsulta deberá necesariamente estar previamente registrado en la plataforma.</li>
                <li class="text-justify">Si desea probar la plataforma de interconsultas, puede usar el usuario invitado ( <strong>Usuario:</strong> prueba@prueba.cl; <strong>Contraseña:</strong> 123abc ).</li>
                <li class="text-justify">Si es de su interés adquirir este servicio es necesario contratar un servidor cloud con proveedores como "Google Cloud Computing" o "Amazon AWZ" para asi guardar la información del exámen ecográfico.</li>
            </ul>
            </div>
        </div>
    </div>
</div>
