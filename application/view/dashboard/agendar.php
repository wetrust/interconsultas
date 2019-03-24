<div class="container">
    <h1 class="text-center">Agendar solicitud</h1>
    <?php $this->renderFeedbackMessages(); ?>
    <div class="card mt-1">
        <div class="card-body">
            <h4>Datos de la interconsulta</h4>
            <?php if ($this->solicitud) { ?>
            <form method="post" action="<?php echo Config::get('URL'); ?>note/editSave">
                <!-- we use htmlentities() here to prevent user input with " etc. break the HTML -->
                <input type="hidden" name="solicitud_id" value="<?php echo htmlentities($this->solicitud->solicitud_id); ?>" />
                <div class="row">
                    <div class="col form-group">
                        <label>Nombre del paciente:</label>
                        <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_nombre); ?>">
                    </div>
                    <div class="col form-group">
                        <label>RUT del paciente:</label>
                        <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_rut); ?>">
                    </div>
                    <div class="col form-group">
                        <label>Fecha de solicitud:</label>
                        <input type="date" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_fecha); ?>">
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label>Ege conocida precozmente</label>
                    </div>
                    <div class="col form-group">
                        <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_eg); ?>">
                    </div>
                    <div class="col form-group">
                        <label>Ecografía previa de crecimiento</label>
                    </div>
                    <div class="col form-group">
                        <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_eco); ?>">
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label>FUM operacional</label>
                        <input type="date" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_fum); ?>">
                    </div>
                    <div class="col form-group">
                        <label>Edad Gestacional</label>
                        <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_egestacional); ?>">
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label>Diagnóstico de referencia</label>
                        <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_diagnostico); ?>">
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label>Ciudad procedencia de la paciente</label>
                        <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_ciudad); ?>">
                    </div>
                    <div class="col form-group">
                        <label>Lugar de control prenatal</label>
                        <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_lugar); ?>">
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <h5><span class="badge badge-default p-2" for="interconsulta.profesional">Datos del profesional referente</span></h5>
                    </div>
                    <div class="col form-group">
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="interconsulta.profesional.medico" value="Médico" name="interconsulta_profesional" class="form-check-input">
                            <label class="custom-control-label" for="interconsulta.profesional.medico">Médico</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="interconsulta.profesional.matrona" value="Matrona" name="interconsulta_profesional" class="form-check-input">
                            <label class="custom-control-label" for="interconsulta.profesional.matrona">Matrón/Matrona</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label>Nombre:</label>
                        <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_nombreprofesional); ?>">
                    </div>
                    <div class="col form-group">
                        <label>Email (de trabajo):</label>
                        <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_email); ?>">
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label for="interconsulta.para" class="my-3"><strong>Ecografista de contrarreferencia</strong></label>
                    </div>
                    <div class="col form-group">
                        <label>Email (contrareferencia)</label>
                        <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_profesionalemail); ?>">
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label for="interconsulta.para" class="my-3">¿Interconsulta aceptada?</label>
                    </div>
                    <div class="col form-group">
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="interconsulta.profesional.medico" value="1" name="interconsulta_aceptada" class="form-check-input">
                            <label class="custom-control-label" for="interconsulta.profesional.medico">Si</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="interconsulta.profesional.matrona" value="0" name="interconsulta_aceptada" class="form-check-input">
                            <label class="custom-control-label" for="interconsulta.profesional.matrona">No</label>
                        </div>
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.para" class="my-3">¿Eco de crecimiento?</label>
                    </div>
                    <div class="col form-group">
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="interconsulta.profesional.medico" value="1" name="interconsulta_crecimiento" class="form-check-input">
                            <label class="custom-control-label" for="interconsulta.profesional.medico">Si</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="interconsulta.profesional.matrona" value="0" name="interconsulta_crecimiento" class="form-check-input">
                            <label class="custom-control-label" for="interconsulta.profesional.matrona">No</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label for="interconsulta.para" class="my-3">Comentario</label>
                        <input type="text" class="form-control" name="comentario">
                    </div>

                </div>
                <button type="submit" class="btn btn-primary">Change</button>
            </form>
            <?php } else { ?>
            <div class="alert alert-danger" role="alert">Esta interconsulta no existe.</div>
            <?php } ?>
        </div>
    </div>
</div>