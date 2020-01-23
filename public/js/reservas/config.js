export const config = {
    reservas: 'api/reservas',
    configuraciones: 'api/configuraciones', 
    reservasInterface: '<div class="d-flex justify-content-between mb-3"> <button type="button" class="btn btn-primary" id="reservas.nuevo">Nueva reserva</button> <div class="form-group form-inline mb-0"> <label class="">Buscar reservas para:</label> <input type="date" id="reservas.buscar" class="form-control bg-primary text-white ml-1"> </div></div><div class="table-responsive mt-2"> <table class="table table-striped table-bordered table-hover table-sm" id="reservas.table"> <caption>Lista de reservas de atención</caption> </table></div>',
    reservasInterfaceNewButton: 'reservas.nuevo',
    reservasInterfaceSearch: 'reservas.buscar',
    reservasInterfaceTable: 'reservas.table',
    reservasInterfaceTableHead: '<thead class="thead-dark"><tr><th scope="col">Rut</th><th scope="col">Nombre</th><th scope="col">Apellido</th><th scope="col">FUM</th><th scope="col">Opciones</th></tr></thead>',
    newReservaTitulo: 'Reserva de hora para atención',
    newReservaHTML: '<div class="card mb-2 shadow"><div class="card-body"><div class="row"><div class="col-12 mb-2"><strong>¿Quién?</strong></div><div class="form-group col-12 col-md-4"><label>R.U.T</label><input type="text" class="form-control" id="rut"></div><div class="form-group col-12 col-md-4"><label>Nombres</label><input type="text" class="form-control-plaintext" id="nombre" readonly></div><div class="form-group col-12 col-md-4"><label>Apellidos</label><input type="text" class="form-control-plaintext" id="apellido" readonly></div></div></div></div><div class="card mb-2 shadow"><div class="card-body"><div class="row"><div class="col-12 mb-2"><strong>¿Cuando?</strong></div><div class="form-group col-12 col-md-4"><label>Día</label><input class="form-control-plaintext" id="dia" type="date" readonly></div><div class="form-group col-12 col-md-4"><label>Hora</label><input class="form-control" id="hora" type="number"></div><div class="form-group col-12 col-md-4"><label>Minutos</label><input class="form-control" id="minutos" type="number"></div></div></div></div>',
    find: 'api/buscarpaciente/',
    newPacientesTitulo: 'Crear nuevo paciente',
    newPacientesHTML: '<div class="row"> <div class="col form-group"> <label for="rut">R.U.T.</label> <input type="text" class="form-control g-verde text-white" name="rut" readonly> </div><div class="col form-group"> <label for="rut">Teléfono</label> <input type="number" class="form-control" id="telefono"> </div></div><div class="row"> <div class="col form-group"> <label>Nombre</label> <input type="text" class="form-control g-verde text-white" name="nombre"> </div><div class="col form-group"> <label>Apellido</label> <input type="text" class="form-control g-verde text-white" name="apellido"> </div></div><div class="row"> <div class="col form-group"> <label for="ciudad">Nacionalidad</label> <select class="form-control" id="nacionalidad"></select> </div><div class="col form-group"> <label for="lugar">Ciudad</label> <select class="form-control" id="ciudad"></select> </div></div><div class="row"> <div class="col form-group"> <label for="ciudad">Lugar de control</label> <select class="form-control" id="lugar"></select> </div><div class="col form-group"> <label for="lugar">Patologia materna</label> <select class="form-control" id="patologia"></select> </div></div><div class="row"> <div class="col form-group"> <label for="fum">FUM</label> <input type="date" class="form-control g-verde text-white" id="fum"> </div><div class="col form-group"> <label for="fum">Semanas</label> <select class="form-control" id="semanas"></select> </div><div class="col form-group"> <label for="fum">Dias</label> <select class="form-control" id="dias"></select> </div></div>',
    new: 'api/newPacientes',
}