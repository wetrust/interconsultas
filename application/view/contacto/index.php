<div class="container">
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
                <input type="text" class="form-control" name="nombre_text" autocomplete="off">
            </div>
        </div>
        <div class="form-group">
            <label>Correo electronico:</label>
            <input type="email" class="form-control" name="email_text" autocomplete="off">
        </div>
        <div class="form-group">
            <label>Mensaje:</label>
            <textarea class="form-control" name="mensaje_text" autocomplete="off"></textarea>
        </div>
        <input type="hidden" name="csrf_token" value="<?= Csrf::makeToken(); ?>" />
        <button type="submit" class="btn btn-primary">Enviar mensajes</button>
        <p>Al adquirir este servicio y guardar su información, es necesario contratar un servidor Cloud ejemplo: "Google Cloud Platform",  "Amazon AWZ"</p>
    </form>
</div>