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
                <th>Id</th>
                <th>Avatar</th>
                <th>Username</th>
                <th>User's email</th>
                <th>Activated ?</th>
                <th>Link to user's profile</th>
                <th>suspension Time in days</th>
                <th>Soft delete</th>
                <th>Submit</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($this->users as $user) { ?>
            <tr>
                <td><?= $user->user_id; ?></td>
                <td class="avatar">
                <?php if (isset($user->user_avatar_link)) { ?>
                    <img src="<?= $user->user_avatar_link; ?>"/>
                <?php } ?>
                </td>
                <td><?= $user->user_name; ?></td>
                <td><?= $user->user_email; ?></td>
                <td><?= ($user->user_active == 0 ? 'No' : 'Yes'); ?></td>
                <td>
                    <a href="<?= Config::get('URL') . 'profile/showProfile/' . $user->user_id; ?>">Profile</a>
                </td>
                <form action="<?= config::get("URL"); ?>admin/actionAccountSettings" method="post">
                    <td><input class="form-control" type="number" name="suspension" /></td>
                    <td><input type="checkbox" name="softDelete" <?php if ($user->user_deleted) { ?> checked <?php } ?> /></td>
                    <td>
                        <input type="hidden" name="user_id" value="<?= $user->user_id; ?>" />
                        <button type="submit" class="btn btn-primary">Apply</button>
                    </td>
                </form>
            </tr>
        <?php } ?>
        </tbody>
    </table>
</div>