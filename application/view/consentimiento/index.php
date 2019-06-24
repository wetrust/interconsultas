<div class="container">
    <ol class="breadcrumb">
        <li class="ml-auto"><a href="<?php echo Config::get('URL'); ?>"><strong>Volver</strong></a></li>
    </ol>
    <div class="card my-2 shadow mt-4">
        <div class="card-body">
            <p><strong><em>Según la legislación vigente, la información recopilada en base de datos es solo con fines de conocer el historial clínico del paciente.</em></strong></p>
            <p class="text-danger"><strong><em>El uso de la información total o parcial, para fines de estudios requiere de autorización escrita por parte del paciente.</em></strong></p>
            <p><strong><em>Para tal efecto se requiere de “consentimiento informado”, siguiendo protocolos estándares de los comité científicos respectivos.</em></strong></p>
            <div class="row mt-5">
                <div class="col-8"><p><strong><em>Protocolo para para estudio de modulo prenatal ultrasonográfico, datos ultrasonográficos.</em></strong></p></div>
                <div class="col-2">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="uno" value="option1">
                        <label class="form-check-label">Si</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="uno" value="option2">
                        <label class="form-check-label">No</label>
                    </div>
                </div>
                <div class="col-2"><a class="btn btn-primary" href="#">Formulario</a></div>
            </div>
            <div class="row mt-2 mb-5">
                <div class="col-8"><p><strong><em>Protocolo para para estudio de modulo postnatal datos clínicos de parto y recién nacido.</em></strong></p></div>
                <div class="col-2">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="dos" value="option1">
                        <label class="form-check-label">Si</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="dos" value="option2">
                        <label class="form-check-label">No</label>
                    </div>
                </div>
                <div class="col-2"><a class="btn btn-primary" href="#">Formulario</a></div>
            </div>
            <div class="form-group">
                <label><strong><em>Comentarios y observaciones</em></strong></label>
                <input type="text" class="form-control">
            </div>
        </div>
    </div>
</div>