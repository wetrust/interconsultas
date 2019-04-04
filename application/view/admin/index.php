<div class="container">
    <h1>Administrador maestro</h1>
    <!-- echo out the system feedback (error and success messages) -->
    <?php $this->renderFeedbackMessages(); ?>
    <h3>Qué hay aquí ?</h3>
    <div class="alert alert-info" role="alert">
        Este es el administrador maestro, permite ver los contrareferentes autorizados para recibir interconsultas.
    </div>
    <table class="table table-bordered">
        <thead class="thead-dark">
            <tr>
                <th>Email</th>
                <th>Autorizado</th>
                <th>Guardar</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($this->users as $user) { ?>
            <tr>
                <td><?= $user->user_email; ?></td>
                <td><?= ($user->user_active == 0 ? 'No' : 'Si'); ?></td>
                <form action="<?= config::get("URL"); ?>admin/actionAccountSettings" method="post">
                <td>
                <?php
                    $interests = array(0 => 'Si',  1 => 'No');
                ?>
                    <select name="softDelete">
                <?php
                    foreach($interests as $k => $v) {
                ?>
                    <option value="<?php echo $k; ?>" <?php if($k == $user->user_deleted) ?> selected="selected" <?php } ?>><?php echo $v;?></option>
                <?php
                    }
                ?>
                    </select>
                    </td>
                    <td>
                        <input type="hidden" name="user_id" value="<?= $user->user_id; ?>" />
                        <button type="submit" class="btn btn-primary">Guardar</button>
                    </td>
                </form>
            </tr>
        <?php } ?>
        </tbody>
    </table>
</div>