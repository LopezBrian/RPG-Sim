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
        this.contador_enemigo = 0;

        localStorage.setItem('nombre', this.nombre);
        localStorage.setItem('ataque', this.ataque);
        localStorage.setItem('defensa', this.defensa);
        localStorage.setItem('salud', this.salud);
        localStorage.setItem('experiencia', this.experiencia);
        localStorage.setItem('nivel', this.nivel);
        localStorage.setItem('inventario', JSON.stringify(this.inventario));
        localStorage.setItem('contador', this.contador_enemigo);        
    }

    atacar() {    //Primer método
        $("#boss").slideUp(250);

        this.nivel = parseInt(localStorage.getItem('nivel'));
        this.ataque = parseInt(localStorage.getItem('ataque'));
        this.defensa = parseInt(localStorage.getItem('defensa'));
        this.salud = parseInt(localStorage.getItem('salud'));
        this.contador_enemigo = parseInt(localStorage.getItem('contador'));
        
        let dañoMaximo = this.ataque + 20;
        let dañoMinimo = this.ataque - 20;
        let ataqueEnemigo = Math.floor(Math.random() * (dañoMaximo - dañoMinimo)) + dañoMinimo;
        this.contador_enemigo += 1;

        /* ----------JEFES---------- */
        if (this.contador_enemigo > 9) {
            $("#botones-control").append(`<div id="boss"><h4>JEFE</h4></div>`)
            ataqueEnemigo += 10;            
        }        
        localStorage.setItem('contador', this.contador_enemigo);

        $("#botones-control").append(`<div id="combate-log" style="display: none"><h3>Combate actual:\n</h3>
        <div>Tu ataque: ${this.ataque}\n</div>
        <div>Ataque enemigo: ${ataqueEnemigo}\n</div></div>`);
        $("#combate-log").slideDown(250);        
        /* ----------VICTORIA---------- */
        if (this.ataque>ataqueEnemigo) {
            this.experiencia = parseInt(localStorage.getItem('experiencia'));
            if (this.contador_enemigo>9) {     //----------VICTORIA VS JEFE----------
                this.experiencia += 60;
                this.contador_enemigo = 0;
                $("#botones-control").append(`<div id="div-victoria" style="display: none">Ganaste el combate! Experiencia +60</div>`);
                $("#div-victoria").slideDown(250);
            } else {
                this.experiencia += 30;
                $("#botones-control").append(`<div id="div-victoria" style="display: none">Ganaste el combate! Experiencia +30</div>`);
                $("#div-victoria").slideDown(250);
            }
            localStorage.setItem('experiencia', this.experiencia);
            
            if (this.experiencia>=80) {     //----------SUBIDA DE NIVEL----------
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
        } else {     //DERROTA
            if (this.contador_enemigo>9) {this.contador_enemigo = 0}
            let dañoSalud = ataqueEnemigo-this.defensa;
            localStorage.setItem('dañoSalud', dañoSalud);
            if (dañoSalud>=0) {
                this.salud -= dañoSalud;
                localStorage.setItem('salud', this.salud);
            } else {
                this.salud -= dañoSalud*(-1);
                localStorage.setItem('salud', this.salud);
            }
            $("#botones-control").append(`<div id="div-derrota" style="display: none">No ganaste el combate!\nRecibiste ${dañoSalud} de daño\nTu salud restante es: ${this.salud}</div>`);
            $("#div-derrota").slideDown(250);
        }
        localStorage.setItem('contador', this.contador_enemigo);
    }

    expUp() {   //Segundo método
        this.experiencia = parseInt(localStorage.getItem('experiencia'));
        this.nivel = parseInt(localStorage.getItem('nivel'));
        this.ataque = parseInt(localStorage.getItem('ataque'));
        this.defensa = parseInt(localStorage.getItem('defensa'));
        this.salud = parseInt(localStorage.getItem('salud'));
        this.experiencia += 10;
        localStorage.setItem('experiencia', this.experiencia);
        $("#botones-control").append(`<div id="div-experiencia" style="display: none">Entrenaste! Experiencia +10</div>`);
        $("#div-experiencia").slideDown(250).delay(1000).slideUp(250);;

        if (this.experiencia>=80) {     //----------SUBIDA DE NIVEL----------
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

        this.inventario = JSON.parse(localStorage.getItem('inventario'));
        
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
            let indexVacio = localStorage.getItem('itemIndex');
            console.log(indexVacio);
            console.log(this.inventario);
            if (indexVacio == null){
                this.inventario.push(items_array[item_index]);
                localStorage.setItem('inventario', JSON.stringify(this.inventario));
                console.log(this.inventario);
                $("#lista-inventario").append(`<li id="item${this.inventario.length-1}" style="display: none">${this.inventario.length} - ${this.inventario[this.inventario.length-1]}`);
            }else{
                indexVacio = parseInt(indexVacio);
                this.inventario.splice(indexVacio - 1, 0, items_array[item_index]);
                localStorage.setItem('inventario', JSON.stringify(this.inventario));
                console.log(this.inventario);
                $("#lista-inventario").append(`<li id="item${indexVacio-1}" style="display: none">${indexVacio} - ${this.inventario[indexVacio-1]}`);
                localStorage.removeItem('itemIndex');
            }
            $("#lista-inventario li").slideDown(250);
        }
        $("#inventario").append(`<div id="item-encontrado" style="display: none">Encontraste un item, tenes ${this.inventario.length} items</div>`);
        $("#item-encontrado").slideDown(250).delay(1000).slideUp(250);
    }    
}
function reset() {
    localStorage.clear();
    limpiarLog();
    $("#final-partida").remove();
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

function validar(nombre, ataque, defensa, salud) {
    if(nombre.length == 0){
        return false;
    }
    if(!(Number.isInteger(parseInt((ataque)))) || ((ataque<39)||(ataque>100)) || (ataque=="")){
        return false;
    }
    if(!(Number.isInteger(parseInt((defensa)))) || ((defensa<39)||(defensa>100)) || (defensa=="")){
        return false;
    }
    if(!(Number.isInteger(parseInt((salud)))) || ((salud<39)||(salud>100)) || (salud=="")){
        return false;
    }
    return true;
}

function itemSeleccionado (item) {    
    $("#item-usado").remove();    
    let inventarioActual = JSON.parse(localStorage.getItem('inventario'));
    let itemIndex = item;
    localStorage.setItem('itemIndex', itemIndex);
    itemIndex -= 1;
    let usarItem = inventarioActual[itemIndex];

    this.experiencia = parseInt(localStorage.getItem('experiencia'));
    this.nivel = parseInt(localStorage.getItem('nivel'));
    this.ataque = parseInt(localStorage.getItem('ataque'));
    this.defensa = parseInt(localStorage.getItem('defensa'));
    this.salud = parseInt(localStorage.getItem('salud'));

    console.log(usarItem);

    switch (usarItem.toString()) {
        case "Pocion de vida":
            this.salud += 10;
            $("#usar-item").append(`<div id="item-usado" style="display: none">Usaste una pocion de vida!</div>`);
            $("#item-usado").slideDown(250);
            break;
        case "Pocion de mana":
            this.salud += 5;
            $("#usar-item").append(`<div id="item-usado" style="display: none">Usaste una pocion de mana!</div>`);
            $("#item-usado").slideDown(250); 
            break;        
        case "Pechera":
            this.defensa += 5;
            $("#usar-item").append(`<div id="item-usado" style="display: none">Usaste una armadura!</div>`);
            $("#item-usado").slideDown(250); 
            break;
        case "Botas":
            this.defensa += 5;
            $("#usar-item").append(`<div id="item-usado" style="display: none">Usaste una armadura!</div>`);
            $("#item-usado").slideDown(250); 
            break;
        case "Casco":
            this.defensa += 5;
            $("#usar-item").append(`<div id="item-usado" style="display: none">Usaste una armadura!</div>`);
            $("#item-usado").slideDown(250); 
            break;
        case "Arco":
            this.ataque += 5;
            $("#usar-item").append(`<div id="item-usado" style="display: none">Usaste un arma!</div>`);
            $("#item-usado").slideDown(250); 
            break;
        case "Hacha":
            this.ataque += 5;
            $("#usar-item").append(`<div id="item-usado" style="display: none">Usaste un arma!</div>`);
            $("#item-usado").slideDown(250); 
            break;
        case "Espada":
            this.ataque += 5;
            $("#usar-item").append(`<div id="item-usado" style="display: none">Usaste un arma!</div>`);
            $("#item-usado").slideDown(250); 
            break;            
        case "Trofeo":
            this.experiencia += 10;
            $("#usar-item").append(`<div id="item-usado" style="display: none">Usaste un tesoro!</div>`);
            $("#item-usado").slideDown(250); 
            if (this.experiencia>=80) {     //----------SUBIDA DE NIVEL----------
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
            break;
        case "Reliquia":
            this.experiencia += 10;
            $("#usar-item").append(`<div id="item-usado" style="display: none">Usaste un tesoro!</div>`);
            $("#item-usado").slideDown(250); 
            if (this.experiencia>=80) {     //----------SUBIDA DE NIVEL----------
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
            break;        
        default:
            $("#usar-item").append(`<div id="item-usado" style="display: none">No tenes ese item!</div>`);
            $("#item-usado").slideDown(250); 
            break;
    }

    console.log(inventarioActual);
    inventarioActual.splice(itemIndex, 1);
    $("#item"+itemIndex).remove();
    console.log(inventarioActual);

    localStorage.setItem('nivel', this.nivel);
    localStorage.setItem('ataque', this.ataque);
    localStorage.setItem('defensa', this.defensa);
    localStorage.setItem('salud', this.salud);
    localStorage.setItem('experiencia', this.experiencia);
    localStorage.setItem('inventario', JSON.stringify(inventarioActual));

    actualizarStats();
}

/* Inicio de lo que se imprime en pantalla */
$('#stats-inicio').submit(function(e){
    if(!validar($("#nombre").val(), $("#ataque").val(), $("#defensa").val(), $("#salud").val())){
        return;
    }else{
        let nombre = $("#nombre").val();
        let ataque = $("#ataque").val();
        let defensa = $("#defensa").val();
        let salud = $("#salud").val();
        let personaje = new Personaje(nombre, ataque, defensa, salud);    
        console.log(typeof(personaje));
        localStorage.setItem('personaje', JSON.stringify(personaje));
    }    
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
    <button type="button" id="explorar" class="btn btn-primary">Explorar</button></div>
    <button type="button" id="usar-item" class="btn btn-primary">Usar Item</button></div></div>`);    
    
    actualizarStats();
}

/* Eventos */
$("#combatir").click(function (event) {
    borrarCombate();
    borrarExp();
    personaje2.atacar();
    console.log(personaje2);
    let saludActual = parseInt(localStorage.getItem('salud'));
    actualizarStats();
    if (saludActual <= 0) {
        limpiarLog();
        $("body").append(`<h2 id="final-partida" style="display: none">${localStorage.getItem('nombre')} se debilito en su ultimo combate! Se acabo la aventura</h2>`);
        $("#final-partida").fadeIn("slow");
    }
})

$("#entrenar").click(function (event) {
    borrarExp();
    borrarCombate();
    personaje2.expUp()
    console.log(personaje2);
    actualizarStats();
})

$("#explorar").click(function (event) {
    borrarCombate();
    borrarExp();
    personaje2.explorar()
    console.log(personaje2);
    actualizarStats();
})

$("#usar-item").click(function (event) {
    $("#botones-control").append(`<label id="item-label" for="item">Presione el numero del item que desea usar</label>
    <input type="number" name="item" id="item-trigger"></input>`);
    $("#item-trigger").focus();
    $("#item-trigger").keypress(function (e) {
        if (e.key>=1 || e.key<=6){
            itemSeleccionado(e.key);
            $("#item-label").remove();
            $("#item-trigger").remove();
        }
    })    
})

$("#reset").click(() => {reset()});
})