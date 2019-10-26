export const config = {
    pacientes: 'api/pacientes',
    paciente: 'api/paciente/',
    new: 'api/newPacientes',
    update: 'api/updatePaciente',
    delete: 'api/deletePaciente',
    newPacientesTitulo: 'Crear nuevo paciente',
    newPacientesHTML: '<div class="form-group"> <label for="rut">R.U.T.</label> <input type="text" class="form-control" id="rut"></div><div class="form-group"> <label for="nombre">Nombre</label> <input type="text" class="form-control" id="nombre"></div><div class="form-group"> <label for="apellido">Apellido</label> <input type="text" class="form-control" id="apellido"></div><div class="row"><div class="col form-group"> <label for="fum">FUM</label> <input type="date" class="form-control" id="fum"></div><div class="col form-group"> <label for="fum">Semanas</label> <input type="number" class="form-control" id="semanas" disabled></div><div class="col form-group"> <label for="fum">Dias</label> <input type="number" class="form-control" id="dias" disabled></div></div>',
    updatePacientesTitulo: 'Actualizar paciente',
    updatePacientesHTML: '<input type="hidden" class="form-control" id="id"><div class="form-group"> <label for="rut">R.U.T.</label> <input type="text" class="form-control" id="rut"></div><div class="form-group"> <label for="nombre">Nombre</label> <input type="text" class="form-control" id="nombre"></div><div class="form-group"> <label for="apellido">Apellido</label> <input type="text" class="form-control" id="apellido"></div><div class="row"><div class="col form-group"> <label for="fum">FUM</label> <input type="date" class="form-control" id="fum"></div><div class="col form-group"> <label for="fum">Semanas</label> <input type="number" class="form-control" id="semanas" disabled></div><div class="col form-group"> <label for="fum">Dias</label> <input type="number" class="form-control" id="dias" disabled></div></div>',
    pacienteInterface: '<button type="button" class="btn btn-primary" id="paciente.nuevo">Nuevo paciente</button><div class="table-responsive mt-2"><table class="table table-striped table-bordered table-hover" id="paciente.table"><caption>Lista de pacientes</caption></table>',
    pacienteInterfaceNewButton: 'paciente.nuevo',
    pacienteInterfaceTable: 'paciente.table',
    pacienteInterfaceTableHead: '<thead class="thead-dark"><tr><th scope="col">#</th><th scope="col">Rut</th><th scope="col">Nombre</th><th scope="col">Apellido</th><th scope="col">FUM</th><th scope="col">Opciones</th></tr></thead>'
}