//crea id random para los modales
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

function valCC(dof,dbp){
    var delta = parseFloat(1.60);
    return Math.round((parseInt(dof) + parseInt(dbp)) * delta);
}

function pctcerebeloAdvanced(eg,cerebelo) {
    'use strict';
    let a = [], b = [];
    a[0] = 12;a[1] = 14;a[2] = 15;a[3] = 16;a[4] = 17;a[5] = 18; a[6] = 19;a[7] = 20;a[8] = 21;a[9] = 22;a[10] = 24; a[11] = 26;a[12] = 27;a[13] = 29;a[14] = 30;a[15] = 31; a[16] = 33;a[17] = 36;a[18] = 37;a[19] = 38;a[20] = 40; a[21] = 40;a[22] = 40;a[23] = 41;a[24] = 42;a[25] = 44;
    b[0] = 18;b[1] = 18;b[2] = 19;b[3] = 20;b[4] = 22; b[5] = 23;b[6] = 25;b[7] = 26;b[8] = 27;b[9] = 30; b[10] = 32;b[11] = 34;b[12] = 34;b[13] = 37;b[14] = 38; b[15] = 41;b[16] = 43;b[17] = 46;b[18] = 48;b[19] = 53; b[20] = 56;b[21] = 58;b[22] = 60;b[23] = 62;b[24] = 62; b[25] = 62;

    if (eg < 15 || eg > 40 ) { return 0; } 
    else {
        eg = parseInt(eg) - 15;
        let uno = b[eg] - a[eg];
        let dos = cerebelo - a[eg];
        let resultado = parseInt(95 / (uno) * (dos) + 5);
        if (resultado > 99) {return '> 99';}
        else if (resultado < 1) {return '< 1';}
        else {return resultado;}
    }
};

function pctlhAdvanced(eg, lh) {
    'use strict';
    let a = [], b = [];
    a[12] = 4.8; a[13] = 7.6; a[14] = 10.3; a[15] = 13.1; a[16] = 15.8;  a[17] = 18.5; a[18] = 21.2; a[19] = 23.8; a[20] = 26.3;  a[21] = 28.8; a[22] = 31.2; a[23] = 33.5; a[24] = 35.7;  a[25] = 37.9; a[26] = 39.9; a[27] = 41.9; a[28] = 43.7;  a[29] = 45.5; a[30] = 47.2; a[31] = 48.9; a[32] = 50.4;  a[33] = 52.1; a[34] = 53.4; a[35] = 54.8; a[36] = 56.2;  a[37] = 57.6; a[38] = 59.8; a[39] = 60.4; a[40] = 61.9;
    b[12] = 12.3; b[13] = 15.1; b[14] = 17.9; b[15] = 20.7; b[16] = 23.5; b[17] = 26.3; b[18] = 29.1; b[19] = 31.6; b[20] = 34.2; b[21] = 36.7; b[22] = 39.2; b[23] = 41.6; b[24] = 43.9; b[25] = 46.1; b[26] = 48.1; b[27] = 50.1; b[28] = 52.1; b[29] = 53.9; b[30] = 55.6; b[31] = 57.3; b[32] = 58.9; b[33] = 60.5; b[34] = 62.1; b[35] = 63.5; b[36] = 64.9; b[37] = 66.4; b[38] = 67.8; b[39] = 69.3; b[40] = 70.8;
    
    if (eg < 12 || eg > 40) {
        return 0;
    }
    else {
        eg = parseInt(eg);
        var uno = b[eg] - a[eg];
        var dos = lh - a[eg];
        var resultado = parseInt(95 / (uno) * (dos) + 5);
        if (resultado > 99) {return '> 99';}
        else if (resultado < 1) {return '< 1';}
        else {return resultado;}
    }
}

function ICAdvanced(dbp, dof) {
    if (dbp > 0 && dof > 0) {
        let valor = ((dbp / dof) * 100);
        return Math.trunc(valor) + "%";
    } else {
        return 0;
    }
}

function pctlfAdvanced(eg, lf) {
    'use strict';
    let a = [], b = [];
    a[12] = 7;  a[13] = 9;  a[14] = 12; a[15] = 15; a[16] = 17; a[17] = 21; a[18] = 23; a[19] = 26; a[20] = 28; a[21] = 30; a[22] = 33; a[23] = 35; a[24] = 38; a[25] = 40; a[26] = 42; a[27] = 44; a[28] = 46; a[29] = 48; a[30] = 50; a[31] = 52; a[32] = 53; a[33] = 55; a[34] = 57; a[35] = 59; a[36] = 60; a[37] = 62; a[38] = 64; a[39] = 65; a[40] = 66; a[41] = 68; a[42] = 69;
    b[12] = 12; b[13] = 14; b[14] = 17; b[15] = 20; b[16] = 23; b[17] = 27; b[18] = 31; b[19] = 34; b[20] = 38; b[21] = 40; b[22] = 43; b[23] = 47; b[24] = 50; b[25] = 52; b[26] = 56; b[27] = 58; b[28] = 62; b[29] = 64; b[30] = 66; b[31] = 68; b[32] = 71; b[33] = 73; b[34] = 75; b[35] = 78; b[36] = 80; b[37] = 82; b[38] = 84; b[39] = 86; b[40] = 88; b[41] = 90; b[42] = 92;

    if (eg < 12 || eg > 40) {return 0;}
    else {
        eg = parseInt(eg);
        var uno = b[eg] - a[eg];
        var dos = lf - a[eg];
        var resultado = parseInt(95 / (uno) * (dos) + 3);
        if (resultado > 99) {return '> 99';}
        else if (resultado < 1) {return '< 1';}
        else {return resultado;}
    }
}

function pctccAdvanced(eg, cc) {
    'use strict';
    let a = [], b = [];
    a[12] = 64; a[13] = 74; a[14] = 88; a[15] = 100; a[16] = 113; a[17] = 126; a[18] = 137; a[19] = 149; a[20] = 161; a[21] = 172; a[22] = 183; a[23] = 194; a[24] = 204; a[25] = 214; a[26] = 224; a[27] = 233; a[28] = 242; a[29] = 250; a[30] = 258; a[31] = 267; a[32] = 274; a[33] = 280; a[34] = 287; a[35] = 293; a[36] = 299; a[37] = 303; a[38] = 308; a[39] = 311; a[40] = 315; a[41] = 318; a[42] = 322;
    b[12] = 81; b[13] = 94; b[14] = 106; b[15] = 120; b[16] = 135; b[17] = 150; b[18] = 165; b[19] = 179; b[20] = 193; b[21] = 206; b[22] = 219; b[23] = 232; b[24] = 243; b[25] = 256; b[26] = 268; b[27] = 279; b[28] = 290; b[29] = 300; b[30] = 310; b[31] = 319; b[32] = 328; b[33] = 336; b[34] = 343; b[35] = 351; b[36] = 358; b[37] = 363; b[38] = 368; b[39] = 373; b[40] = 377; b[41] = 382; b[42] = 387;

    if (eg < 12 || eg > 40) {
        return 0;
    }
    else {
        eg = parseInt(eg);
        var uno = b[eg] - a[eg];
        var dos = cc - a[eg];
        var resultado = parseInt(95 / (uno) * (dos) + 3);
        if (resultado > 99) {return '> 99';} 
        else if (resultado < 1) {return '< 1';} 
        else {return resultado;}
    }
}

