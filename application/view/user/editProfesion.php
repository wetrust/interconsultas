<div class="container">
    <ol class="breadcrumb">
        <li class="ml-auto"><a href="<?php echo Config::get('URL'); ?>"><strong>Volver</strong></a></li>
    </ol>
    <h1>Modificar profesion</h1>
    <?php $this->renderFeedbackMessages(); ?>
    <div class="card mt-1">
        <div class="card-body">
            <form method="post" action="<?php echo Config::get('URL'); ?>user/editProfesion_action">
                <div class="form-group">
                    <label>Seleccione su profesion</label>
                    <?php $interests = array('Matrona' => 'Matrona',  'Médico' => 'Médico',  'Otros' => 'Otros');?>
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