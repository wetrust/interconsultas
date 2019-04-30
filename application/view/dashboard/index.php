<style> 
.btn-animado {
  background-color: red;
  animation: example 5s infinite;
  color:#000
}
/* Standard syntax */
@keyframes example {
  0% { background-color: #BDCE30; }
  11% { background-color: #6ABB81; }
  23% { background-color: #00B29A; }
  33% { background-color: #0099AE; }
  45% { background-color: #4F72B8; }
  54% { background-color: #A065AA; }
  66% { background-color: #EE4D7A; }
  77% { background-color: #EF4C45; }
  89% { background-color: #F4792B;; color:#FFF;}
  100% { background-color: #FAA634; color:#FFF;}
}
</style>
<div class="container">
    <h1 class="my-2 text-center text-secondary">Administración de interconsultas</h1>
    <?php $this->renderFeedbackMessages(); ?>
    <div class="card my-2 shadow">
        <div class="card-body d-flex flex-row">
            <div class="w-100 d-flex flex-row">
                <p class="my-2 mr-2"><strong>Interconsultas</strong></p>
                <div class="btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-secondary active">
                        <input type="radio" checked autocomplete="off"> Nuevas
                    </label>
                    <label class="btn btn-secondary">
                        <input type="radio" autocomplete="off"> En espera
                    </label>
                    <label class="btn btn-secondary">
                        <input type="radio" autocomplete="off"> Finalizadas
                    </label>
                </div>
            </div>
            <button type="button" class="btn btn-animado d-none" id="filtro.activar">Ver Filtros</button>
        </div>
    </div>
    <div class="card my-2 shadow d-none" id="filtro.contenedor">
        <div class="card-body">
            <div class="row">
                <div class="col">
                    <label>Ciudad</label>
                    <select class="form-control" id="filtro.ciudad"></select></div>
                <div class="col">
                    <label>Lugar de control</label>
                    <select class="form-control" id="filtro.lugar"></select></div>
                <div class="col">
                    <label>Fecha desde</label>
                    <input type="date" id="filtro.fecha" class="form-control" placeholder="Fecha"></div>
                <div class="col">
                    <label>Fecha hasta</label>
                    <input type="date" id="filtro.fecha.hasta" class="form-control" placeholder="Fecha"></div>
                <div class="col">
                    <label>Tipo de exámen</label>
                    <select class="form-control" id="filtro.tipo">
                        <option value="8">No Seleccionado</option>
                        <option value="1">Eco Primer trimestre</option>
                        <option value="2">Eco 2do / 3cer trimestre</option>
                        <option value="0">Eco Doppler crecimiento</option>
                        <option value="3">Eco Ginecológica</option>
                    </select></div>
                <div class="col">
                    <label>Filtro</label>
                    <div class="btn-group" role="group">
                        <button id="filtro.accion" class="btn btn-primary">Aplicar</button>
                        <button id="filtro.borrar" class="btn btn-danger">Borrar</button>
                    </div></div>
            </div>
        </div>
    </div>
    <div class="card my-2 shadow">
        <div class="card-body">
            <table class="table table-bordered mt-2">
                <thead class="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Rut</th>
                        <th>Fecha</th>
                        <th>Diagnóstico</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody id="tabla.resultado">
                </tbody>
            </table>
        </div>
    </div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item"><a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Interconsultas nuevas</a></li>
        <li class="nav-item"><a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Interconsultas esperando evaluación</a></li>
        <li class="nav-item"><a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Interconsultas resueltas</a></li>
        <li class="nav-item"><a class="nav-link" id="contact-tab" data-toggle="tab" href="#referentes" role="tab" aria-controls="referentes" aria-selected="false">Listas profesionales referentes</a></li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div class="card mt-1">
                <div class="card-body">
                    <?php if ($this->solicitudes_new) { ?>
                        <table class="table table-bordered mt-2">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Rut</th>
                                    <th>Fecha</th>
                                    <th>Diagnóstico</th>
                                    <th>Accion</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach($this->solicitudes_new as $key => $value) { ?>
                                <tr>
                                    <td><?= $value->solicitud_id; ?></td>
                                    <td><?= htmlentities($value->solicitud_nombre); ?></td>
                                    <td><?= htmlentities($value->solicitud_rut); ?></td>
                                    <td><?php
                                        $laFecha = explode("-",$value->solicitud_fecha);
                                        echo htmlentities($laFecha[2] . "-". $laFecha[1]. "-". $laFecha[0]); 
                                    ?></td>
                                    <td><?= htmlentities($value->solicitud_diagnostico); ?></td>
                                    <td><a href="<?= Config::get('URL') . 'dashboard/agendar/' . $value->solicitud_id; ?>">Agendar</a></td>
                                    <td><a class="btn btn-danger" href="<?= Config::get('URL') . 'dashboard/delete/' . $value->solicitud_id; ?>">Eliminar</a></td>
                                </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    <?php } else { ?>
                        <div class="alert alert-info mt-2" role="alert">No tiene solicitudes actualmente</div>
                    <?php } ?>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div class="card mt-1">
                <div class="card-body">
                    <?php if ($this->solicitudes) { ?>
                        <table class="table table-bordered mt-2">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Rut</th>
                                    <th>Fecha</th>
                                    <th>Diagnóstico</th>
                                    <th>Accion</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach($this->solicitudes as $key => $value) { ?>
                                <tr>
                                    <td><?= $value->solicitud_id; ?></td>
                                    <td><?= htmlentities($value->solicitud_nombre); ?></td>
                                    <td><?= htmlentities($value->solicitud_rut); ?></td>
                                    <td><?php
                                        $laFecha = explode("-",$value->solicitud_fecha);
                                        echo htmlentities($laFecha[2] . "-". $laFecha[1]. "-". $laFecha[0]); 
                                    ?></td>
                                    <td><?= htmlentities($value->solicitud_diagnostico); ?></td>
                                    <td><a href="<?= Config::get('URL') . 'dashboard/edit/' . $value->solicitud_id; ?>">Responder</a></td>
                                    <td><a class="btn btn-danger" href="<?= Config::get('URL') . 'dashboard/delete/' . $value->solicitud_id; ?>">Eliminar</a></td>
                                </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    <?php } else { ?>
                        <div class="alert alert-info mt-2" role="alert">No tiene solicitudes actualmente</div>
                    <?php } ?>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
        <div class="card mt-1">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <label>Ciudad</label>
                            <select class="form-control" id="filtro.ciudad">
                                <option value="8">No Seleccionado</option>
                            </select>
                        </div>
                        <div class="col">
                            <label>Lugar de control</label>
                            <select class="form-control" id="filtro.lugar">
                                <option value="8">No Seleccionado</option>
                            </select>
                        </div>
                        <div class="col">
                            <label>Fecha desde</label>
                            <input type="date" id="filtro.fecha" class="form-control" placeholder="Fecha">
                        </div>
                        <div class="col">
                            <label>Fecha hasta</label>
                            <input type="date" id="filtro.fecha.hasta" class="form-control" placeholder="Fecha">
                        </div>
                        <div class="col">
                            <label>Tipo de exámen</label>
                            <select class="form-control" id="filtro.tipo">
                                <option value="8">No Seleccionado</option>
                                <option value="1">Eco Primer trimestre</option>
                                <option value="2">Eco 2do / 3cer trimestre</option>
                                <option value="0">Eco Doppler crecimiento</option>
                                <option value="3">Eco Ginecológica</option>
                            </select>
                        </div>
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button class="btn btn-primary my-3" id="filtro.accion">Filtrar datos</button>
                        <button class="btn btn-danger my-3" id="filtro.borrar">Borrar filtros</button>
                    </div>
                    <?php if ($this->solicitudes_old) { ?>
                        <table class="table table-bordered mt-2">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre de paciente</th>
                                    <th>Ciudad</th>
                                    <th>Fecha</th>
                                    <th>Tipo de exámen</th>
                                    <th>Accion</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody id="tabla.resuelta">
                                <?php foreach($this->solicitudes_old as $key => $value) { ?>
                                <tr>
                                    <td><?= $value->solicitud_id; ?></td>
                                    <td><?= htmlentities($value->solicitud_nombre); ?></td>
                                    <td><?= htmlentities($value->solicitud_ciudad); ?></td>
                                    <td><?php
                                        $laFecha = explode("-",$value->fecha);
                                        echo htmlentities($laFecha[2] . "-". $laFecha[1]. "-". $laFecha[0]); 
                                    ?></td>
                                    <td><?php
                                        if ($value->tipo == "1"){
                                            $tipo = 'Eco Primer trimestre';
                                        } else if ($value->tipo == "0"){
                                            $tipo = 'Eco Doppler crecimiento';
                                        } else  if ($value->tipo == "2"){
                                            $tipo = 'Eco 2do / 3cer trimestre';
                                        } else  if ($value->tipo == "3"){
                                            $tipo = 'Eco Ginecológica';
                                        }
                                    
                                    echo htmlentities($tipo); ?></td>
                                    <?php if ($value->tipo == 1){ ?>
                                    <td><a class="btn btn-primary mr-3" href="<?= Config::get('URL') . 'pdf/informe_primertrimestre/' . $value->solicitud_id; ?>">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe="<?= $value->tipo; ?>" data-solicitud="<?= $value->solicitud_id; ?>">Reenviar</a></td>
                                    <?php } else if ($value->tipo == 0){ ?>
                                    <td><a class="btn btn-primary mr-3" href="<?= Config::get('URL') . 'pdf/informe_dopplercrecimiento/' . $value->solicitud_id; ?>">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe="<?= $value->tipo; ?>" data-solicitud="<?= $value->solicitud_id; ?>">Reenviar</a></td>
                                    <?php } else if ($value->tipo == 2){ ?>
                                    <td><a class="btn btn-primary mr-3" href="<?= Config::get('URL') . 'pdf/informe_segundotrimestre/' . $value->solicitud_id; ?>">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe="<?= $value->tipo; ?>" data-solicitud="<?= $value->solicitud_id; ?>">Reenviar</a></td>
                                    <?php } else if ($value->tipo == 3){ ?>
                                    <td><a class="btn btn-primary mr-3" href="<?= Config::get('URL') . 'pdf/informe_ginecologico/' . $value->solicitud_id; ?>">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe="<?= $value->tipo; ?>" data-solicitud="<?= $value->solicitud_id; ?>">Reenviar</a></td>

                                    <?php } ?>
                                    <td><a class="btn btn-danger" href="<?= Config::get('URL') . 'dashboard/delete/' . $value->solicitud_id; ?>">Eliminar</a></td>
                                </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    <?php } else { ?>
                        <div class="alert alert-info mt-2" role="alert">No tiene solicitudes actualmente</div>
                    <?php } ?>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="referentes" role="tabpanel" aria-labelledby="contact-tab">
        <div class="card mt-1">
                <div class="card-body">
                    <?php if ($this->profesionales) { ?>
                        <table class="table table-bordered mt-2">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Emails</th>
                                </tr>
                            </thead>
                            <tbody id="tabla.correos.geniales">
                                <?php foreach($this->profesionales as $key => $value) { ?>
                                <tr>
                                    <td data-email="<?= htmlentities($value->solicitud_email); ?>"><?= htmlentities($value->solicitud_email); ?></td>
                                </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    <?php } else { ?>
                        <div class="alert alert-info mt-2" role="alert">No tiene solicitudes actualmente</div>
                    <?php } ?>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Enviar por email</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#Mhome" role="tab" aria-controls="home" aria-selected="true">Elegir correo</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#Mprofile" role="tab" aria-controls="profile" aria-selected="false">Escribir correo</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="Mhome" role="tabpanel" aria-labelledby="home-tab">
                        <div class="form-group">
                            <label for="interconsulta.respuesta.fecha">Fecha evaluación de interconsulta</label>
                            <select class="form-control" id="interfaz.email"></select>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="Mprofile" role="tabpanel" aria-labelledby="profile-tab">
                        <div class="form-group">
                            <label for="interfaz.email.write">Fecha evaluación de interconsulta</label>
                            <input type="email" class="form-control" id="interfaz.email.write">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" id="interfaz.enviar">Enviar correo</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="expandir.informacion" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Solicitudes enviadas por este correo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body" id="expandir.informacion.contenedor">
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="ver.interconsulta" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Interconsulta</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body" id="expandir.informacion.contenedor">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
<script>
    var _api = "<?php echo Config::get('URL'); ?>dashboard/";
    var _URL = "<?= Config::get('URL') ?>";
</script>
<script src="js/principal.js"></script>