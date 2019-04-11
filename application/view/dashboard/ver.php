<div class="container">
    <h1 class="text-center my-3">Ver interconsulta</h1>
    <?php $this->renderFeedbackMessages(); ?>
    <?php if ($this->solicitud) { ?>
    <div class="card mt-1">
        <div class="card-body">
            <h4>Datos de la interconsulta</h4>
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
                    <div class="form-check">
                        <input type="radio" disabled value="0" <?php $check = ($this->solicitud->solicitud_eg == 0 ? "checked" : ""); echo $check; ?> >
                        <label>No</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" disabled value="1" <?php $check = ($this->solicitud->solicitud_eg == 1 ? "checked" : ""); echo $check; ?> >
                        <label>Si</label>
                    </div>
                </div>
                <div class="col form-group">
                    <label>Ecografía previa de crecimiento</label>
                </div>
                <div class="col form-group">
                    <div class="form-check">
                        <input type="radio" disabled value="0" <?php $check = ($this->solicitud->solicitud_eco == 0 ? "checked" : ""); echo $check; ?> >
                        <label>No</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" disabled value="1" <?php $check = ($this->solicitud->solicitud_eco == 1 ? "checked" : ""); echo $check; ?> >
                        <label>Si</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-3 form-group">
                    <label>FUM operacional</label>
                    <input type="date" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_fum); ?>">
                </div>
                <div class="col-3 form-group">
                    <label>Edad Gestacional</label>
                    <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_egestacional); ?>">
                </div>
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
                    <div class="form-check">
                        <input type="radio" disabled id="interconsulta.profesional.medico" value="Médico" name="interconsulta_profesional" <?php $check = ($this->solicitud->solicitud_profesional == "Médico" ? "checked" : ""); echo $check; ?> >
                        <label for="interconsulta.profesional.medico">Médico</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" disabled id="interconsulta.profesional.matrona" value="Matrona" name="interconsulta_profesional" <?php $check = ($this->solicitud->solicitud_profesional == "Matrona" ? "checked" : ""); echo $check; ?> >
                        <label for="interconsulta.profesional.matrona">Matrón/Matrona</label>
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
        </div>
    </div>
    <div class="card mt-3">
        <div class="card-body">
            <h4>Responder a esta solicitud de interconsulta</h4>
            <div class="row">
                <div class="col form-group" id="jaja.papapa">
                    <label for="interconsulta.para">Fecha</label>
                    <input type="text" disabled class="form-control" name="comentario" id="interconsulta.comentario.respuesta" value="<?php echo htmlentities($this->solicitud_evaluacion->evaluacion_fecha); ?>">
                </div>
            </div>
            <div class="row">
                <div class="col form-group">
                    <label for="interconsulta.comentario.respuesta">Comentario</label>
                    <input type="text" disabled class="form-control" name="comentario" id="interconsulta.comentario.respuesta" value="<?php echo htmlentities($this->solicitud_evaluacion->evaluacion_comentarios); ?>">
                </div>
            </div>
        </div>
    </div>
    <div class="card mt-3">
        <div class="card-body">
            <h4 class="my-3">Respuesta de profesional contrarreferente a solicitud de exámen ecográfico</h4>
            <div class="row">
                <div class="col form-group">
                    <label for="interconsulta.respuesta.fecha">Fecha evaluación de interconsulta</label>
                    <input disabled type="date" class="form-control" value="<?php echo htmlentities($this->solicitud_resultado->fecha); ?>">
                </div>
                <div class="col form-group">
                    <label for="interconsulta.respuesta.eg">Edad gestacional actual</label>
                    <input disabled type="text" class="form-control" value="<?php echo htmlentities($this->solicitud_resultado->eg); ?>">
                </div>
            </div>
            <div class="row">
                <div class="col form-group">
                    <label>Feto en presentación</label>
                    <input disabled type="text" class="form-control" value="<?php echo htmlentities($this->solicitud_resultado->presentacion); ?>">
                </div>
                <div class="col form-group">
                    <label>Dorso fetal</label>
                    <input disabled type="text" class="form-control" value="<?php echo htmlentities($this->solicitud_resultado->dorso); ?>">
                </div>
            </div>
            <div class="row" id="interconsulta.respuesta.liquido.div">
                <div class="col form-group">
                    <label for="interconsulta.respuesta.liquido">Líquido amniótico</label>
                    <input disabled type="text" class="form-control" value="<?php echo htmlentities($this->solicitud_resultado->liquido); ?>">
                </div>
            </div>
            <div class="row" id="interconsulta.respuesta.pfe.div">
                <div class="col form-group">
                    <label for="interconsulta.respuesta.pfe"><strong>A.- Biometría ecográfica:</strong><br>Peso fetal estimado</label>
                    <input disabled type="number" class="form-control" value="<?php echo htmlentities($this->solicitud_resultado->pfe); ?>">
                </div>
                <div class="col form-group">
                    <label for="interconsulta.respuesta.pfe.percentil">&nbsp;<br>Percentil</label>
                    <input disabled type="text" class="form-control" disabled="" value="<?php echo htmlentities($this->solicitud_resultado->pfe_percentil); ?>">
                </div>
            </div>
            <div class="row" id="interconsulta.respuesta.uterinas.div">
                <div class="col form-group">
                    <label for="interconsulta.respuesta.uterinas"><strong>B.- Flujometría Doppler</strong><br>IP. Promedio uterinas</label>
                    <input disabled type="text" class="form-control" value="<?php echo htmlentities($this->solicitud_resultado->uterinas); ?>">
                </div>
                <div class="col form-group">
                    <label for="interconsulta.respuesta.uterinas.percentil">&nbsp;<br>Percentil</label>
                    <input disabled type="text" class="form-control" value="<?php echo htmlentities($this->solicitud_resultado->uterinas_percentil); ?>">
                </div>
            </div>
            <div class="row" id="interconsulta.respuesta.umbilical.div">
                <div class="col form-group">
                    <label for="interconsulta.respuesta.umbilical">IP. Arteria umbilical</label>
                    <input disabled type="text" class="form-control" value="<?php echo htmlentities($this->solicitud_resultado->umbilical); ?>">
                </div>
                <div class="col form-group">
                    <label for="interconsulta.respuesta.umbilical.percentil">Percentil</label>
                    <input disabled type="text" class="form-control" value="<?php echo htmlentities($this->solicitud_resultado->umbilical_percentil); ?>">
                </div>
            </div>
            <div class="row" id="interconsulta.respuesta.cm.div">
                <div class="col form-group">
                    <label for="interconsulta.respuesta.cm">IP. Cerebral media</label>
                    <input disabled type="text" class="form-control" value="<?php echo htmlentities($this->solicitud_resultado->cm); ?>">
                </div>
                <div class="col form-group">
                    <label for="interconsulta.respuesta.cm.percentil">Percentil</label>
                    <input disabled type="text" class="form-control" value="<?php echo htmlentities($this->solicitud_resultado->cm_percentil); ?>">
                </div>
            </div>
            <div class="row">
                <div class="col form-group">
                    <label for="interconsulta.respuesta.cmau">Cuociente CM / AU</label>
                    <input disabled type="text" class="form-control" value="<?php echo htmlentities($this->solicitud_resultado->cmau); ?>">
                </div>
                <div class="col form-group">
                    <label for="interconsulta.respuesta.cmau.percentil">Percentil</label>
                    <input disabled type="text" class="form-control" value="<?php echo htmlentities($this->solicitud_resultado->cmau_percentil); ?>">
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <p>Hipótesis diagnóstica</p>
                </div>
                <div class="col form-group">
                    <label for="interconsulta.respuesta.hipotesis">Crecimiento fetal</label>
                    <input disabled type="text" class="form-control" value="<?php echo htmlentities($this->solicitud_resultado->hipotesis); ?>">
                </div>
                <div class="col form-group">
                    <label for="interconsulta.respuesta.hipotesis">Flujometría Doppler</label>
                    <input disabled type="text" class="form-control" value="<?php echo htmlentities($this->solicitud_resultado->doppler); ?>">
                </div>
            </div>
            <div class="row">
                <div class="col form-group">
                    <label for="interconsulta.respuesta.comentariosexamen">Comentarios de exámen</label>
                    <?php echo $this->solicitud_resultado->comentariosexamen; ?>
                </div>
            </div>
            <div class="row">
                <div class="col form-group">
                    <label for="interconsulta.respuesta.ecografista">Ecografista</label>
                    <input disabled type="text" class="form-control" id="respuesta.ecografista" value="<?php echo htmlentities($this->solicitud_resultado->ecografista); ?>">
                </div>
            </div>
        </div>
    </div>
    <?php } else { ?>
        <div class="alert alert-danger" role="alert">Esta interconsulta no existe.</div>
    <?php } ?>
</div>