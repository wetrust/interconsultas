<div class="container">
    <h1>Cambiar contraseña de usuario</h1>
    <!-- echo out the system feedback (error and success messages) -->
    <?php $this->renderFeedbackMessages(); ?>
    <!-- new password form box -->
    <form method="post" action="<?php echo Config::get('URL'); ?>user/changePassword_action" name="new_password_form">
        <div class="form-group">
            <label>Escriba su contraseña actual:</label>
            <input type="password" class="form-control" name='user_password_current' pattern=".{6,}" required autocomplete="off">
        </div>
        <div class="form-group">
            <label>Escriba la nueva contraseña:</label>
            <input type="password" class="form-control" name='user_password_new' pattern=".{6,}" required autocomplete="off">
        </div>
        <div class="form-group">
            <label>Repita la nueva contraseña:</label>
            <input type="password" class="form-control" name='user_password_repeat' pattern=".{6,}" required autocomplete="off">
        </div>
        <button type="submit" name="submit_new_password" class="btn btn-primary">Cambiar contraseña</button>
    </form>
</div>