function pctcaAdvanced(eg, ca) {
    'use strict';
    let a = [], b = [];
    a[12] = 42; a[13] = 52; a[14] = 64; a[15] = 75;  a[16] = 86;  a[17] = 97; a[18] = 109; a[19] = 119; a[20] = 131; a[21] = 141; a[22] = 151; a[23] = 161; a[24] = 171; a[25] = 181; a[26] = 191; a[27] = 200; a[28] = 209; a[29] = 218; a[30] = 227; a[31] = 236; a[32] = 245; a[33] = 253; a[34] = 261; a[35] = 269; a[36] = 277; a[37] = 285; a[38] = 292; a[39] = 299; a[40] = 307; a[41] = 313; a[42] = 320;
    b[12] = 71; b[13] = 79; b[14] = 92; b[15] = 102; b[16] = 113; b[17] = 127; b[18] = 141; b[19] = 155; b[20] = 170; b[21] = 183; b[22] = 192; b[23] = 209; b[24] = 223; b[25] = 235; b[26] = 248; b[27] = 260; b[28] = 271; b[29] = 284; b[30] = 295; b[31] = 306; b[32] = 318; b[33] = 329; b[34] = 339; b[35] = 349; b[36] = 359; b[37] = 370; b[38] = 380; b[39] = 389; b[40] = 399; b[41] = 409; b[42] = 418;

    if (eg < 12 || eg > 40){return 0;} 
    else {
        eg = parseInt(eg);
        var uno = b[eg] - a[eg];
        var dos = ca - a[eg];
        var resultado = parseInt(95 / (uno) * (dos) + 3);
        if (resultado > 99) {return '> 99';}
        else if (resultado < 1) {return '< 1';}
        else {return resultado;}
    }
}

function pctcccaAdvanced(eg, ccca) {
    'use strict';
    let a = [], b = [];
    a[0] = 1.1; a[1] = 1.09; a[2] = 1.08; a[3] = 1.07; a[4] = 1.06; a[5] = 1.06; a[6] = 1.05; a[7] = 1.04; a[8] = 1.03; a[9] = 1.02; a[10] = 1.01; a[11] = 1; a[12] = 1; a[13] = 0.99; a[14] = 0.98; a[15] = 0.97; a[16] = 0.96; a[17] = 0.95; a[18] = 0.95; a[19] = 0.94; a[20] = 0.93; a[21] = 0.92; a[22] = 0.91; a[23] = 0.9; a[24] = 0.89; a[25] = 0.89;
    b[0] = 1.29; b[1] = 1.28; b[2] = 1.27; b[3] = 1.26; b[4] = 1.25; b[5] = 1.24; b[6] = 1.24; b[7] = 1.23; b[8] = 1.22; b[9] = 1.21; b[10] = 1.2; b[11] = 1.19; b[12] = 1.18; b[13] = 1.18; b[14] = 1.17; b[15] = 1.17; b[16] = 1.16; b[17] = 1.15; b[18] = 1.14; b[19] = 1.13; b[20] = 1.12; b[21] = 1.11; b[22] = 1.1; b[23] = 1.09; b[24] = 1.08; b[25] = 1.08;

    if (eg < 15 || eg > 40){
        return 0;
    }
    else {
        eg = parseInt(eg);
        eg = eg - 15;
        var uno = b[eg] - a[eg];
        var dos = ccca - a[eg];
        var resultado = parseInt(95 / (uno) * (dos) + 3);
        if (resultado > 99) {return '> 99';}
        else if (resultado < 1) {return '< 1';} 
        else {return resultado;}
    }
}

