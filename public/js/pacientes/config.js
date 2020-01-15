export const config = {
    pacientes: 'api/pacientes',
    paciente: 'api/paciente/',
    new: 'api/newPacientes',
    update: 'api/updatePaciente',
    delete: 'api/deletePaciente',
    find: 'api/buscarpaciente/',
    examen: 'api/examen/',
    newPacientesTitulo: 'Crear nuevo paciente',
    newPacientesHTML: '<div class="row"> <div class="col form-group"> <label for="rut">R.U.T.</label> <input type="text" class="form-control g-verde text-white" id="rut"> </div><div class="col form-group"> <label for="rut">Teléfono</label> <input type="number" class="form-control" id="telefono"> </div></div><div class="row"> <div class="col form-group"> <label for="nombre">Nombre</label> <input type="text" class="form-control g-verde text-white" id="nombre"> </div><div class="col form-group"> <label for="apellido">Apellido</label> <input type="text" class="form-control g-verde text-white" id="apellido"> </div></div><div class="row"> <div class="col form-group"> <label for="ciudad">Ciudad de procedencia</label> <select class="form-control" id="ciudad"></select> </div><div class="col form-group"> <label for="lugar">Lugar de control habitual</label> <select class="form-control" id="lugar"></select> </div></div><div class="row"> <div class="col form-group"> <label for="fum">FUM</label> <input type="date" class="form-control g-verde text-white" id="fum"> </div><div class="col form-group"> <label for="fum">Semanas</label> <select class="form-control" id="semanas"></select> </div><div class="col form-group"> <label for="fum">Dias</label> <select class="form-control" id="dias"></select> </div></div>',
    updatePacientesTitulo: 'Actualizar paciente',
    updatePacientesHTML: '<input type="hidden" class="form-control" id="id"><div class="row"> <div class="col form-group"> <label for="rut">R.U.T.</label> <input type="text" class="form-control" id="rut" disabled> </div><div class="col form-group"> <label for="rut">Teléfono</label> <input type="number" class="form-control" id="telefono"> </div></div><div class="row"> <div class="col form-group"> <label for="nombre">Nombre</label> <input type="text" class="form-control" id="nombre"> </div><div class="col form-group"> <label for="apellido">Apellido</label> <input type="text" class="form-control" id="apellido"> </div></div><div class="row"> <div class="col form-group"> <label for="ciudad">Ciudad de procedencia</label> <select class="form-control" id="ciudad"></select> </div><div class="col form-group"> <label for="lugar">Lugar de control habitual</label> <select class="form-control" id="lugar"></select> </div></div><div class="row"> <div class="col form-group"> <label for="fum">FUM</label> <input type="date" class="form-control" id="fum"> </div><div class="col form-group"> <label for="fum">Semanas</label> <select class="form-control" id="semanas"></select> </div><div class="col form-group"> <label for="fum">Dias</label> <select class="form-control" id="dias"></select> </div></div>',
    pacienteInterface: '<div class="d-flex justify-content-between mb-3"><button type="button" class="btn btn-primary" id="paciente.nuevo">Nuevo paciente</button><div class="form-group form-inline mb-0"><label class="">Buscar listado de pacientes por R.U.T. o Apellido:</label><input type="search" id="paciente.buscar" class="form-control bg-primary text-white ml-1"></div></div><div class="table-responsive mt-2"><table class="table table-striped table-bordered table-hover table-sm" id="paciente.table"><caption>Lista de pacientes</caption></table>',
    pacienteInterfaceNewButton: 'paciente.nuevo',
    pacienteInterfaceTable: 'paciente.table',
    pacienteInterfaceTableHead: '<thead class="thead-dark"><tr><th scope="col">Rut</th><th scope="col">Nombre</th><th scope="col">Apellido</th><th scope="col">FUM</th><th scope="col">Opciones</th></tr></thead>',
    ciudades: 'dashboard/ciudades_configuracion',
    lugares: 'dashboard/lugares_configuracion',
    verExamenesTitulo: 'Ver exámenes de paciente',
    verExamenesHTML: '<div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Nuevo examen</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><button data-value="0">1.- Doppler + Eco. crecimiento</button><button data-value="2">2.- Ecografía 2° / 3° trimestre</button><button data-value="4">3.- Ecografía 11 / 14 semanas</button><button data-value="1">4.- Ecografía precoz de urgencia</button><button data-value="3">5.- Ecografía Ginecológica</button><button data-value="5">6.- Parto</button></div></div><table class="table table-striped table-bordered table-hover table-sm my-4" id="examen.table"><caption>Lista de exámenes</caption></table>',
    verExamenesTable: 'examen.table',
    verExamenesTableHead: '<thead class="thead-dark"><tr><td><span class="text-primary">Realizado</span></td><td><span class="text-primary">Edad Gest.</span></td><td><span class="text-primary">Tipo de exámen</span></td><td><span class="text-primary">Accion</span></td></tr></thead>',
}