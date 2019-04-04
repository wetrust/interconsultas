<div class="container">
    <h1>Eliminar usuario</h1>
    <p>¿Está seguro de eliminar el usuario?</p>
    <form action="<?= config::get("URL"); ?>admin/delete_action" method="post">
        <input type="hidden" name="user_id" value="<?= $this->user_id; ?>" />
        <button type="submit" class="btn btn-danger">Si</button>
    </form>
</div>