function eglcn() {
    var LCN = [[],[]];
    LCN[0][0] = 0.09; LCN[0][1] = 0.2; LCN[0][2] = 0.37; LCN[0][3] = 0.57; LCN[0][4] = 0.7;
    LCN[0][5] = 0.8; LCN[0][6] = 0.9; LCN[0][7] = 1; LCN[0][8] = 1.1; LCN[0][9] = 1.12;
    LCN[0][10] = 1.13; LCN[0][11] = 1.18; LCN[0][12] = 1.27; LCN[0][13] = 1.38; LCN[0][14] = 1.47;
    LCN[0][15] = 1.58; LCN[0][16] = 1.65; LCN[0][17] = 1.72; LCN[0][18] = 1.87; LCN[0][19] = 1.96;
    LCN[0][20] = 2.05; LCN[0][21] = 2.18; LCN[0][22] = 2.25; LCN[0][23] = 2.35; LCN[0][24] = 2.54;
    LCN[0][25] = 2.62; LCN[0][26] = 2.7; LCN[0][27] = 2.9; LCN[0][28] = 3.08; LCN[0][29] = 3.16;
    LCN[0][30] = 3.4; LCN[0][31] = 3.51; LCN[0][32] = 3.57; LCN[0][33] = 3.76; LCN[0][34] = 3.85;
    LCN[0][35] = 4.05; LCN[0][36] = 4.18; LCN[0][37] = 4.46; LCN[0][38] = 4.55; LCN[0][39] = 4.66;
    LCN[0][40] = 4.88; LCN[0][41] = 5.07; LCN[0][42] = 5.29; LCN[0][43] = 5.46; LCN[0][44] = 5.66;
    LCN[0][45] = 5.87; LCN[0][46] = 6.01; LCN[0][47] = 6.27; LCN[0][48] = 6.37; LCN[0][49] = 6.65;
    LCN[0][50] = 6.77; LCN[0][51] = 7.08; LCN[0][52] = 7.19; LCN[0][53] = 7.39; LCN[0][54] = 7.57;
    LCN[0][55] = 7.68; LCN[0][56] = 7.98; LCN[0][57] = 8.09; LCN[0][58] = 8.35; LCN[0][59] = 8.48;
    LCN[0][60] = 8.56; LCN[0][61] = 8.76; LCN[0][62] = 8.88; LCN[0][63] = 9.09;
    LCN[1][0] = 0; LCN[1][1] = 5.5; LCN[1][2] = 6; LCN[1][3] = 6.2; LCN[1][4] = 6.4;
    LCN[1][5] = 6.5; LCN[1][6] = 6.6; LCN[1][7] = 7.1; LCN[1][8] = 7.1; LCN[1][9] = 7.1;
    LCN[1][10] = 7.2; LCN[1][11] = 7.3; LCN[1][12] = 7.4; LCN[1][13] = 7.5; LCN[1][14] = 7.6;
    LCN[1][15] = 8; LCN[1][16] = 8.1; LCN[1][17] = 8.2; LCN[1][18] = 8.3; LCN[1][19] = 8.4;
    LCN[1][20] = 8.5; LCN[1][21] = 8.6; LCN[1][22] = 9; LCN[1][23] = 9.1; LCN[1][24] = 9.2;
    LCN[1][25] = 9.3; LCN[1][26] = 9.4; LCN[1][27] = 9.5; LCN[1][28] = 10; LCN[1][29] = 10.1;
    LCN[1][30] = 10.2; LCN[1][31] = 10.3; LCN[1][32] = 10.4; LCN[1][33] = 10.5; LCN[1][34] = 10.6;
    LCN[1][35] = 11; LCN[1][36] = 11.1; LCN[1][37] = 11.2; LCN[1][38] = 11.3; LCN[1][39] = 11.4;
    LCN[1][40] = 11.5; LCN[1][41] = 11.6; LCN[1][42] = 12; LCN[1][43] = 12.1; LCN[1][44] = 12.2;
    LCN[1][45] = 12.3; LCN[1][46] = 12.4; LCN[1][47] = 12.5; LCN[1][48] = 12.6; LCN[1][49] = 13;
    LCN[1][50] = 13.1; LCN[1][51] = 13.2; LCN[1][52] = 13.3; LCN[1][53] = 13.4; LCN[1][54] = 13.5;
    LCN[1][55] = 13.6; LCN[1][56] = 14; LCN[1][57] = 14.1; LCN[1][58] = 14.2; LCN[1][59] = 14.3;
    LCN[1][60] = 14.4; LCN[1][61] = 14.5; LCN[1][62] = 14.6; LCN[1][63] = 15;
    var lcn = 0;
    if (parseInt($("input[name='respuesta_lcn']").val()) < 0){
        $("input[name='respuesta_pfe']").val("0");
        return;
    }
    lcn = $("input[name='respuesta_lcn']").val();
    lcn = lcn.toString().replace(',', '.');
    lcn = parseFloat(lcn);
    if (isNaN(lcn) != true) {
        var ValLCN1 = lcn / 10;
        for (i = 1; i <= 63; i++) {
            if (LCN[0][i] >= ValLCN1) {
                var eglcn = LCN[1][i];
                i = 63;
            }
        }
        _fecha = new Date ();
        _fecha.setTime(Date.parse(document.getElementById("interconsulta.respuesta.fecha").value));

        var eglcN = eglcn.toString().split('.');
        if (eglcN.length == 1){
            eglcN = parseInt(eglcN[0]) * 7;
        }else if (eglcN.length == 2){
            eglcN = (parseInt(eglcN[0]) * 7) + parseInt(eglcN[1]);
        }
        _fecha.setDate(_fecha.getUTCDate() - eglcN);
        $("input[name='respuesta_furop']").val(setInputDate(_fecha));
        _fecha.setDate(_fecha.getUTCDate() + 240);
        $("input[name='respuesta_fppactualizada']").val(setInputDate(_fecha));
        $("input[name='respuesta_lcn_eg']").val(eglcn);
    } 
    else {
        $("input[name='respuesta_lcn_eg']").val(0);
        $("input[name='respuesta_furop']").val(setInputDate());
        $("input[name='respuesta_fppactualizada']").val(setInputDate());
    }
};

function calCCCA(){
    var CC,CA;
    if (parseInt($("input[name='respuesta_cc']").val()) < 0){
        $("input[name='respuesta_ccca']").val(0).trigger("change");
        return;
    }
    if (parseInt($("input[name='respuesta_ca']").val()) < 0){
        $("input[name='respuesta_ccca']").val(0).trigger("change");
        return;
    }
    CC = parseInt($("input[name='respuesta_cc']").val());
    CA = parseInt($("input[name='respuesta_ca']").val());
    var ccca = CC / CA;
    $("input[name='respuesta_ccca']").val(ccca.toFixed(2)).trigger("change");
    if (isNaN(ccca) != true) {
        $("input[name='respuesta_ccca']").val(ccca.toFixed(2)).trigger("change");
    }
    else{
        $("input[name='respuesta_ccca']").val(0).trigger("change");
    }
}

function psohdlk() {
    var CC = 0;
    var CA = 0;
    if (parseInt($("input[name='respuesta_cc']").val()) < 0){
        $("input[name='respuesta_pfe']").val(0).trigger("change");
        return;
    }
    if (parseInt($("input[name='respuesta_ca']").val()) < 0){
        $("input[name='respuesta_pfe']").val(0).trigger("change");
        return;
    }
    CC = parseInt($("input[name='respuesta_cc']").val());
    CA = parseInt($("input[name='respuesta_ca']").val());
    var psoP = Math.pow(10, (1.182 + 0.00273 * CC + 0.007057 * CA - 0.0000063 * Math.pow(CA, 2) - 0.000002184 * CC * CA));
    if (isNaN(psoP) != true) {
        $("input[name='respuesta_pfe']").val(Math.trunc(psoP)).trigger("change");
    }
    else{
        $("input[name='respuesta_pfe']").val(0).trigger("change");
    }
}

function pctauAdvanced(eg, aumb) {
    'use strict';
    var a = [], b = [];
    a[0] = 0.97; a[1] = 0.95; a[2] = 0.94; a[3] = 0.92; a[4] = 0.9;	a[5] = 0.89; a[6] = 0.87; a[7] = 0.85; a[8] = 0.82; a[9] = 0.8; a[10] = 0.78; a[11] = 0.75; a[12] = 0.73; a[13] = 0.7; a[14] = 0.67; a[15] = 0.65; a[16] = 0.62; a[17] = 0.58; a[18] = 0.55; a[19] = 0.52;a[20] = 0.49;
    b[0] = 1.6;	b[1] = 1.56; b[2] = 1.53; b[3] = 1.5; b[4] = 1.46; b[5] = 1.43; b[6] = 1.4;	b[7] = 1.37; b[8] = 1.35; b[9] = 1.32; b[10] = 1.29; b[11] = 1.27; b[12] = 1.25; b[13] = 1.22; b[14] = 1.2; b[15] = 1.18; b[16] = 1.16; b[17] = 1.14; b[18] = 1.13; b[19] = 1.11; b[20] = 1.09;

    if (eg < 20 || eg > 40){return 0;}
    else {
        eg = parseInt(eg);
        eg = eg - 20;
        var uno = b[eg] - a[eg];
        var dos = aumb - a[eg];
        var resultado = parseInt(90 / (uno) * (dos) + 5);
        //truncador de Pct, sobre 100 o bajo 1
        if (resultado > 99){ return '> 99'; }
        else if (resultado < 1){ return '< 1'; }
        else{ return resultado; }
    }
}

