<div class="container">
    <div class="d-flex justify-content-between align-items-center rounded px-3 py-1 shadow-sm" style="background-color: #e9ecef">
        <h5 class="text-primary mb-0"><em>Pacientes</em></h5>
        <a href="<?php echo Config::get('URL'); ?>"><strong>Volver</strong></a>
    </div>
    <div class="card shadow mt-3"><div class="card-body" id="pacientes"></div></div>
</div>
<script src="js/jquery.rut.chileno.min.js"></script>
<script type="module" src="js/pacientes/app.js"></script>