<div class="container">
    <h1>ProfileController/index</h1>
    <!-- echo out the system feedback (error and success messages) -->
    <?php $this->renderFeedbackMessages(); ?>
    <h3>What happens here ?</h3>
    <p>This controller/action/view shows a list of all users in the system. You could use the underlying code to build things that use profile information of one or multiple/all users.</p>
    <table class="table table-bordered">
        <thead class="thead-dark">
            <tr>
                <th>Id</th>
                <th>Avatar</th>
                <th>Username</th>
                <th>User's email</th>
                <th>Activated ?</th>
                <th>Link to user's profile</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($this->users as $user) { ?>
            <tr>
                <td><?= $user->user_id; ?></td>
                <td class="avatar">
                <?php if (isset($user->user_avatar_link)) { ?>
                    <img src="<?= $user->user_avatar_link; ?>" />
                <?php } ?>
                </td>
                <td><?= $user->user_name; ?></td>
                <td><?= $user->user_email; ?></td>
                <td><?= ($user->user_active == 0 ? 'No' : 'Yes'); ?></td>
                <td>
                    <a href="<?= Config::get('URL') . 'profile/showProfile/' . $user->user_id; ?>">Profile</a>
                </td>
            </tr>
        <?php } ?>
        </tbody>
    </table>
</div>
