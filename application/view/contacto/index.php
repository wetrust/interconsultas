<div class="container">
    <div class="card mt-2">
        <div class="card-body">
            <h5>Formulario de contacto</h5>
            <p>Use este formulario para solicitar una suscripción para este sistema o para contactarnos</p>
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
                <p>Para acceder a esta plataforma y guardar datos de exámenes ecográficos, es necesario contratar un servidor Cloud, ejemplo: "Google Cloud Platform",  "Amazon AWZ"</p>
                <button type="submit" class="btn btn-primary">Enviar mensajes</button>
            </form>
        </div>
    </div>
</div>