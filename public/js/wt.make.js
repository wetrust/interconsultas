class wt{
    static makeSpinnerGrow(){
        let id = this.uuidv4();
        let struct = '<div class="text-center" id='+id+'><div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status"><span class="sr-only">Cargando...</span></div><p>Cargando..</p></div>';
        return {id:id,html:struct};
    }

    static uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    static _(id) {
        return document.getElementById(id);
    }

    static async get(url) {
        const response = await fetch(url);
        return await response.json();
    }
}
module.exports = wt