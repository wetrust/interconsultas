export const config = {
    reservas: 'api/reservas',
    reservasInterface: '<div class="d-flex justify-content-between mb-3"> <button type="button" class="btn btn-primary" id="reservas.nuevo">Nueva reserva</button> <div class="form-group form-inline mb-0"> <label class="">Buscar reservas para:</label> <input type="date" id="reservas.buscar" class="form-control bg-primary text-white ml-1"> </div></div><div class="table-responsive mt-2"> <table class="table table-striped table-bordered table-hover table-sm" id="reservas.table"> <caption>Lista de reservas de atención</caption> </table></div>',
    reservasInterfaceNewButton: 'reservas.nuevo',
    reservasInterfaceSearch: 'reservas.buscar',
    reservasInterfaceTable: 'reservas.table',
    reservasInterfaceTableHead: '<thead class="thead-dark"><tr><th scope="col">Rut</th><th scope="col">Nombre</th><th scope="col">Apellido</th><th scope="col">FUM</th><th scope="col">Opciones</th></tr></thead>',
    newReservaTitulo: 'Reserva de hora para atención',
    newReservaHTML: '',
    
}