function pctcmauAdvanced(eg, cmau){
    var xpct5 = [], xpct95 = [];
    xpct5[20] = 0.78; xpct5[21] = 0.87; xpct5[22] = 0.95; xpct5[23] = 1.02;
    xpct5[24] = 1.09; xpct5[25] = 1.15; xpct5[26] = 1.2; xpct5[27] = 1.24;
    xpct5[28] = 1.28; xpct5[29] = 1.31; xpct5[30] = 1.33; xpct5[31] = 1.35;
    xpct5[32] = 1.36; xpct5[33] = 1.36; xpct5[34] = 1.36; xpct5[35] = 1.34;
    xpct5[36] = 1.32; xpct5[37] = 1.3; xpct5[38] = 1.26; xpct5[39] = 1.22;
    xpct5[40] = 1.18;
    xpct95[20] = 1.68; xpct95[21] = 1.88; xpct95[22] = 2.06; xpct95[23] = 2.22;
    xpct95[24] = 2.36; xpct95[25] = 2.49; xpct95[26] = 2.6;	xpct95[27] = 2.7;
    xpct95[28] = 2.78; xpct95[29] = 2.84; xpct95[30] = 2.89; xpct95[31] = 2.92;
    xpct95[32] = 2.93; xpct95[33] = 2.93; xpct95[34] = 2.91; xpct95[35] = 2.87;
    xpct95[36] = 2.82; xpct95[37] = 2.75; xpct95[38] = 2.67; xpct95[39] = 2.57;
    if (eg < 20) {  
        return 0;
    }
    else if (eg > 40)
    {
        return 0;
    }
    else {
        eg = parseInt(eg);
        var uno = xpct95[eg] - xpct5[eg];
        var dos = cmau - xpct5[eg];
        var pctFinal = (90 / (uno) * (dos)) +5
        var pctPFE = '';
        if (pctFinal > 99){
            pctPFE = '> 99';
        }
        else if (pctFinal < 1){
            pctPFE = '< 1';
        }
        else{
            pctPFE = Math.trunc(pctFinal);
        }
        return pctPFE;
    }
}

function pctpfeAdvanced(eg,pfe) {
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
    if (eg < 15) {  
        return 0;
    }
    else if (eg > 40)
    {
        return 0;
    }
    else {
        eg = eg - 15;
        eg = parseInt(eg);
        var uno = pct90[eg] - pct10[eg];
        var dos = pfe - pct10[eg];
        var pctFinal = (80 / (uno) * (dos)) + 10
        var pctPFE = '';
        if (pctFinal > 99){
            pctPFE = '> 99';
        }
        else if (pctFinal < 1){
            pctPFE = '< 1';
        }
        else{
            pctPFE = Math.trunc(pctFinal);
        }
        return pctPFE;
    }
}

function pctUtAdvanced(eg,ut) {
    'use strict';
    var a = [], b = [];
    a[0] = 1.23; a[1] = 1.18; a[2] = 1.11; a[3] = 1.05; a[4] = 0.99; a[5] = 0.94; a[6] = 0.89; a[7] = 0.85; a[8] = 0.81; a[9] = 0.78; a[10] = 0.74; a[11] = 0.71; a[12] = 0.69; a[13] = 0.66; a[14] = 0.64; a[15] = 0.62; a[16] = 0.6; a[17] = 0.58; a[18] = 0.56; a[19] = 0.55; a[20] = 0.54; a[21] = 0.52; a[22] = 0.51; a[23] = 0.51; a[24] = 0.51; a[25] = 0.49; a[26] = 0.48; a[27] = 0.48; a[28] = 0.47; a[29] = 0.47; a[30] = 0.47;
    b[0] = 2.84; b[1] = 2.71; b[2] = 2.53; b[3] = 2.38; b[4] = 2.24; b[5] = 2.11; b[6] = 1.99; b[7] = 1.88; b[8] = 1.79; b[9] = 1.71; b[10] = 1.61; b[11] = 1.54; b[12] = 1.47; b[13] = 1.41; b[14] = 1.35; b[15] = 1.3; b[16] = 1.25; b[17] = 1.21; b[18] = 1.17; b[19] = 1.13; b[20] = 1.11; b[21] = 1.06; b[22] = 1.04; b[23] = 1.01; b[24] = 0.99; b[25] = 0.97; b[26] = 0.95; b[27] = 0.94; b[28] = 0.92; b[29] = 0.91; b[30] = 0.91;
  
    ut = ut.toString(); 
    ut = ut.replace(",", ".");
    ut = parseFloat(ut);
    if (eg < 10 || eg > 40){ return 0; }
    else {
        eg = eg - 10;
        var uno = 0, dos = 0;
        if (ut > 0){
            eg  = parseInt(eg);
            uno = b[eg] - a[eg];
            dos = ut - a[eg];
            var resultado = 90 / (uno) * (dos) + 5;
            if (resultado > 99){
                return '> 99';
            }
            else if (resultado < 1){
                return '< 1';
            }
            else{
                return Math.trunc(resultado);
            }
        }
        else{
            return 0;
        }
    }
}

function pctacmAdvanced(eg,acm) {
    'use strict';
    var a = [], b = [];
    a[0] = 1.24; a[1] = 1.29; a[2] = 1.34; a[3] = 1.37; a[4] = 1.4; a[5] = 1.43; a[6] = 1.44; a[7] = 1.45; a[8] = 1.45; a[9] = 1.44; a[10] = 1.43; a[11] = 1.41; a[12] = 1.38; a[13] = 1.34;	a[14] = 1.3; a[15] = 1.25; a[16] = 1.19; a[17] = 1.13;	a[18] = 1.05; a[19] = 0.98; a[20] = 0.89;
    b[0] = 1.98; b[1] = 2.12; b[2] = 2.25; b[3] = 2.36; b[4] = 2.45; b[5] = 2.53; b[6] = 2.59; b[7] = 2.63; b[8] = 2.66; b[9] = 2.67; b[10] = 2.67;	b[11] = 2.65; b[12] = 2.62; b[13] = 2.56;	b[14] = 2.5; b[15] = 2.41; b[16] = 2.31; b[17] = 2.2; b[18] = 2.07; b[19] = 1.92; b[20] = 1.76;
    
    if (eg < 20 || eg > 40){return 0;}
    else {
        eg = parseInt(eg);
        eg = eg - 20;
        var uno = b[eg] - a[eg];
        var dos = acm - a[eg];
        var resultado = parseInt(90 / (uno) * (dos) + 5);
        if (resultado > 99){
            return '> 99';
        }
        else if (resultado < 1){
            return '< 1';
        }
        else{
            return Math.trunc(resultado);
        }
    }
}

