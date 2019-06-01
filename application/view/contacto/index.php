<div class="container">
    <ol class="breadcrumb">
        <li class="ml-auto"><a href="<?php echo Config::get('URL'); ?>"><strong>Volver</strong></a></li>
    </ol>
    <div class="card mt-2">
        <div class="card-body">
            <?php $this->renderFeedbackMessages(); ?>
            <h5>Formulario de contacto</h5>
            <p>Use este formulario para solicitar suscripción a la plataforma.</p>
            <form method="post" action="<?php echo Config::get('URL');?>contacto/enviar">
                <div class="row">
                    <div class="form-group col">
                        <label>Nombre:</label>
                        <input type="text" class="form-control" name="nombre_text" autocomplete="off">
                    </div>
                    <div class="form-group col">
                        <label>Dirección postal:</label>
                        <input type="text" class="form-control" name="direccion_text" autocomplete="off">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col">
                        <label>Correo electronico:</label>
                        <input type="email" class="form-control" name="email_text" autocomplete="off">
                    </div>
                    <div class="form-group col">
                        <label>Teléfono:</label>
                        <input type="text" class="form-control" name="telefono_text" autocomplete="off">
                    </div>
                </div>
                <div class="form-group">
                    <label>Mensaje:</label>
                    <textarea class="form-control" name="mensaje_text" autocomplete="off"></textarea>
                </div>
                <input type="hidden" name="csrf_token" value="<?= Csrf::makeToken(); ?>" />
                <p class="d-none">Para acceder a esta plataforma y guardar datos de exámenes ecográficos, es necesario contratar un servidor Cloud, ejemplo: "Google Cloud Platform",  "Amazon AWZ"</p>
                <button type="submit" class="btn btn-primary">Enviar mensajes</button>
                <h4 class="mt-3">La plataforma consta de tres categorías de usuario:</h4>
                <ul>
                <li><strong>* Usuario Invitado:</strong> puede visitar plataforma y enviar solicitud de examen ecográfico a profesional contrarreferente.</li>
                <li><strong>** Usuario Referente:</strong> además de lo anterior,  ver resultado de examen ecográfico solicitado y almacenarlo en su cuenta.</li>
                <li><strong>** Usuario Contrarreferente:</strong> Profesional quien realiza examen ecográfico, almacena en base de datos todos los exámenes referidos a su cuenta.</li>
                </ul>
                <p><small>*  Usuario invitado, vasta solo con registrarse en la plataforma.</small><br><small>** Referente y contrarreferente deben solicitar suscripción.</small></p>
            </form>
        </div>
    </div>
</div>