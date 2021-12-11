$("document").ready(() => {

        /* Estructura de la clase */
class Personaje{
    constructor(nombre, ataque, defensa, salud){    //Constructor
        this.nombre = nombre;
        this.ataque = ataque;
        this.defensa = defensa;
        this.salud = salud;
        this.experiencia = 0;
        this.nivel = 1;
        this.inventario = [];

        localStorage.setItem('nombre', this.nombre);
        localStorage.setItem('ataque', this.ataque);
        localStorage.setItem('defensa', this.defensa);
        localStorage.setItem('salud', this.salud);
        localStorage.setItem('experiencia', this.experiencia);
        localStorage.setItem('nivel', this.nivel);
        localStorage.setItem('inventario', JSON.stringify(this.inventario));
    }

    atacar() {    //Primer método   
        /* let ultimoCombate = document.getElementById('combate-log');
        if (ultimoCombate != null) {
            ultimoCombate.parentNode.removeChild(ultimoCombate);
        } */

        this.nivel = parseInt(localStorage.getItem('nivel'));
        this.ataque = parseInt(localStorage.getItem('ataque'));
        this.defensa = parseInt(localStorage.getItem('ataque'));
        this.salud = parseInt(localStorage.getItem('salud'));
        
        let dañoMaximo = this.ataque + 20;
        let dañoMinimo = this.ataque - 20;
        let ataqueEnemigo = Math.floor(Math.random() * (dañoMaximo - dañoMinimo)) + dañoMinimo;

        $("#botones-control").append(`<div id="combate-log" style="display: none"><h3>Combate actual:\n</h3>
        <div>Tu ataque: ${this.ataque}\n</div>
        <div>Ataque enemigo: ${ataqueEnemigo}\n</div></div>`);
        $("#combate-log").slideDown(250);
        
        if(this.ataque>ataqueEnemigo){
            this.experiencia = parseInt(localStorage.getItem('experiencia'));
            this.experiencia += 30;
            localStorage.setItem('experiencia', this.experiencia);
            
            $("#botones-control").append(`<div id="div-victoria" style="display: none">Ganaste el combate! Experiencia +30</div>`);
            $("#div-victoria").slideDown(250);
            
            if (this.experiencia>=50) {
                this.nivel += 1;
                this.ataque += 5;
                this.defensa += 5;
                this.salud += 5;
                this.experiencia = 0;
                localStorage.setItem('nivel', this.nivel);
                localStorage.setItem('ataque', this.ataque);
                localStorage.setItem('defensa', this.defensa);
                localStorage.setItem('salud', this.salud);
                localStorage.setItem('experiencia', this.experiencia);

                $("#botones-control").append(`<div id="subida-nivel" style="display: none">Subiste de nivel!\nNivel +1\nAtaque +5\nDefensa +5\nSalud +5</div>`);
                $("#subida-nivel").slideDown(250);
            }
        }else{
            let dañoSalud = ataqueEnemigo-this.defensa;
            localStorage.setItem('dañoSalud', dañoSalud);
            
            if(dañoSalud>=0){
                this.salud -= dañoSalud;
                localStorage.setItem('salud', this.salud);
            }else{
                this.salud -= dañoSalud*(-1);
                localStorage.setItem('salud', this.salud);
            }

            $("#botones-control").append(`<div id="div-derrota" style="display: none">No ganaste el combate!\nRecibiste ${dañoSalud} de daño\nTu salud restante es: ${this.salud}</div>`);
            $("#div-derrota").slideDown(250);
        }   
    }

    expUp() {   //Segundo método
        this.experiencia = parseInt(localStorage.getItem('experiencia'));
        this.nivel = parseInt(localStorage.getItem('nivel'));
        this.ataque = parseInt(localStorage.getItem('ataque'));
        this.defensa = parseInt(localStorage.getItem('ataque'));
        this.salud = parseInt(localStorage.getItem('salud'));
        this.experiencia += 10;
        localStorage.setItem('experiencia', this.experiencia);

        $("#botones-control").append(`<div id="div-experiencia" style="display: none">Entrenaste! Experiencia +10</div>`);
        $("#div-experiencia").slideDown(250).delay(1000).slideUp(250);;

        if (this.experiencia>=50) {
            this.nivel += 1;
            this.ataque += 5;
            this.defensa += 5;
            this.salud += 5;
            this.experiencia = 0;
            localStorage.setItem('nivel', this.nivel);
            localStorage.setItem('ataque', this.ataque);
            localStorage.setItem('defensa', this.defensa);
            localStorage.setItem('salud', this.salud);
            localStorage.setItem('experiencia', this.experiencia);

            $("#botones-control").append(`<div id="subida-nivel" style="display: none">Subiste de nivel!\n*Nivel +1\n*Ataque +5\n*Defensa +5\n*Salud +5</div>`);
            $("#subida-nivel").slideDown(250);
        }        
    }

    explorar() {    //Tercer método
        let items_array = ['Pocion de vida', 'Pocion de mana', 'Pechera', 'Botas', 'Casco', 'Trofeo', 'Espada', 'Hacha', 'Arco', 'Reliquia'];
        let item_index = Math.floor(Math.random() * items_array.length);
        
        console.log(this.inventario);

        if ($("#item-encontrado") != null) {
            $("#item-encontrado").remove();
        }
        if ($("#inventario-lleno") != null) {
            $("#inventario-lleno").remove();
        }
        if (this.inventario.length>=6) {
            $("#inventario").append(`<div id="inventario-lleno" style="display: none">Tu inventario esta lleno!</div>`);
            $("#inventario-lleno").slideDown(250);

        }else{
            this.inventario.push(items_array[item_index]);
            localStorage.setItem('inventario', this.inventario);

            $("#lista-inventario").append(`<li style="display: none">${this.inventario[this.inventario.length-1]}`);
            $("#lista-inventario li").slideDown(250);
        }
        console.log(this.inventario);

        $("#inventario").append(`<div id="item-encontrado" style="display: none">Encontraste un item, tenes ${this.inventario.length} items</div>`);
        $("#item-encontrado").slideDown(250).delay(1000).slideUp(250);
    }    
}
function reset(){
    localStorage.clear();
    limpiarLog();

    $("#final-partida").remove();

    $("#stats-inicio").show();
}

function borrarCombate() {
    if ($("#combate-log") != null) {
        $("#combate-log").remove();
    }    
    if ($("#div-victoria") != null) {
        $("#div-victoria").remove();
    }    
    if ($("#div-derrota") != null) {
        $("#div-derrota").remove();
    }
}

function borrarExp() {
    if ($("#subida-nivel") != null) {
        $("#subida-nivel").remove();
    }    
    if ($("#div-experiencia") != null) {
        $("#div-experiencia").remove();
    }
}

function limpiarLog() {
    $("#personaje").remove();
    $("#inventario").remove();
    $("#botones-control").remove();
    borrarCombate();
    borrarExp(); 
}

function actualizarStats() {
    $("#personaje").remove();

    $("#marco").append(`<div id="personaje"><h2>Tu personaje:  </h2>
    <ul id="char_info">
    <li>Nombre: ${localStorage.getItem('nombre')}</li>
    <li>Nivel: ${localStorage.getItem('nivel')}</li>
    <li>Experiencia: ${localStorage.getItem('experiencia')}</li>
    <li>Ataque: ${localStorage.getItem('ataque')}</li>
    <li>Defensa: ${localStorage.getItem('defensa')}</li>
    <li>Salud: ${localStorage.getItem('salud')}</li>
    </ul></div>`);
}

/* Inicio de lo que se imprime en pantalla */
$('#stats-inicio').submit(function(e){
    /* e.preventDefault(); */
    let nombre = $("#nombre").val();
    let ataque = $("#ataque").val();
    let defensa = $("#defensa").val();
    let salud = $("#salud").val();
    let personaje = new Personaje(nombre, ataque, defensa, salud);    
    console.log(typeof(personaje));
    localStorage.setItem('personaje', JSON.stringify(personaje));
    
    /* $("#stats-inicio").hide(); */
});

$('body').append(`<div id="marco"></div>`);

let personaje_creado = JSON.parse(localStorage.getItem('personaje'));
let personaje2 = new Personaje (personaje_creado.nombre, personaje_creado.ataque, personaje_creado.defensa, personaje_creado.salud);
console.log(personaje2);
console.log(typeof(personaje_creado));
console.log((personaje_creado));


if ($("#marco") != null) {
    $("#marco").append(`<div id="personaje"><h2>Tu personaje:  </h2>     
    <ul id="char_info">
    <li>Nombre: ${localStorage.getItem('nombre')}</li>
    <li>Nivel: ${localStorage.getItem('nivel')}</li>
    <li>Experiencia: ${localStorage.getItem('experiencia')}</li>
    <li>Ataque: ${localStorage.getItem('ataque')}</li>
    <li>Defensa: ${localStorage.getItem('defensa')}</li>
    <li>Salud: ${localStorage.getItem('salud')}</li>
    </ul></div>`);

    
    $("#marco").append(`<div id="inventario"><h2>Inventario: </h2>
    <ul id=lista-inventario></ul></div>`);      //CON JQUERY   
    
    $("#marco").prepend(`<div id="botones-control"><div id="botones"><button type="button" id="combatir" class="btn btn-primary">Combatir</button>
    <button type="button" id="entrenar" class="btn btn-primary">Entrenar</button>
    <button type="button" id="explorar" class="btn btn-primary">Explorar</button></div></div>`);    
    
    actualizarStats();
}



/*     if ($("personaje") != null && personaje2 != null) {
        $('body').append(`<div id="personaje"><h2>Tu personaje:  </h2>
        <ul id="char_info">
        <li>Nombre: ${localStorage.getItem('nombre')}</li>
        <li>Nivel: ${localStorage.getItem('nivel')}</li>
        <li>Experiencia: ${localStorage.getItem('experiencia')}</li>
        <li>Ataque: ${localStorage.getItem('ataque')}</li>
        <li>Defensa: ${localStorage.getItem('defensa')}</li>
        <li>Salud: ${localStorage.getItem('salud')}</li>
        </ul></div>`);
    } */


/* if ($("#personaje") != null) {
    $("body").append(`<div id="botones-control"><button type="button" id="combatir" class="btn btn-primary">Combatir</button>
    <button type="button" id="entrenar" class="btn btn-primary">Entrenar</button>
    <button type="button" id="explorar" class="btn btn-primary">Explorar</button></div>`);      //CON JQUERY
} */

/* $("body").append(`<div id="personaje"><h2>Tu personaje:  </h2>     
<ul id="char_info">
<li>Nombre: ${localStorage.getItem('nombre')}</li>
<li>Nivel: ${localStorage.getItem('nivel')}</li>
<li>Experiencia: ${localStorage.getItem('experiencia')}</li>
<li>Ataque: ${localStorage.getItem('ataque')}</li>
<li>Defensa: ${localStorage.getItem('defensa')}</li>
<li>Salud: ${localStorage.getItem('salud')}</li>
</ul></div>`); */      //CON JQUERY


/* Eventos */
$("#combatir").click(function (event) {
    /* preventDefault(); */
    borrarCombate();
    borrarExp();
    personaje2.atacar();
    console.log(personaje2);
    let saludActual = parseInt(localStorage.getItem('salud'));
    actualizarStats();

    if (saludActual <= 0) {
        if ($("#div-experiencia") != null) {
            $("#div-experiencia").remove();
        }
        limpiarLog();
        $("body").append(`<h2 id="final-partida" style="display: none">${localStorage.getItem('nombre')} se debilito! Se acabo la aventura</h2>`);
        $("#final-partida").fadeIn("slow");
    }
})

$("#entrenar").click(function (event) {
    /* preventDefault(); */
    borrarExp();
    borrarCombate();
    personaje2.expUp()
    console.log(personaje2);
    actualizarStats();
})

$("#explorar").click(function (event) {
    /* preventDefault(); */
    borrarCombate();
    borrarExp();
    personaje2.explorar()
    console.log(personaje2);
    actualizarStats();
})

$("#reset").click(() => {reset()});

/* Validar input */
/* let ataque = null;
while ( !(Number.isInteger(ataque)) || ((ataque<39)||(ataque>100)) || (ataque=="")) {ataque = Number(prompt("Con cuanto ataque queres comenzar? (40-100)"));}
let defensa = null;
while ( !(Number.isInteger(defensa)) || ((defensa<39)||(defensa>100)) || (defensa=="")) {defensa = Number(prompt("Con cuanta defensa queres comenzar? (40-100)"));}
let salud = null;
while ( !(Number.isInteger(salud)) || ((salud<39)||(salud>100)) || (salud=="")) {salud = Number(prompt("Con cuanta salud queres comenzar? (40-100)"));} */


})