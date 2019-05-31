<div class="container">
    <ol class="breadcrumb">
        <li class="ml-auto"><a href="<?php echo Config::get('URL'); ?>"><strong>Volver</strong></a></li>
    </ol>
    <h1>Cambiar correo electrónico de usuario</h1>
    <!-- echo out the system feedback (error and success messages) -->
    <?php $this->renderFeedbackMessages(); ?>
    <form action="<?php echo Config::get('URL'); ?>user/editUserEmail_action" method="post">
        <div class="form-group">
            <label for="exampleInputEmail1">Escriba el nuevo correo electrónico de usuario:</label>
            <input type="email" class="form-control" name="user_email" aria-describedby="emailHelp" placeholder="Enter email" required>
            <small id="emailHelp" class="form-text text-muted">No compartimos su correo y lo guardamos con total seguridad.</small>
        </div>
        <button type="submit" class="btn btn-primary">Guardar correo</button>
    </form>
</div>
