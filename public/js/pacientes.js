var config = {
    pacientes: 'api/pacientes'
}

async function getPacientes(){
    try {
      const result = await wt.get(config.pacientes);
      return result;
    } catch(e) {}
}


let spinnerGrow = wt.makeSpinnerGrow();
wt._("pacientes").innerHTML = spinnerGrow.html;
getPacientes().then(function(res){
    console.log(res)
});