<div class="container">
    <h1>Modificar profesion</h1>
    <?php $this->renderFeedbackMessages(); ?>
    <div class="card mt-1">
        <div class="card-body">
            <form method="post" action="<?php echo Config::get('URL'); ?>user/editProfesion_action">
                <input type="hidden" name="user_id" value="<?php echo Session::get('user_id'); ?>" />
                <div class="form-group">
                    <label>Seleccione su profesion</label>
                    <?php $interests = array(1 => 'Matrona',  2 => 'Médico');?>
                    <select name="user_profesion" class="form-control">
                        <?php foreach($interests as $k => $v) { ?>
                            <option value="<?php echo $k; ?>" <?php if($k == $this->user->user_profesion){ ?> selected <?php } ?>><?php echo $v;?></option>
                        <?php } ?>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Modificar</button>
            </form>
        </div>
    </div>
</div>