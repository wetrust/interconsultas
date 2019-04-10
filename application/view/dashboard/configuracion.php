<div class="container">
    <div class="card">
        <div class="card-body">
            <h3>Configuración</h3>
            <div id="almacenamiento"></div>
        </div>
    </div>
</div>
<script src="<?php echo Config::get('URL'); ?>/js/CRUDInterface.js"></script>
<script src="https://cloud.tinymce.com/5/tinymce.min.js?apiKey=oouk84qvr4nweklpy61gp7uep4rl0h3mnn2sc4t81ay5qs1f"></script>
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

        tinymce.init({ selector:'#interface.input.texto_text' });
    });
</script>