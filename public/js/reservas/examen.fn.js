export class fn {
    static EG(data){
        let _FUM = new Date();
        _FUM.setTime(Date.parse(data.paciente.fum));
        _FUM = _FUM.getTime();
        let _fExamen = new Date();
        _fExamen.setTime(Date.parse(data.fecha));
        _fExamen = _fExamen.getTime();
        
        let diff = _fExamen - _FUM;
        if (diff > 0){
            let dias = diff/(1000*60*60*24);
            let semanas = Math.trunc(dias / 7);
        
            if (semanas > 42){
                return {semanas:42,dias:0,text:"42 semanas"};
            }else{
                dias = Math.trunc(dias - (semanas * 7));
                return {semanas:semanas,dias:dias,text:semanas + "." + dias + " semanas"};
            }
        }else{
            return {semanas:0,dias:0,text:"0 semanas"};
        }
    }
    static number(value){
        let value = String(value);
        if (value.length > 0){
            value = value.replace(",", ".");
            value = parseInt(value);
        }else{
            return null;
        }
    }
    static cut(data){
        let  value = String(data.value);
        if (value.length > 0){
            return value.substring(0, data.digit);
        }else{
            return null;
        }
    }
}