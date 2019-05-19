<div class="contaier">
    <h5>Formulario de contacto</h5>
    <p>Use este formulario para solicitar una suscripción para este sistema o para contactarnos</p>
    <form method="post" action="<?php echo Config::get('URL');?>contacto/enviar">
        <div class="form-group">
            <label>Su nombre:</label>
            <input type="text" class="form-control" name="note_text" autocomplete="off">
        </div>
        <div class="form-group">
            <label>Su correo electronico:</label>
            <input type="text" class="form-control" name="note_text" autocomplete="off">
        </div>
        <div class="form-group">
            <label>Mensaje:</label>
            <textarea type="text" class="form-control" name="note_text" autocomplete="off"></textarea>
        </div>
        <input type="hidden" name="csrf_token" value="<?= Csrf::makeToken(); ?>" />
        <button type="submit" class="btn btn-primary">Enviar mensajes</button>
    </form>
</div>