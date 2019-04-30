<!doctype html>
<html lang="es">
<head>
    <title>Administrador de interconsultas</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <base href="<?php echo Config::get('URL'); ?>" target="_self">
    <link rel="stylesheet" href="<?php echo Config::get('URL'); ?>css/style.css">
    <link rel="apple-touch-icon" sizes="57x57" href="images/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="images/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="images/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="images/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="images/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="images/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="images/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="images/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="images/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="images/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <!-- solo si usas Dropdowns y tooltips -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <!--  -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</head>
<body>
<div class="container">
    <h1 class="text-center">Agendar solicitud</h1>
    <?php $this->renderFeedbackMessages(); ?>
    <div class="card mt-1">
        <div class="card-body">
            <h4>Datos de la interconsulta</h4>
            <?php if ($this->solicitud) { ?>
            <form method="post" action="<?php echo Config::get('URL'); ?>dashboard/editSave">
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
                <h5><span class="badge badge-default p-2" for="interconsulta.profesional"><strong>Ecografista de contrarreferencia</strong></span></h5>
                <div class="row">
                    <div class="col form-group">
                        <label>Nombre:</label>
                        <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_nombre_referente); ?>">
                    </div>
                    <div class="col form-group">
                        <label>Email (contrareferencia)</label>
                        <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_profesionalemail); ?>">
                    </div>
                </div>
                <h4>Evaluación de solicitud ecográfica</h4>
                <div class="row">
                    <div class="col-4 form-group">
                        <label>Fecha</label>
                        <input type="date" class="form-control" name="evaluacion_fecha">
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.comentario.respuesta"><strong>Comentario</strong></label>
                        <input type="text" class="form-control" name="comentario">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Enviar respuesta</button>
            </form>
            <?php } else { ?>
                <div class="alert alert-danger" role="alert">Esta interconsulta no existe.</div>
            <?php } ?>
        </div>
    </div>
</div>
</body>
</html>