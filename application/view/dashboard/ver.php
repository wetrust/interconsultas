<div class="container">
    <h1 class="text-center">Ver interconsulta</h1>
    <?php $this->renderFeedbackMessages(); ?>
    <?php if ($this->solicitud) { ?>
    <form method="post" action="<?php echo Config::get('URL'); ?>dashboard/editSave">
    <div class="card mt-1">
        <div class="card-body">
            <h4>Datos de la interconsulta</h4>
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
                    <div class="form-check">
                        <input type="radio" disabled id="interconsulta.profesional.medico" value="Médico" name="interconsulta_profesional">
                        <label for="interconsulta.profesional.medico">Médico</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" disabled id="interconsulta.profesional.matrona" value="Matrona" name="interconsulta_profesional">
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
                <div class="col form-group">
                    <label for="interconsulta.para">¿Interconsulta aceptada?</label>
                </div>
                <div class="col form-group">
                    <div class="form-check">
                        <input type="radio" disabled id="interconsulta.aceptada.si" value="1" name="interconsulta_aceptada" class="form-check-input" <?php if ($this->solicitud_evaluacion->evaluacion_aceptada == 1) { echo 'checked'; } ?>>
                        <label class="form-check-label" for="interconsulta.aceptada.si">Si</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" disabled id="interconsulta.aceptada.no" value="0" name="interconsulta_aceptada" class="form-check-input" <?php if ($this->solicitud_evaluacion->evaluacion_aceptada == 0) { echo 'checked'; } ?>>
                        <label class="form-check-label" for="interconsulta.aceptada.no">No</label>
                    </div>
                </div>
                <div class="col form-group" id="jaja.papapa">
                    <label for="interconsulta.para">¿Eco de crecimiento?</label>
                </div>
                <div class="col form-group" id="jaja.papap">
                    <div class="form-check">
                        <input type="radio" disabled id="interconsulta.crecimiento.si" value="1" name="interconsulta_crecimiento" class="form-check-input" <?php if ($this->solicitud_evaluacion->eco_crecimiento == 1) { echo 'checked'; } ?>>
                        <label class="form-check-label" for="interconsulta.crecimiento.si">Si</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" disabled id="interconsulta.crecimiento.no" value="0" name="interconsulta_crecimiento" class="form-check-input" <?php if ($this->solicitud_evaluacion->eco_crecimiento == 0) { echo 'checked'; } ?>>
                        <label class="form-check-label" for="interconsulta.crecimiento.no">No</label>
                    </div>
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
            <h4 class="text-center">Respuesta de profesional contrarreferente a solicitud de exámen ecográfico</h4>
            <div class="row">
                <div class="col-6 form-group">
                    <label for="interconsulta.email">¿Solicitud de exámen relacionada con crecimiento fetal?</label>
                        <select disabled class="form-control" id="interconsulta.respuesta.proceder">
                            <option value="si">Si</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.fecha">Fecha evaluación de interconsulta</label>
                        <input disabled type="date" class="form-control" id="interconsulta.respuesta.fecha">
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.eg">Edad gestacional actual</label>
                        <input disabled type="hidden" class="form-control" id="interconsulta.fum.copia">
                        <input type="text" class="form-control" id="interconsulta.respuesta.eg" disabled="">
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.comentarios" class="bg-primary text-white px-1">Comentarios y observaciones respecto a solicitud ecográfica</label>
                        <input disabled type="text" class="form-control" id="interconsulta.respuesta.comentarios">
                    </div>
                </div>
                <h5 id="interconsulta.titulo" class="text-center m-3">Resumen exámen ecográfico de biometría y flujometría Doppler Materno / Fetal</h5>
                <div class="row" id="interconsulta.respuesta.pfe.div">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.pfe"><strong>A.- Biometría ecográfica:</strong><br>Peso fetal estimado</label>
                        <input disabled type="number" class="form-control" id="interconsulta.respuesta.pfe">
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.pfe.percentil">&nbsp;<br>Percentil</label>
                        <input disabled type="text" class="form-control" id="interconsulta.respuesta.pfe.percentil" disabled="">
                    </div>
                </div>
                <div class="row" id="interconsulta.respuesta.ccca.div">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.ccca">Relación cráneo / abdómen</label>
                        <input disabled type="text" class="form-control" id="interconsulta.respuesta.ccca">
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.ccca.percentil">Percentil</label>
                        <input disabled type="text" class="form-control" id="interconsulta.respuesta.ccca.percentil" disabled="">
                    </div>
                </div>
                <div class="row" id="interconsulta.respuesta.liquido.div">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.liquido">Líquido amniótico</label>
                        <select disabled class="form-control" id="interconsulta.respuesta.liquido">
                            <option value="normal">Normal</option>
                            <option value="pha">PHA</option>
                            <option value="oha">OHA</option>
                        </select>
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.bvm">BVM</label>
                        <input disabled type="number" class="form-control" id="interconsulta.respuesta.bvm">
                    </div>
                </div>
                <div class="row" id="interconsulta.respuesta.uterinas.div">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.uterinas"><strong>B.- Flujometría Doppler</strong><br>IP. Promedio uterinas</label>
                        <input disabled type="text" class="form-control" id="interconsulta.respuesta.uterinas">
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.uterinas.percentil">&nbsp;<br>Percentil</label>
                        <input disabled type="text" class="form-control" id="interconsulta.respuesta.uterinas.percentil" disabled="">
                    </div>
                </div>
                <div class="row" id="interconsulta.respuesta.umbilical.div">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.umbilical">IP. Arteria umbilical</label>
                        <input disabled type="text" class="form-control" id="interconsulta.respuesta.umbilical">
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.umbilical.percentil">Percentil</label>
                        <input disabled type="text" class="form-control" id="interconsulta.respuesta.umbilical.percentil" disabled="">
                    </div>
                </div>
                <div class="row" id="interconsulta.respuesta.cm.div">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.cm">IP. Cerebral media</label>
                        <input disabled type="text" class="form-control" id="interconsulta.respuesta.cm">
                    </div>
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.cm.percentil">Percentil</label>
                            <input disabled type="text" class="form-control" id="interconsulta.respuesta.cm.percentil" disabled="">
                        </div>
                    </div>
                    <div class="row" id="interconsulta.respuesta.cmau.div">
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.cmau">Cuociente CM / AU</label>
                            <input disabled type="text" class="form-control" id="interconsulta.respuesta.cmau">
                        </div>
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.cmau.percentil">Percentil</label>
                            <input disabled type="text" class="form-control" id="interconsulta.respuesta.cmau.percentil" disabled="">
                        </div>
                    </div>
                    <div class="row" id="interconsulta.respuesta.hipotesis.div">
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.hipotesis">Hipótesis diagnóstica</label>
                            <input disabled type="text" class="form-control" id="interconsulta.respuesta.hipotesis">
                        </div>
                    </div>
                    <div class="row" id="interconsulta.respuesta.rciu.div">
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.rciu">De ser RCIU, categorización según protocolo adjunto (Figuera, Gratacos y col.)</label>
                            <select disabled class="form-control" id="interconsulta.respuesta.rciu">
                                <option value="G I">G I</option>
                                <option value="G II">G II</option>
                                <option value="g III">G III</option>
                                <option value="g IV">G IV</option>
                            </select>
                        </div>
                    </div>
                    <div class="row" id="interconsulta.respuesta.lugar.div">
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.lugar"><strong>Próximo control</strong> Lugar:</label>
                            <input disabled type="text" class="form-control" id="interconsulta.respuesta.lugar">
                        </div>
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.controlfecha">Fecha</label>
                            <input disabled type="date" class="form-control" id="interconsulta.respuesta.controlfecha">
                        </div>
                    </div>
                    <div class="row" id="interconsulta.respuesta.comentariosexamen.div">
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.comentariosexamen">Comentarios de exámen</label>
                            <input disabled type="text" class="form-control" id="interconsulta.respuesta.comentariosexamen">
                        </div>
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.ecografista">Ecografista</label>
                            <input disabled type="text" class="form-control" id="respuesta.ecografista">
                        </div>
                    </div>
        </div>
    </div>
    </form>
    <?php } else { ?>
        <div class="alert alert-danger" role="alert">Esta interconsulta no existe.</div>
    <?php } ?>
</div>