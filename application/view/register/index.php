<div class="container">
    <div class="d-flex p-2 justify-content-center">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Registrar una nueva cuenta de usuario</h5>
                <?php $this->renderFeedbackMessages(); ?>
                <form action="<?php echo Config::get('URL'); ?>register/register_action" method="post">
                    <div class="form-group">
                        <label>Nombre</label>
                        <input class="form-control" type="text" name="user_name" pattern="[a-zA-Z0-9 ]{2,64}" required />
                    </div>
                    <div class="form-group">
                        <label>Correo electrónico (un correo real)</label>
                        <input class="form-control" type="text" name="user_email" required />
                    </div>
                    <div class="form-group">
                        <label>Contraseña (6 o más carácteres)</label>
                        <input class="form-control" type="password" name="user_password_new" pattern=".{6,}" required />
                    </div>
                    <img class="img-fluid img-thumbnail" id="captcha" src="<?php echo Config::get('URL'); ?>register/showCaptcha" />
                    <div class="form-group">
                        <label>Escriba la captcha</label>
                        <input class="form-control" type="text" name="captcha" required />
                        <a href="#" onclick="document.getElementById('captcha').src = '<?php echo Config::get('URL'); ?>register/showCaptcha?' + Math.random(); return false">Reload Captcha</a>
                    </div>
                    <input type="submit" class="btn btn-primary my-2" value="Registrar"/>
                </form>
            </div>
        </div>
    </div>
</div>
