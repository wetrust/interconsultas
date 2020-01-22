export const config = {
    configuraciones: 'api/configuraciones',
    newNacionalidad: '/api/newNacionalidad',
    newCiudad: '/api/newCiudad',
    newLugar: '/api/newLugar',
    newPatologia: '/api/newPatologia',
    configuracionInterface: '<ul class="nav nav-tabs" role="tablist"> <li class="nav-item"> <a class="nav-link active" id="nacionalidad-tab" data-toggle="tab" href="#nacionalidad" role="tab" aria-controls="nacionalidad" aria-selected="true">Nacionalidad</a> </li><li class="nav-item"> <a class="nav-link" id="ciudad-tab" data-toggle="tab" href="#ciudad" role="tab" aria-controls="ciudad" aria-selected="false">Ciudad</a> </li><li class="nav-item"> <a class="nav-link" id="lugar-tab" data-toggle="tab" href="#lugar" role="tab" aria-controls="lugar" aria-selected="false">Lugar de control</a> </li><li class="nav-item"> <a class="nav-link" id="patologia-tab" data-toggle="tab" href="#patologia" role="tab" aria-controls="patologia" aria-selected="false">Patología materna</a> </li></ul><div class="tab-content"> <div class="tab-pane fade show active" id="nacionalidad" role="tabpanel" aria-labelledby="nacionalidad-tab"> <div class="card mt-2 shadow"> <div class="card-body"> <div class="d-flex justify-content-between mb-3"> <button type="button" class="btn btn-primary" id="nacionalidad.nuevo">Nueva nacionalidad</button> </div><div class="table-responsive mt-2"> <table class="table table-striped table-bordered table-hover table-sm" id="nacionalidad.table"> <caption>Lista de nacionalidades</caption> </table> </div></div></div></div><div class="tab-pane fade" id="ciudad" role="tabpanel" aria-labelledby="ciudad-tab"> <div class="card mt-2 shadow"> <div class="card-body"> <div class="d-flex justify-content-between mb-3"> <button type="button" class="btn btn-primary" id="ciudad.nuevo">Nueva ciudad</button> </div><div class="table-responsive mt-2"> <table class="table table-striped table-bordered table-hover table-sm" id="ciudad.table"> <caption>Lista de ciudades</caption> </table> </div></div></div></div><div class="tab-pane fade" id="lugar" role="tabpanel" aria-labelledby="lugar-tab"> <div class="card mt-2 shadow"> <div class="card-body"> <div class="d-flex justify-content-between mb-3"> <button type="button" class="btn btn-primary" id="lugar.nuevo">Nuevo Lugar</button> </div><div class="table-responsive mt-2"> <table class="table table-striped table-bordered table-hover table-sm" id="lugar.table"> <caption>Lista de lugares de control</caption> </table> </div></div></div></div><div class="tab-pane fade" id="patologia" role="tabpanel" aria-labelledby="patologia-tab"> <div class="card mt-2 shadow"> <div class="card-body"> <div class="d-flex justify-content-between mb-3"> <button type="button" class="btn btn-primary" id="patologia.nuevo">Nueva Patología</button> </div><div class="table-responsive mt-2"> <table class="table table-striped table-bordered table-hover table-sm" id="patologia.table"> <caption>Lista de patologias</caption> </table> </div></div></div></div></div>',
    configuracionNacionalidadInterfaceNewButton: 'nacionalidad.nuevo',
    configuracionCiudadInterfaceNewButton: 'ciudad.nuevo',
    configuracionLugarInterfaceNewButton: 'lugar.nuevo',
    configuracionPatologiaInterfaceNewButton: 'patologia.nuevo',  
    configuracionNacionalidadInterfaceTable: 'nacionalidad.table',
    configuracionCiudadInterfaceTable: 'ciudad.table',
    configuracionLugarInterfaceTable: 'lugar.table',
    configuracionPatologiaInterfaceTable: 'patologia.table',
    configuracionNacionalidadInterfaceTableHead: '<thead class="thead-dark"><tr><th scope="col">N°</th><th scope="col">Nacionalidad</th><th scope="col">Opciones</th></tr></thead>',
    configuracionCiudadInterfaceTableHead: '<thead class="thead-dark"><tr><th scope="col">N°</th><th scope="col">Ciudad</th><th scope="col">Opciones</th></tr></thead>',
    configuracionLugarInterfaceTableHead: '<thead class="thead-dark"><tr><th scope="col">N°</th><th scope="col">Lugar</th><th scope="col">Opciones</th></tr></thead>',
    configuracionPatologiaInterfaceTableHead: '<thead class="thead-dark"><tr><th scope="col">N°</th><th scope="col">Patologia</th><th scope="col">Opciones</th></tr></thead>',
    newNacionalidadTitulo: 'Nueva Nacionalidad',
    newNacionalidadHTML: '<div class="card mb-2 shadow"><div class="card-body"><div class="row"><div class="form-group col-12"><label>Nombre de la nacionalidad</label><input type="text" class="form-control" id="input.nacionalidad"></div></div></div></div>',
    newCiudadTitulo: 'Nueva Ciudad',
    newCiudadHTML: '<div class="card mb-2 shadow"><div class="card-body"><div class="row"><div class="form-group col-12"><label>Nombre de la ciudad</label><input type="text" class="form-control" id="input.ciudad"></div></div></div></div>',
    newLugarTitulo: 'Nuevo Lugar',
    newLugarHTML: '<div class="card mb-2 shadow"><div class="card-body"><div class="row"><div class="form-group col-12"><label>Nombre del lugar de control</label><input type="text" class="form-control" id="input.lugar"></div></div></div></div>',
    newPatologiaTitulo: 'Nueva Patología Materna',
    newPatologiaHTML: '<div class="card mb-2 shadow"><div class="card-body"><div class="row"><div class="form-group col-12"><label>Nombre de la patología materna</label><input type="text" class="form-control" id="input.patologia"></div></div></div></div>',
}