function loadInProcessData(data){
    $("#mensaje\\.resultado").addClass("d-none");
    var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Ciudad</th><th>Edad gestacional</th><th>Motivo de exámen</th><th>Agendada</th><th>Confirmada</th><th>Accion</th></tr></thead><tbody>';
    
    $.each(data, function(i, value) {
        let fecha = value.evaluacion_fecha.split('-');
        fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
        tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_egestacional +'</td><td>' + value.solicitud_diagnostico +'</td><td>'+fecha+'</td><td>'+ value.solicitud_confirmada+'</td>';
        if (value.solicitud_confirmada == 'Si' && a == 3){
            tabla += '<td><button class="btn examen btn-secondary" data-id='+ value.solicitud_id + '>Ir a examen Eco</button></td></tr>';
        }
        if (value.solicitud_confirmada == 'Si' && a == 4){
            tabla += '<td><button class="btn examen btn-secondary" data-id='+ value.solicitud_id + '>Ir a examen Eco</button><button class="btn modificar btn-secondary" data-id='+ value.solicitud_id + '>Modificar solicitud</button></td></tr>';
        }
        else{
            tabla += '<td><button class="btn confirmar btn-secondary" data-id='+ value.solicitud_id + '>Confirmar fecha de eco</button><button class="btn reagendar btn-secondary" data-id='+ value.solicitud_id + '>Reagendar paciente</button></td></tr>';
        }
    });
    tabla += '</tbody>';
    $('#tabla\\.resultado').append(tabla);

    $('#tabla\\.resultado tr > td > button.confirmar').on("click", function(){
        let solicitud_id =  $(this).data("id");
        $("#ver\\.interconsulta\\.titulo").html("Confirmar interconsulta");
        $('#ver\\.interconsulta\\.contenedor').empty().append('<input type="hidden" id="solicitud_id" value=""/><div class="row"> <div class="col-3 form-group"> <label for="interconsulta.para">Fecha</label> <input type="text" disabled class="form-control" id="evaluacion_fecha"> </div><div class="col form-group"> <label for="interconsulta.comentario.respuesta">Comentario</label> <input disabled class="form-control" id="evaluacion_comentarios"/> </div></div>');
        $("#ver\\.interconsulta").modal("show");
        $("#ver\\.interconsulta\\.footer").empty().prepend('<button class="btn btn-primary" id="enviar.respuesta.botton">Confirmar agendamiento</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
        $("#solicitud_id").val(solicitud_id);
        $.get('dashboard/edit/' + solicitud_id).done(function(data){
            $("#evaluacion_fecha").val(data.evaluacion_fecha);
            $("#evaluacion_comentarios").val(data.evaluacion_comentarios);
        });
        $("#enviar\\.respuesta\\.botton").on("click", function(){
            var data = {
                solicitud_id: $("#solicitud_id").val()
            }
            $.post('dashboard/confirmar',data).done(function(response){
                loadInProcess();
                $("#ver\\.interconsulta").modal("hide");
            });
        });
    });

    $('#tabla\\.resultado tr > td > button.reagendar').on("click", function(){
        let solicitud_id =  $(this).data("id");
        $("#ver\\.interconsulta\\.titulo").html("Cambiar fecha de interconsulta");
        $('#ver\\.interconsulta\\.contenedor').empty().append('<input type="hidden" id="solicitud_id" value=""/><div class="row"> <div class="col-3 form-group"> <label for="interconsulta.para">Fecha</label> <input type="date" class="form-control" id="evaluacion_fecha"> </div><div class="col form-group"> <label for="interconsulta.comentario.respuesta">Comentario</label> <input class="form-control" id="evaluacion_comentarios"/> </div></div>');
        $("#ver\\.interconsulta").modal("show");
        $("#ver\\.interconsulta\\.footer").empty().prepend('<button class="btn btn-primary" id="enviar.respuesta.botton">Reagendar</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
        $("#solicitud_id").val(solicitud_id);
        $.get('dashboard/edit/' + solicitud_id).done(function(data){
            $("#evaluacion_fecha").val(data.evaluacion_fecha);
            $("#evaluacion_comentarios").val(data.evaluacion_comentarios);
        });
        $("#enviar\\.respuesta\\.botton").on("click", function(){
            var data = {
                solicitud_id: $("#solicitud_id").val(),
                solicitud_fecha: $("#evaluacion_fecha").val(),
                solicitud_comentarios: $("#evaluacion_comentarios").val()
            }
            $.post('dashboard/reagendar',data).done(function(response){
                loadInProcess();
                $("#ver\\.interconsulta").modal("hide");
            });
        });
    });

    $('#tabla\\.resultado tr > td > button.examen').on("click", function(){
        let solicitud_id =  $(this).data("id");
        $("#ver\\.interconsulta\\.titulo").html("Datos de la interconsulta");
        $('#ver\\.interconsulta\\.contenedor').empty().append('<div class="card-header g-verde" id="headingOne"> <button class="btn btn-link text-white" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Datos de la interconsulta ( Abrir / Cerrar )</button></div><div id="collapseOne" class="collapse border " aria-labelledby="headingOne" data-parent="#ver\\.interconsulta\\.contenedor"> <div class="card-body"> <input type="hidden" id="solicitud_id" value=""/> <div class="row"> <div class="col form-group"> <label>Nombre del paciente:</label> <input type="text" class="form-control" disabled id="solicitud_nombre"> </div><div class="col form-group"> <label>Fecha de solicitud:</label> <input type="text" class="form-control" disabled id="solicitud_fecha"> </div><div class="col form-group"> <label>FUR Referida o corregida</label> <input type="date" class="form-control" disabled id="solicitud_fum"> </div><div class="col form-group"> <label>Edad Gestacional</label> <input type="text" class="form-control" disabled id="solicitud_egestacional"> </div></div><div class="row"> <div class="col form-group"> <label>RUT del paciente:</label> <input type="text" class="form-control" disabled id="solicitud_rut"> </div><div class="col form-group"> <label>Paridad</label> <input type="text" class="form-control" name="respuesta_paridad" disabled> </div><div class="col form-group"> <label>Ciudad de procedencia</label> <input type="text" class="form-control" disabled id="solicitud_ciudad"> </div><div class="col form-group"> <label>Lugar de control habitual</label> <input type="text" class="form-control" disabled id="solicitud_lugar"> </div></div><div class="row"> <div class="col my-2 form-group"> <label>Diagnóstico de referencia a exámen ecográfico</label> <input type="text" class="form-control" disabled id="solicitud_diagnostico"> </div><div class="col my-2 form-group"> <label>Otros antecedentes clínicos relevantes</label> <input type="text" class="form-control" name="respuesta_antecedentes" disabled> </div></div></div></div>');
        if (a == 3){
            $("#ver\\.interconsulta\\.contenedor").append('<h5 class="my-3">Respuesta inicial a solicitud de exámen ecográfico</h5><div class="row"> <div class="col-3 form-group" id="jaja.papapa"> <label for="interconsulta.para">Fecha agendamiento exámen</label> <input type="text" disabled class="form-control bg-secondary text-white" id="evaluacion_fecha"> </div><div class="col form-group"> <label for="interconsulta.comentario.respuesta">Comentarios de unidad de contrarreferencia</label> <input disabled class="form-control bg-secondary text-white" id="evaluacion_comentarios"/> </div></div>');
        }
        $("#ver\\.interconsulta\\.contenedor").append('<h4 class="py-3 text-center bg-secondary mb-0 text-white">Responder solicitud de interconsulta ecográfica</h4><div class="row bg-secondary m-0"> <div class="col form-group mb-0 pb-2 btn-animado"> <label class="text-white"><strong>SELECCIONE TIPO EXÁMEN</strong></label> <select class="form-control" name="solicitud_crecimiento" id="interconsulta.respuesta.crecimiento"> <option value="3">1.- Ecografía Ginecológica</option> <option value="1">2.- Ecografía precoz de urgencia</option> <option value="4">3.- Ecografía 11 / 14 semanas</option> <option value="2">4.- Ecografía 2° / 3° trimestre</option> <option value="0" selected>5.- Doppler + Eco. crecimiento</option> </select> </div><div class="col form-group mb-0"> <label class="text-white">FUM Referida o corregida</label> <input type="date" class="form-control g-verde text-white" id="interconsulta.respuesta.fur.copia" disabled> </div><div class="col form-group mb-0"> <label for="interconsulta.respuesta.fecha" class="text-white">Señalar fecha de examen</label> <input type="date" class="form-control g-verde text-white" id="interconsulta.respuesta.fecha"> </div><div class="col form-group mb-0" id="interconsulta.respuesta.edadgestacional"> <label for="interconsulta.respuesta.eg" class="text-white">Edad gestacional actual</label> <input type="hidden" class="form-control" id="interconsulta.fum.copia" value="solicitud_fum"> <input type="text" class="form-control g-verde text-white" id="interconsulta.respuesta.eg" disabled=""> <input type="hidden" class="form-control" name="respuesta_eg"> </div></div><div id="contenedor.examenes"></div>');
        $("#ver\\.interconsulta\\.contenedor").append('<div id="final" class="mt-3"> <div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen" class="text-primary"><strong>D.- Comentarios y observaciones</strong> (Interpretación clínica)</label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div><div class="col-6 form-group"> <label for="interconsulta.respuesta.ecografista"><strong>Ecografista</strong></label> <input type="text" class="form-control" id="respuesta_ecografista"> </div></div></div>');

        $('#interconsulta\\.respuesta\\.fecha').on('change', function () {
            let EG = calcularEdadGestacional("interconsulta.fum.copia", "interconsulta.respuesta.fecha");
            let examen = document.getElementById("interconsulta.respuesta.crecimiento").value;

            if (examen == 3){
                document.getElementById("interconsulta.respuesta.eg").value = (EG.semanas *7)+ EG.dias;
                $("input[name='respuesta_eg']").val((EG.semanas *7)+ EG.dias);
                var eg = (EG.semanas *7)+ EG.dias;
                var txt = "";
                if (eg < 36){
                    txt = "Días del ciclo mestrual";
                }else if (eg < 86){
                    txt = "Días de atraso mestrual";
                }else{
                    txt = "Días de amenorrea";
                }
                $("#interconsulta\\.respuesta\\.eg").parent().children("label").html(txt);
            }else{
                document.getElementById("interconsulta.respuesta.eg").value = EG.text;
                $("input[name='respuesta_eg']").val(EG.text);
            }
            
        });

        $("#ver\\.interconsulta\\.footer").empty().prepend('<button class="btn btn-primary text-white" id="enviar.respuesta.botton">Enviar respuesta</button><button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar" data-id="'+solicitud_id+'">Eliminar solicitud</button><button type="button" class="btn btn-secondary" id="ver.interconsulta.cerrar" data-dismiss="modal">Cerrar</button>');
        $("#ver\\.interconsulta\\.eliminar").on("click", function(){
            let solicitud_id =  $(this).data("id");
            $.get("dashboard/delete/" + solicitud_id).done(function(){
                loadInProcess();
            });
            $("#ver\\.interconsulta").modal("hide");
        });
        $("#enviar\\.respuesta\\.botton").on("click", function(){
            var tipoExm = $('#interconsulta\\.respuesta\\.crecimiento').val();
            $('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Enviando Datos</h5></div><div class="modal-body"><img src="https://crecimientofetal.cl/img/emoji.png" class="d-block mx-auto imng-fluid"><h3 class="text-danger text-center">ESTAMOS ENVIANDO SU RESPUESTA</H3></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
            $('#mensaje\\.dialogo').modal("show");
            $('#mensaje\\.dialogo').on('hidden.bs.modal', function (e) {
                $('#mensaje\\.dialogo').modal("hide");
                $(this).remove();
            });

            var args = {
                solicitud_id: $("#solicitud_id").val(),
                solicitud_crecimiento: $("#interconsulta\\.respuesta\\.crecimiento option:selected").val(),
                respuesta_fecha: $("#interconsulta\\.respuesta\\.fecha").val(),
                respuesta_eg: $('input[name="respuesta_eg"]').val(),
                respuesta_comentariosexamen: $('#editable').val(),
                respuesta_ecografista: $("#respuesta_ecografista").val()
            }

            if (tipoExm == 4){
                args.respuesta_anatomia = $('select[name="respuesta_anatomia"]').val(),
                args.respuesta_anatomia_extra = $('input[name="respuesta_anatomia_extra"]').val(),
                args.respuesta_embrion = $('select[name="respuesta_embrion"]').val(),
                args.respuesta_lcn = $('input[name="respuesta_lcn"]').val(),
                args.respuesta_lcn_eg = $('input[name="respuesta_lcn_eg"]').val(),
                args.respuesta_fcf = $('select[name="respuesta_fcf"]').val(),
                args.respuesta_cc = $('select[name="respuesta_hueso_nasal"]').val(),
                args.respuesta_ca = $('select[name="respuesta_ca"]').val(),
                args.respuesta_lf = $('select[name="respuesta_lf"]').val(),
                args.respuesta_dbp = $('select[name="respuesta_dbp"]').val(),
                args.respuesta_translucencia_nucal = $('input[name="respuesta_translucencia_nucal"]').val(),
                args.respuesta_hueso_nasal_valor = $('input[name="respuesta_hueso_nasal_valor"]').val(),
                args.respuesta_uterina_derecha = $('input[name="respuesta_uterina_derecha"]').val(),
                args.respuesta_uterina_derecha_percentil = $('input[name="respuesta_uterina_derecha_percentil"]').val(),
                args.respuesta_uterina_izquierda = $('input[name="respuesta_uterina_izquierda"]').val(),
                args.respuesta_uterina_izquierda_percentil = $('input[name="respuesta_uterina_izquierda_percentil"]').val(),
                args.respuesta_uterinas = $('input[name="respuesta_uterinas"]').val(),
                args.respuesta_uterinas_percentil = $('input[name="respuesta_uterinas_promedio"]').val()
            }
            else if (tipoExm == 3){
                args.respuesta_utero_ginecologica = $('input[name="respuesta_utero_ginecologica"]').val(),
                args.respuesta_anexo_izquierdo_ginecologica = $('input[name="respuesta_anexo_izquierdo_ginecologica"]').val(),
                args.respuesta_anexo_derecho_ginecologica = $('input[name="respuesta_anexo_derecho_ginecologica"]').val(),
                args.respuesta_ovario_izquierdo = $('input[name="respuesta_ovario_izquierdo"]').val(),
                args.respuesta_ovario_derecho = $('input[name="respuesta_ovario_derecho"]').val(),
                args.respuesta_douglas_ginecologica = $('input[name="respuesta_douglas_ginecologica"]').val(),
                args.respuesta_endometrio = $('input[name="respuesta_endometrio"]').val()
            }
            else if (tipoExm == 2){
                args.respuesta_placenta = $('select[name="respuesta_placenta"]').val(),
                args.respuesta_placenta_insercion = $('select[name="respuesta_placenta_insercion"]').val(),
                args.respuesta_liquido_amniotico = $('select[name="respuesta_liquido_amniotico"] option:selected').val(),
                args.respuesta_dbp = $('input[name="respuesta_dbp"]').val(),
                args.respuesta_cc = $('input[name="respuesta_cc"]').val(),
                args.respuesta_cc_pct = $('#respuesta_cc_pct').html(),
                args.respuesta_ca = $('input[name="respuesta_ca"]').val(),
                args.respuesta_ca_pct = $('#respuesta_ca_pct').html(),
                args.respuesta_lf = $('input[name="respuesta_lf"]').val(),
                args.respuesta_lf_pct = $('#respuesta_lf_pct').html(),
                args.respuesta_pfe = $('input[name="respuesta_pfe"]').val(),
                args.respuesta_ccca = $('input[name="respuesta_ccca"]').val(),
                args.respuesta_presentacion = $('select[name="respuesta_presentacion"]').val(),
                args.respuesta_dorso_segundo = $('select[name="respuesta_dorso_segundo"]').val(),
                args.respuesta_anatomia = $('select[name="respuesta_anatomia"]').val(),
                args.respuesta_anatomia_extra = $('input[name="respuesta_anatomia_extra"]').val(),
                args.respuesta_pfe_pct = $('input[name="respuesta_pfe_pct"]').val(),
                args.respuesta_ccca_pct = $('#respuesta_ccca_pct').html(),
                args.respuesta_dof = $('input[name="respuesta_dof"]').val(),
                args.respuesta_ic = $('input[name="respuesta_ic"]').val(),
                args.respuesta_bvm = $('select[name="respuesta_bvm"]').val(),
                args.respuesta_lh = $('input[name="respuesta_lh"]').val(),
                args.respuesta_lh_pct = $('#respuesta_lh_pct').html(),
                args.respuesta_cerebelo = $('input[name="respuesta_cerebelo"]').val(),
                args.respuesta_cerebelo_pct = $('#respuesta_cerebelo_pct').html(),
                args.respuesta_sexo_fetal = $('select[name="respuesta_sexo_fetal"]').val(),
                args.respuesta_fcf = $('select[name="respuesta_fcf"]').val()

                args.respuesta_lf_pct = args.respuesta_lf_pct.replace("Pct. ", "");
                args.respuesta_cc_pct = args.respuesta_cc_pct.replace("Pct. ", "");
                args.respuesta_ca_pct = args.respuesta_ca_pct.replace("Pct. ", "");
                args.respuesta_ccca_pct = args.respuesta_ccca_pct.replace("Pct. ", "");
                args.respuesta_lh_pct = args.respuesta_lh_pct.replace("Pct. ", "");
                args.respuesta_cerebelo_pct = args.respuesta_cerebelo_pct.replace("Pct. ", "");
            }
            else if (tipoExm == 1){
                args.respuesta_utero_primertrimestre = $('select[name="respuesta_utero_primertrimestre"]').val(),
                args.respuesta_saco_gestacional = $('select[name="respuesta_saco_gestacional"]').val(),
                args.respuesta_saco  = $('input[name="respuesta_saco"]').val(),
                args.respuesta_embrion = $('select[name="respuesta_embrion"]').val(),
                args.respuesta_lcn = $('input[name="respuesta_lcn"]').val(),
                args.respuesta_lcn_eg = $('input[name="respuesta_lcn_eg"]').val(),
                args.respuesta_anexo_izquierdo_primertrimestre = $('select[name="respuesta_anexo_izquierdo_primertrimestre"]').val(),
                args.respuesta_anexo_derecho_primertrimestre = $('select[name="respuesta_anexo_derecho_primertrimestre"]').val(),
                args.respuesta_douglas_primertrimestre = $('select[name="respuesta_douglas_primertrimestre"]').val()
            }
            else{
                args.respuesta_pfe = $('input[name="respuesta_pfe"]').val(),
                args.respuesta_pfe_pct = $('input[name="respuesta_pfe_pct"]').val(),
                args.respuesta_liquido = $('select[name="respuesta_liquido"] option:selected').val(),
                args.respuesta_presentacion = $('select[name="respuesta_presentacion"]').val(),
                args.respuesta_dorso = $('select[name="respuesta_dorso"] option:selected').val(),
                args.respuesta_placenta = $('select[name="respuesta_placenta"]').val(),
                args.respuesta_placenta_insercion = $('select[name="respuesta_placenta_insercion"]').val(),
                args.respuesta_uterina_derecha = $('input[name="respuesta_uterina_derecha"]').val(),
                args.respuesta_uterina_derecha_percentil = $('#respuesta_uterina_derecha_percentil').html(),
                args.respuesta_uterina_izquierda = $('input[name="respuesta_uterina_izquierda"]').val(),
                args.respuesta_uterina_izquierda_percentil = $('#respuesta_uterina_izquierda_percentil').html(),
                args.respuesta_uterinas = $('input[name="respuesta_uterinas"]').val(),
                args.respuesta_uterinas_percentil = $('#respuesta_uterinas_percentil').html(),
                args.respuesta_umbilical = $('input[name="respuesta_umbilical"]').val(),
                args.respuesta_umbilical_percentil = $('#respuesta_umbilical_percentil').html(),
                args.respuesta_cm = $('input[name="respuesta_cm"]').val(),
                args.respuesta_cm_percentil = $('#respuesta_cm_percentil').html(),
                args.respuesta_cmau = $('input[name="respuesta_cmau"]').val(),
                args.respuesta_cmau_percentil = $('#respuesta_cmau_percentil').html(),
                args.respuesta_hipotesis = $('select[name="respuesta_hipotesis"]').val(),
                args.respuesta_doppler_materno = $('select[name="respuesta_doppler_materno"]').val(),
                args.respuesta_doppler_fetal =  $('select[name="respuesta_doppler_fetal"]').val(),
                args.respuesta_anatomia =  $('select[name="respuesta_anatomia"]').val(),
                args.respuesta_anatomia_extra = $('input[name="respuesta_anatomia_extra"]').val(),
                args.respuesta_dbp = $('input[name="respuesta_dbp"]').val(),
                args.respuesta_cc = $('input[name="respuesta_cc"]').val(),
                args.respuesta_cc_pct = $('#respuesta_cc_pct').html(),
                args.respuesta_ca = $('input[name="respuesta_ca"]').val(),
                args.respuesta_ca_pct = $('#respuesta_ca_pct').html(),
                args.respuesta_lf = $('input[name="respuesta_lf"]').val(),
                args.respuesta_lf_pct = $('#respuesta_lf_pct').html(),
                args.respuesta_bvm = $('select[name="respuesta_bvm"]').val(),
                args.respuesta_ccca = $('input[name="respuesta_ccca"]').val(),
                args.respuesta_ccca_pct = $('input[name="respuesta_ccca_pct"]').val(),
                args.respuesta_sexo_fetal = $('select[name="respuesta_sexo_fetal"]').val(),
                args.respuesta_dof = $('select[name="respuesta_dof"]').val(),
                args.respuesta_fcf = $('select[name="respuesta_fcf"]').val()
 
                args.respuesta_uterina_derecha_percentil = args.respuesta_uterina_derecha_percentil.replace("Pct. ", "");
                args.respuesta_uterina_izquierda_percentil = args.respuesta_uterina_izquierda_percentil.replace("Pct. ", "");
                args.respuesta_ccca_pct = args.respuesta_ccca_pct.replace("Pct. ", "");
                args.respuesta_ca_pct = args.respuesta_ca_pct.replace("Pct. ", "");
                args.respuesta_cc_pct = args.respuesta_cc_pct.replace("Pct. ", "");
                args.respuesta_lf_pct = args.respuesta_lf_pct.replace("Pct. ", "");
                args.respuesta_umbilical_percentil = args.respuesta_umbilical_percentil.replace("Pct. ", "");
                args.respuesta_cm_percentil = args.respuesta_cm_percentil.replace("Pct. ", "");
            }
            $("#ver\\.interconsulta").modal("hide");
            $.post('dashboard/save', args).done(function(data){
                $("#interconsultas\\.estado\\.finalizadas").button('toggle').trigger("click");
                $('#mensaje\\.dialogo').modal("hide").remove();
            });
        });
    
        $.get('dashboard/agendar/' + solicitud_id).done(function(data){
            document.getElementById("solicitud_id").value = data.solicitud_id;
            document.getElementById("solicitud_nombre").value = data.solicitud_nombre;
            document.getElementById("solicitud_rut").value = data.solicitud_rut;
            document.getElementById("solicitud_fecha").value = data.solicitud_fecha;
            document.getElementById("solicitud_fum").value = data.solicitud_fum;
            document.getElementById("interconsulta.respuesta.fur.copia").value = data.solicitud_fum;
            document.getElementById("interconsulta.fum.copia").value = data.solicitud_fum;
            document.getElementById("solicitud_egestacional").value = data.solicitud_egestacional;
            document.getElementById("solicitud_diagnostico").value = data.solicitud_diagnostico;
            document.getElementById("solicitud_ciudad").value = data.solicitud_ciudad;
            document.getElementById("solicitud_lugar").value = data.solicitud_lugar;
            document.getElementById("interconsulta.respuesta.fecha").value = setInputDate();
            var nombreprofesionalPegar = data.solicitud_nombre_referente;
            document.getElementById("respuesta_ecografista").value = nombreprofesionalPegar;
            $("#interconsulta\\.respuesta\\.fecha").trigger("change");
            $("input[name='respuesta_paridad']").val(data.solicitud_paridad);
            $("input[name='respuesta_antecedentes']").val(data.solicitud_antecedentes);
            $('#interconsulta\\.respuesta\\.crecimiento').data("em",data.solicitud_ematerna).data("pm",data.solicitud_media).data("imc",data.solicitud_imc).trigger("change");
        });

        if (a == 3){
            $.get('dashboard/edit/' + solicitud_id).done(function(data){
                $("#evaluacion_fecha").val(data.evaluacion_fecha);
                $("#evaluacion_comentarios").val(data.evaluacion_comentarios);
            });
        }
    
        $('#interconsulta\\.respuesta\\.crecimiento').on("change", function(){
            if ($(this).val() == 4){
                doppleruterinas();
            }
            else if ($(this).val() == 3){
                ginecologica();
            }
            else if ($(this).val() == 2){
                segundoTrimestre();
            }
            else if ($(this).val() == 1){
                primerTrimerstre();
            }
            else{
                multiproposito();
            }

            $('#interconsulta\\.respuesta\\.fecha').trigger("change");
            if ($(this).val() == 3){
                $("#enviar\\.respuesta\\.botton").addClass("d-none");
                $("#ver\\.interconsulta\\.eliminar").addClass("d-none");
                $("#ver\\.interconsulta\\.cerrar").addClass("d-none");
                var eg = document.getElementById("interconsulta.respuesta.eg").value;
                var txt = "";
                if (eg < 36){
                    txt = "Días del ciclo mestrual";
                }else if (eg < 86){
                    txt = "Días de atraso mestrual";
                }else{
                    txt = "Días de amenorrea";
                }
                $("#interconsulta\\.respuesta\\.eg").parent().children("label").html(txt);
            }else {
                $("#enviar\\.respuesta\\.botton").removeClass("d-none");
                $("#ver\\.interconsulta\\.eliminar").removeClass("d-none");
                $("#ver\\.interconsulta\\.cerrar").removeClass("d-none");
                $("#interconsulta\\.respuesta\\.eg").parent().children("label").html('Edad gestacional actual');
            }
        });
    
        $("#ver\\.interconsulta").modal("show");
    });

    $('#tabla\\.resultado tr > td > button.modificar').on("click", function(){
        let solicitud_id =  $(this).data("id");
        $.get('dashboard/agendar/' + solicitud_id).done(function(data){solicitudModal(data);});
    });
}