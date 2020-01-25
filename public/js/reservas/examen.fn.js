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
        return value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    }
    static cut(data){
        let value = String(data.value);
        if (value.length > 0){
            return value.substring(0, data.digit);
        }else{
            return null;
        }
    }
    //arreglar
    static valCC(dof,dbp){
        var delta = parseFloat(1.60);
        return Math.round((parseInt(dof) + parseInt(dbp)) * delta);
    }
    //
    static cc(data){
        'use strict';
        let a = [], b = [];
        a[12] = 64; a[13] = 74; a[14] = 88; a[15] = 100; a[16] = 113; a[17] = 126; a[18] = 137; a[19] = 149; a[20] = 161; a[21] = 172; a[22] = 183; a[23] = 194; a[24] = 204; a[25] = 214; a[26] = 224; a[27] = 233; a[28] = 242; a[29] = 250; a[30] = 258; a[31] = 267; a[32] = 274; a[33] = 280; a[34] = 287; a[35] = 293; a[36] = 299; a[37] = 303; a[38] = 308; a[39] = 311; a[40] = 315; a[41] = 318; a[42] = 322;
        b[12] = 81; b[13] = 94; b[14] = 106; b[15] = 120; b[16] = 135; b[17] = 150; b[18] = 165; b[19] = 179; b[20] = 193; b[21] = 206; b[22] = 219; b[23] = 232; b[24] = 243; b[25] = 256; b[26] = 268; b[27] = 279; b[28] = 290; b[29] = 300; b[30] = 310; b[31] = 319; b[32] = 328; b[33] = 336; b[34] = 343; b[35] = 351; b[36] = 358; b[37] = 363; b[38] = 368; b[39] = 373; b[40] = 377; b[41] = 382; b[42] = 387;
    
        if (data.dataset.eg < 12 || data.dataset.eg > 40) {
            return {pct:0,text:""};
        }
        else {
            let uno = b[data.dataset.eg] - a[data.dataset.eg];
            let dos = data.value - a[data.dataset.eg];
            let resultado = parseInt(95 / (uno) * (dos) + 3);
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        }
    }
    static ca(data){
        'use strict';
        let a = [], b = [];
        a[12] = 42; a[13] = 52; a[14] = 64; a[15] = 75;  a[16] = 86;  a[17] = 97; a[18] = 109; a[19] = 119; a[20] = 131; a[21] = 141; a[22] = 151; a[23] = 161; a[24] = 171; a[25] = 181; a[26] = 191; a[27] = 200; a[28] = 209; a[29] = 218; a[30] = 227; a[31] = 236; a[32] = 245; a[33] = 253; a[34] = 261; a[35] = 269; a[36] = 277; a[37] = 285; a[38] = 292; a[39] = 299; a[40] = 307; a[41] = 313; a[42] = 320;
        b[12] = 71; b[13] = 79; b[14] = 92; b[15] = 102; b[16] = 113; b[17] = 127; b[18] = 141; b[19] = 155; b[20] = 170; b[21] = 183; b[22] = 192; b[23] = 209; b[24] = 223; b[25] = 235; b[26] = 248; b[27] = 260; b[28] = 271; b[29] = 284; b[30] = 295; b[31] = 306; b[32] = 318; b[33] = 329; b[34] = 339; b[35] = 349; b[36] = 359; b[37] = 370; b[38] = 380; b[39] = 389; b[40] = 399; b[41] = 409; b[42] = 418;
    
        if (data.dataset.eg < 12 || data.dataset.eg > 40){
            return {pct:0,text:""};
        }
        else {
            let uno = b[data.dataset.eg] - a[data.dataset.eg];
            let dos = data.value - a[data.dataset.eg];
            let resultado = parseInt(95 / (uno) * (dos) + 3);
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        }
    }
    //arreglar
    static ccca(cc,ca,eg){
        'use strict';
        let ccca = fn.number(String(cc / ca))
        ccca = ccca.toFixed(1);

        let a = [], b = [];
        a[15] = 1.1; a[16] = 1.09; a[17] = 1.08; a[18] = 1.07; a[19] = 1.06; a[20] = 1.06; a[21] = 1.05; a[22] = 1.04; a[23] = 1.03; a[24] = 1.02; a[25] = 1.01; a[26] = 1; a[27] = 1; a[28] = 0.99; a[29] = 0.98; a[30] = 0.97; a[31] = 0.96; a[32] = 0.95; a[33] = 0.95; a[34] = 0.94; a[35] = 0.93; a[36] = 0.92; a[37] = 0.91; a[38] = 0.9; a[39] = 0.89; a[40] = 0.89;
        b[15] = 1.29; b[16] = 1.28; b[17] = 1.27; b[18] = 1.26; b[19] = 1.25; b[20] = 1.24; b[21] = 1.24; b[22] = 1.23; b[23] = 1.22; b[24] = 1.21; b[25] = 1.2; b[26] = 1.19; b[27] = 1.18; b[28] = 1.18; b[29] = 1.17; b[30] = 1.17; b[31] = 1.16; b[32] = 1.15; b[33] = 1.14; b[34] = 1.13; b[35] = 1.12; b[36] = 1.11; b[37] = 1.1; b[38] = 1.09; b[39] = 1.08; b[40] = 1.08;
    
        if (eg < 15 || eg > 40){
            return {pct:0,text:""};
        }
        else {
            var uno = b[eg] - a[eg];
            var dos = ccca - a[eg];
            var resultado = parseInt(95 / (uno) * (dos) + 3);
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}



            return {pct:resultado,text: ccca + ", percentil " + texto};
        }
    }
    //
    static lf(data){
        'use strict';
        let a = [], b = [];
        a[12] = 7;  a[13] = 9;  a[14] = 12; a[15] = 15; a[16] = 17; a[17] = 21; a[18] = 23; a[19] = 26; a[20] = 28; a[21] = 30; a[22] = 33; a[23] = 35; a[24] = 38; a[25] = 40; a[26] = 42; a[27] = 44; a[28] = 46; a[29] = 48; a[30] = 50; a[31] = 52; a[32] = 53; a[33] = 55; a[34] = 57; a[35] = 59; a[36] = 60; a[37] = 62; a[38] = 64; a[39] = 65; a[40] = 66; a[41] = 68; a[42] = 69;
        b[12] = 12; b[13] = 14; b[14] = 17; b[15] = 20; b[16] = 23; b[17] = 27; b[18] = 31; b[19] = 34; b[20] = 38; b[21] = 40; b[22] = 43; b[23] = 47; b[24] = 50; b[25] = 52; b[26] = 56; b[27] = 58; b[28] = 62; b[29] = 64; b[30] = 66; b[31] = 68; b[32] = 71; b[33] = 73; b[34] = 75; b[35] = 78; b[36] = 80; b[37] = 82; b[38] = 84; b[39] = 86; b[40] = 88; b[41] = 90; b[42] = 92;
    
        if (data.dataset.eg < 12 || data.dataset.eg > 40) {
            return {pct:0,text:""};
        }else {
            let uno = b[data.dataset.eg] - a[data.dataset.eg];
            let dos = data.value - a[data.dataset.eg];
            let resultado = parseInt(95 / (uno) * (dos) + 3);
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        }
    }
    static ut(data){
        'use strict';
        var a = [], b = [];
        a[10] = 1.23; a[11] = 1.18; a[12] = 1.11; a[13] = 1.05; a[14] = 0.99; a[15] = 0.94; a[16] = 0.89; a[17] = 0.85; a[18] = 0.81; a[19] = 0.78; a[20] = 0.74; a[21] = 0.71; a[22] = 0.69; a[23] = 0.66; a[24] = 0.64; a[25] = 0.62; a[26] = 0.6; a[27] = 0.58; a[28] = 0.56; a[29] = 0.55; a[30] = 0.54; a[31] = 0.52; a[32] = 0.51; a[33] = 0.51; a[34] = 0.51; a[35] = 0.49; a[36] = 0.48; a[37] = 0.48; a[38] = 0.47; a[39] = 0.47; a[40] = 0.47;
        b[10] = 2.84; b[11] = 2.71; b[12] = 2.53; b[13] = 2.38; b[14] = 2.24; b[15] = 2.11; b[16] = 1.99; b[17] = 1.88; b[18] = 1.79; b[19] = 1.71; b[20] = 1.61; b[21] = 1.54; b[22] = 1.47; b[23] = 1.41; b[24] = 1.35; b[25] = 1.3; b[26] = 1.25; b[27] = 1.21; b[28] = 1.17; b[29] = 1.13; b[30] = 1.11; b[31] = 1.06; b[32] = 1.04; b[33] = 1.01; b[34] = 0.99; b[35] = 0.97; b[36] = 0.95; b[37] = 0.94; b[38] = 0.92; b[39] = 0.91; b[40] = 0.91;
      
        if (data.dataset.eg < 10 || data.dataset.eg > 40){
            return {pct:0,text:""};
        }else {
            let uno = b[data.dataset.eg] - a[data.dataset.eg];
            let dos = data.value - a[data.dataset.eg];
            let resultado = 90 / (uno) * (dos) + 5;
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        }
    }
    static promut(prom,eg){
        'use strict';
        var a = [], b = [];
        a[10] = 1.23; a[11] = 1.18; a[12] = 1.11; a[13] = 1.05; a[14] = 0.99; a[15] = 0.94; a[16] = 0.89; a[17] = 0.85; a[18] = 0.81; a[19] = 0.78; a[20] = 0.74; a[21] = 0.71; a[22] = 0.69; a[23] = 0.66; a[24] = 0.64; a[25] = 0.62; a[26] = 0.6; a[27] = 0.58; a[28] = 0.56; a[29] = 0.55; a[30] = 0.54; a[31] = 0.52; a[32] = 0.51; a[33] = 0.51; a[34] = 0.51; a[35] = 0.49; a[36] = 0.48; a[37] = 0.48; a[38] = 0.47; a[39] = 0.47; a[40] = 0.47;
        b[10] = 2.84; b[11] = 2.71; b[12] = 2.53; b[13] = 2.38; b[14] = 2.24; b[15] = 2.11; b[16] = 1.99; b[17] = 1.88; b[18] = 1.79; b[19] = 1.71; b[20] = 1.61; b[21] = 1.54; b[22] = 1.47; b[23] = 1.41; b[24] = 1.35; b[25] = 1.3; b[26] = 1.25; b[27] = 1.21; b[28] = 1.17; b[29] = 1.13; b[30] = 1.11; b[31] = 1.06; b[32] = 1.04; b[33] = 1.01; b[34] = 0.99; b[35] = 0.97; b[36] = 0.95; b[37] = 0.94; b[38] = 0.92; b[39] = 0.91; b[40] = 0.91;
      
        if (eg < 10 || eg > 40){
            return {pct:0,text:""};
        }else {
            let uno = b[eg] - a[eg];
            let dos = prom - a[eg];
            let resultado = 90 / (uno) * (dos) + 5;
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        } 
    }
    static umb(data){
        'use strict';
        var a = [], b = [];
        a[20] = 0.97; a[21] = 0.95; a[22] = 0.94; a[23] = 0.92; a[24] = 0.9; a[25] = 0.89; a[26] = 0.87; a[27] = 0.85; a[28] = 0.82; a[29] = 0.8; a[30] = 0.78; a[31] = 0.75; a[32] = 0.73; a[33] = 0.7; a[34] = 0.67; a[35] = 0.65; a[36] = 0.62; a[37] = 0.58; a[38] = 0.55; a[39] = 0.52;a[40] = 0.49;
        b[20] = 1.6; b[21] = 1.56; b[22] = 1.53; b[23] = 1.5; b[24] = 1.46; b[25] = 1.43; b[26] = 1.4;	b[27] = 1.37; b[28] = 1.35; b[29] = 1.32; b[30] = 1.29; b[31] = 1.27; b[32] = 1.25; b[33] = 1.22; b[34] = 1.2; b[35] = 1.18; b[36] = 1.16; b[37] = 1.14; b[38] = 1.13; b[39] = 1.11; b[40] = 1.09;
    
        if (data.dataset.eg < 20 || data.dataset.eg > 40){
            return {pct:0,text:""};
        }else {
            let uno = b[data.dataset.eg] - a[data.dataset.eg];
            let dos = data.value - a[data.dataset.eg];
            var resultado = parseInt(90 / (uno) * (dos) + 5);
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        }
    }
    static cm(data){
        'use strict';
        var a = [], b = [];
        a[0] = 1.24; a[1] = 1.29; a[2] = 1.34; a[3] = 1.37; a[4] = 1.4; a[5] = 1.43; a[6] = 1.44; a[7] = 1.45; a[8] = 1.45; a[9] = 1.44; a[10] = 1.43; a[11] = 1.41; a[12] = 1.38; a[13] = 1.34;	a[14] = 1.3; a[15] = 1.25; a[16] = 1.19; a[17] = 1.13;	a[18] = 1.05; a[19] = 0.98; a[20] = 0.89;
        b[0] = 1.98; b[1] = 2.12; b[2] = 2.25; b[3] = 2.36; b[4] = 2.45; b[5] = 2.53; b[6] = 2.59; b[7] = 2.63; b[8] = 2.66; b[9] = 2.67; b[10] = 2.67;	b[11] = 2.65; b[12] = 2.62; b[13] = 2.56;	b[14] = 2.5; b[15] = 2.41; b[16] = 2.31; b[17] = 2.2; b[18] = 2.07; b[19] = 1.92; b[20] = 1.76;
        
        if (data.dataset.eg < 20 || data.dataset.eg > 40){
            return {pct:0,text:""};
        }else {
            let eg = data.dataset.eg;
            eg = eg - 20;
            var uno = b[eg] - a[eg];
            var dos = data.value - a[eg];
            var resultado = parseInt(90 / (uno) * (dos) + 5);

            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        }
    }
    static cmau(promedio,eg){
        var a = [], b = [];
        a[20] = 0.78; a[21] = 0.87; a[22] = 0.95; a[23] = 1.02;a[24] = 1.09; a[25] = 1.15; a[26] = 1.2; a[27] = 1.24;a[28] = 1.28; a[29] = 1.31; a[30] = 1.33; a[31] = 1.35;a[32] = 1.36; a[33] = 1.36; a[34] = 1.36; a[35] = 1.34;a[36] = 1.32; a[37] = 1.3; a[38] = 1.26; a[39] = 1.22;a[40] = 1.18;
        b[20] = 1.68; b[21] = 1.88; b[22] = 2.06; b[23] = 2.22;b[24] = 2.36; b[25] = 2.49; b[26] = 2.6;	b[27] = 2.7;b[28] = 2.78; b[29] = 2.84; b[30] = 2.89; b[31] = 2.92;b[32] = 2.93; b[33] = 2.93; b[34] = 2.91; b[35] = 2.87;b[36] = 2.82; b[37] = 2.75; b[38] = 2.67; b[39] = 2.57;
        
        if (eg < 20 || eg > 40){
            return {pct:0,text:""};
        }else {
            let uno = b[eg] - a[eg];
            let dos = promedio - a[data.dataset.eg];
            var resultado = (90 / (uno) * (dos)) +5
            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:texto};
        }
    }
    //
    static pfe(lf, cc, ca,eg){
        cc = cc / 10;
        ca = ca / 10;
        lf = lf / 10;

        var psoP = Math.pow(10, (1.326 + 0.0107 * cc + 0.0438 * ca + 0.158 * lf - 0.00326 * ca * lf));
    

        if (isNaN(psoP) != true) {
            psoP = Math.trunc(psoP);
        }
        else{
            psoP = 0;
        }

        var pct10 = [], pct90 = [];
        pct10[0] = 97;pct10[1] = 121;pct10[2] = 150;pct10[3] = 185;pct10[4] = 227;pct10[5] = 275;
        pct10[6] = 331;pct10[7] = 398;pct10[8] = 471;pct10[9] = 556;pct10[10] = 652;pct10[11] = 758;
        pct10[12] = 876;pct10[13] = 1004;pct10[14] = 1145;pct10[15] = 1294;pct10[16] = 1453;
        pct10[17] = 1621;pct10[18] = 1794;pct10[19] = 1973;pct10[20] = 2154;pct10[21] = 2335;
        pct10[22] = 2513; pct10[23] = 2686; pct10[24] = 2851; pct10[25] = 2985;
        pct90[0] = 137;pct90[1] = 171;pct90[2] = 212;pct90[3] = 261;pct90[4] = 319;
        pct90[5] = 387;pct90[6] = 467;pct90[7] = 559;pct90[8] = 665;pct90[9] = 784;
        pct90[10] = 918;pct90[11] = 1068;pct90[12] = 1234;pct90[13] = 1416;pct90[14] = 1613;
        pct90[15] = 1824;pct90[16] = 2049;pct90[17] = 2285;pct90[18] = 2530;
        pct90[19] = 2781;pct90[20] = 3036;pct90[21] = 3291;pct90[22] = 3543;pct90[23] = 3786;
        pct90[24] = 4019;pct90[25] = 4234;

        if (eg < 15 || eg > 40 || psoP <= 0)
        {
            return {pct:0,text:""};
        }
        else {
            eg = eg - 15;
            eg = parseInt(eg);
            var uno = pct90[eg] - pct10[eg];
            var dos = psoP - pct10[eg];
            var resultado = (80 / (uno) * (dos)) + 10;

            let texto = Math.trunc(resultado);
            if (texto > 99) {texto = '> 99';} 
            else if (texto < 1) {texto = '< 1';}

            return {pct:resultado,text:psoP + ", percentil " + texto};
        }
    }
    //
}