<div class="container">
    <h1>Administrador maestro</h1>
    <!-- echo out the system feedback (error and success messages) -->
    <!-- almacenamiento: NO: mail matrona-medico; SI: mail matrona -->
    <?php $this->renderFeedbackMessages(); ?>
    <h3>Qué hay aquí ?</h3>
    <div class="alert alert-info" role="alert">
        Este es el administrador maestro, permite ver los contrareferentes autorizados para recibir interconsultas.
    </div>
    <table class="table table-bordered">
        <thead class="thead-dark">
            <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Tipo de usuario</th>
                <th>Guardar</th>
                <th>Eliminar</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($this->users as $user) { ?>
            <tr>
                <td><?= $user->user_name; ?></td>
                <td><?= $user->user_email; ?></td>
                <form action="<?= config::get("URL"); ?>admin/actionAccountSettings" method="post">
                <td>
                <?php
                    $interests = array(0 => 'Si',  1 => 'No');
                ?>
                    <select name="softDelete">
                <?php
                    foreach($interests as $k => $v) {
                ?>
                    <option value="<?php echo $k; ?>" <?php if($k == $user->user_deleted){ ?> selected <?php } ?>><?php echo $v;?></option>
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
                <td>
                    <a href="admin/delete/<?= $user->user_id; ?>" class="btn btn-danger">Eliminar</button>
                </td>
            </tr>
        <?php } ?>
        </tbody>
    </table>
</div>