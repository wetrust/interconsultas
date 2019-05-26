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
<nav class="navbar navbar-expand-lg navbar-light bg-info">
  <a class="navbar-brand" href="#">Interconsultas</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
<div class="container">
    <h1 class="my-2 text-center text-secondary">Administración de interconsultas</h1>
    <?php $this->renderFeedbackMessages(); ?>
    <div class="card my-2 shadow">
        <div class="card-body d-flex flex-row">
            <div class="w-100 d-flex flex-row">
                <p class="my-2 mr-2"><strong>Interconsultas</strong></p>
                <div class="btn-group-toggle" data-toggle="buttons">
                    <label id="interconsultas.estado.nuevas" class="btn btn-secondary active">
                        <input type="radio" value="1" name="interconsultas" checked autocomplete="off"> Nuevas
                    </label>
                    <label id="interconsultas.estado.espera" class="btn btn-secondary">
                        <input type="radio" value="2" name="interconsultas" autocomplete="off"> En espera
                    </label>
                    <label id="interconsultas.estado.finalizadas" class="btn btn-secondary">
                        <input type="radio" value="3" name="interconsultas" autocomplete="off"> Finalizadas
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
                        <option value="1">1.- Ecografía precoz de urgencia</option>
                        <option value="4">2.- Ecografía 11-14 semanas</option>
                        <option value="2">3.- Eco 2do / 3cer trimestre</option>
                        <option value="0">4.- Doppler + Eco. crecimiento</option>
                        <option value="3">5.- Eco Ginecológica</option>
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
            <div class="alert alert-primary d-none" role="alert" id="mensaje.resultado">No tienes interconsultas en este ítem</div>
            <table class="table table-bordered mt-2" id="tabla.resultado">
                <thead class="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Rut</th>
                        <th>Fecha</th>
                        <th>Diagnóstico</th>
                        <th>Accion</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<div class="modal fade" id="ver.interconsulta" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg h-100" role="document">
        <div class="modal-content  h-100">
            <div class="modal-header">
                <h5 class="modal-title" id="ver.interconsulta.titulo">Interconsulta</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body" id="ver.interconsulta.contenedor">
            </div>
            <div class="modal-footer" id="ver.interconsulta.footer">
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="expandir.informacion" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header"><h5 class="modal-title">Solicitudes enviadas por este correo</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>
            <div class="modal-body" id="expandir.informacion.contenedor"></div>
            <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div>
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
                            <label for="interconsulta.respuesta.fecha">Seleccione un correo electónico</label>
                            <select class="form-control" id="interfaz.email"></select>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="Mprofile" role="tabpanel" aria-labelledby="profile-tab">
                        <div class="form-group">
                            <label for="interfaz.email.write">Escriba un correo electrónico</label>
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
<script>
    var _api = "<?php echo Config::get('URL'); ?>dashboard/";
    var _URL = "<?= Config::get('URL') ?>";
</script>
<?php if (Session::get("user_account_type") > 2) { ?>
<script src="js/principal.js"></script>
<?php } else { ?>
<script src="js/basico.js"></script>
<?php } ?>