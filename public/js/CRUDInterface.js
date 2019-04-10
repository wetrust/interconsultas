class CRUDInterface {

    constructor(view) {
        this._titulo = view.titulo;
        this._inputs = view.inputs;
        this.header = this._createHeader();
        this.table = this._createTable(this._inputs);
        this.modal = this._createModal(this._titulo, this._inputs);
    }

    html(container){
        $(container).append(this.header + this.table + this.modal);
        
        $('#interface').on('hidden.bs.modal', function (e) {
            $("#interface :input").each(function(){
                $(this).val("");
            });
        });

        $('#interface').on('show.bs.modal', function (event) {
            var element = $(event.relatedTarget);
            var tableid = element.data('id');
            if ($.isNumeric(tableid)){
                let args = {
                    action: "read"
                }
                let element_first = $("#interface\\.body :input").first();
                let element_id = element_first[0].id.split(".");
                element_id = element_id[element_id.length -1];
                args[element_id] = tableid;

                $.post(_api, args).done(function(data){
                    if (Object.keys(data).length > 0) {
                        $('#interface\\.body :input').each(function(){
                            let element_id = this.id.split(".");
                            element_id = element_id[element_id.length -1];
                            $(this).val(data[element_id]);
                        });
                    }
                });
            }
        });

        $("#interface\\.guardar\\.footer").on("click", function(){
            var args = {};

            let element_first = $("#interface\\.body :input").first().val();
            args['action'] = $.isNumeric(element_first) ? 'set' : 'new';
            
            $('#interface\\.body :input').each(function(){
                let element_id = this.id.split(".");
                element_id = element_id[element_id.length -1];
                if (this.nodeName == 'SELECT'){
                    args[element_id] = $(this).children(":selected").val();
                }
                else{
                    args[element_id] = $(this).val();
                }
                
            });
            $('#interface').modal("hide");
            $.post(_api, args).done(function(data){
                CRUDInterface.reloadTable(_api);
            });
        });

        CRUDInterface.reloadTable(_api);
    }

    static reloadTable(url) {
        let args = {
            action: "get"
        }

        $.post(url, args).done(function(data){
            $('#table\\.body').empty();
            if (Object.keys(data).length > 0) {
                let response = '';
                for (let i = 0; i < data.length; i++) {
                    response += '<tr data-toggle="modal" data-target="#interface" data-id="' + data[i][Object.keys(data[i])[0]] + '">';
                    for (var col in data[i]) {
                        response += '<td data-' + col + '="' + data[i][col] + '">' + data[i][col] + '</td>';
                    }
                    response += '</tr>';
                }
                $('#table\\.body').append(response);
            }
        });
    }

    _createHeader(){
        let header = '<div class="row"><div class="col-12 col-sm-6"><div class="btn-group my-2" role="group"><button type="button" class="btn btn-outline-primary" id="button.nuevo" data-toggle="modal" data-target="#interface" data-id="new">Nuevo</button></div></div><div class="col-12 col-sm-6"><h3 class="text-right my-2" id="crud.title">' + this._titulo + '</h3></div></div>';
        return header;
    }
    
    _createTable(inputs){
        let cantidad = Object.keys(inputs).length;

        if (cantidad == 0){
            throw new Error('No existen elementos para crear la tabla');
        }
        let response = '<div class="table-responsive"><table class="table table-striped table-hover"><thead><tr id="table.head">';

        for (var input in inputs) {
            response += '<td>' + inputs[input].name + '</td>';
        }
        
        response += '</tr></thead><tbody id="table.body"></tbody></table></div>';

        return response;
    }

    _createModal(title,inputs){
        let modal = '<div class="modal fade" id="interface" tabindex="-1" role="dialog" aria-labelledby="interface.title" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="interface.title">';
        modal += title + '</h5></div><div class="modal-body" id="interface.body">';
        modal += this._createForm(inputs);
        modal += '</div><div class="modal-footer" id="interface.footer"><button type="button" class="btn btn-outline-secondary" data-dismiss="modal" id="interface.cerrar.footer">Cancelar</button><button type="button" class="btn btn-outline-primary" id="interface.guardar.footer">Guardar</button></div></div></div></div>';
        return modal;
    }

    _createForm(inputs){
        let cantidad = Object.keys(inputs).length;

        if (cantidad == 0){
            throw new Error('No existen elementos para crear el formulario');
        }

        let clase = (cantidad > 2) ? 'col-12 col-sm-6' : 'col-12';
        let response = '';
        for (var input in inputs) {
            if (inputs[input].type != 'hidden'){
                response += '<div class="form-group ' + clase + '">';
                response += '<label for="interface.input.' + input + '" id="interface.label.' + input + '">' + inputs[input].name + '</label>';
            }
            if (inputs[input].type == 'select'){
                response += '<select class="form-control" id="interface.input.' + input + '">';
                for (var fila in inputs[input].data){
                    response += '<option value="' + inputs[input].data[fila].value + '">' + inputs[input].data[fila].text +'</option>'
                }
                response += '</select>';
            }
            else{
                response += '<input type="' + inputs[input].type + '" class="form-control" id="interface.input.' + input + '">';
            }
            if (inputs[input].type != 'hidden'){
                response += '</div>'; 
            }
        }

        return response;
    }
}