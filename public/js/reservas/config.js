export const config = {
    reservas: 'api/reservas',
    reservasInterface: '<div class="d-flex justify-content-between mb-3"> <button type="button" class="btn btn-primary" id="reservas.nuevo">Nueva reserva</button> <div class="form-group form-inline mb-0"> <label class="">Buscar reservas para:</label> <input type="date" id="reservas.buscar" class="form-control bg-primary text-white ml-1"> </div></div><div class="table-responsive mt-2"> <table class="table table-striped table-bordered table-hover table-sm" id="reservas.table"> <caption>Lista de reservas de atención</caption> </table></div>',
    reservasInterfaceNewButton: 'reservas.nuevo',
    reservasInterfaceSearch: 'reservas.buscar',
    reservasInterfaceTable: 'reservas.table',
    reservasInterfaceTableHead: '<thead class="thead-dark"><tr><th scope="col">Rut</th><th scope="col">Nombre</th><th scope="col">Apellido</th><th scope="col">FUM</th><th scope="col">Opciones</th></tr></thead>',
    newReservaTitulo: 'Reserva de hora para atención',
    newReservaHTML: '<div class="card mb-2 shadow"> <div class="card-body"><div class="row"> <div class="col-12 mb-2"><strong>¿Quién?</strong></div><div class="form-group col-12 col-md-4"> <label for="inputEmail4">R.U.T</label> <input type="email" class="form-control" id="inputEmail4"> </div><div class="form-group col-12 col-md-4"> <label for="inputPassword4">Nombres</label> <input type="password" class="form-control" id="inputPassword4"> </div><div class="form-group col-12 col-md-4"> <label for="inputPassword4">Apellidos</label> <input type="password" class="form-control" id="inputPassword4"> </div></div></div></div><div class="card mb-2 shadow"> <div class="card-body"><div class="row"> <div class="col-12 mb-2"> <strong>¿Cuando?</strong> </div><div class="form-group col-12 col-md-4"> <label for="inputEmail4">Día</label> <input class="form-control" id="inputEmail4" type="date"> </div><div class="form-group col-12 col-md-4"> <label for="inputPassword4">Hora</label> <input class="form-control" id="inputPassword4" type="number"> </div><div class="form-group col-12 col-md-4"> <label for="inputPassword4">Minutos</label> <input class="form-control" id="inputPassword4" type="number"> </div></div></div></div>',

}