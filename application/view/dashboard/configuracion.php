<div class="container">
    <div class="card">
        <div class="card-body">
            <h3>Configuración</h3>
            <div id="almacenamiento"></div>
        </div>
    </div>
</div>
<script src="<?php echo Config::get('URL'); ?>/js/CRUDInterface.js"></script>
<script>
    var _api, view, wtInterface;

    $(document).ready(function(){
        _api = "<?php echo Config::get('URL'); ?>dashboard/configuracion_api";
        view = {
            titulo: "Textos predefinidos",
            inputs: {
                texto_id: {
                    name: "#",
                    type: "hidden"
                },
                texto_titulo: {
                    name: "Titulo",
                    type: "text"
                },
                texto_text: {
                    name: "Texto",
                    type: "text"
                }
            }
        };

        wtInterface = null;
        wtInterface = new CRUDInterface(view);
        wtInterface.html("#almacenamiento");
    });
</script>