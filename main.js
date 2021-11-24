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

        sessionStorage.setItem('nombre', this.nombre);
        sessionStorage.setItem('ataque', this.ataque);
        sessionStorage.setItem('defensa', this.defensa);
        sessionStorage.setItem('salud', this.salud);
        sessionStorage.setItem('experiencia', this.experiencia);
        sessionStorage.setItem('nivel', this.nivel);
        sessionStorage.setItem('inventario', JSON.stringify(this.inventario));
    }

    atacar() {    //Primer método   
        let ultimoCombate = document.getElementById('combate-log');
        if (ultimoCombate != null) {
            ultimoCombate.parentNode.removeChild(ultimoCombate);
        }

        this.nivel = parseInt(sessionStorage.getItem('nivel'));
        this.ataque = parseInt(sessionStorage.getItem('ataque'));
        this.defensa = parseInt(sessionStorage.getItem('ataque'));
        this.salud = parseInt(sessionStorage.getItem('salud'));
        
        let dañoMaximo = this.ataque + 20;
        let dañoMinimo = this.ataque - 20;
        let ataqueEnemigo = Math.floor(Math.random() * (dañoMaximo - dañoMinimo)) + dañoMinimo;

        let combateStats = document.createElement('div');
        combateStats.id = 'combate-log';
        combateStats.innerHTML = `<h3>Combate actual:\n</h3>
                                <div>Tu ataque: ${this.ataque}\n</div>
                                <div>Ataque enemigo: ${ataqueEnemigo}\n</div>
                                `;
        document.body.appendChild(combateStats);
        
        if(this.ataque>ataqueEnemigo){
            this.experiencia = parseInt(sessionStorage.getItem('experiencia'));
            this.experiencia += 30;
            sessionStorage.setItem('experiencia', this.experiencia);
            
            let victoria = document.createElement('div');
            victoria.id = "div-victoria";
            victoria.innerHTML = `<div>Ganaste el combate! Experiencia +30</div>`;
            document.body.appendChild(victoria);
            
            if (this.experiencia>=50) {
                this.nivel += 1;
                this.ataque += 5;
                this.defensa += 5;
                this.experiencia = 0;
                sessionStorage.setItem('nivel', this.nivel);
                sessionStorage.setItem('ataque', this.ataque);
                sessionStorage.setItem('defensa', this.defensa);
                sessionStorage.setItem('experiencia', this.experiencia);
                
                let subidaNivel = document.createElement('div');
                subidaNivel.id = "subida-nivel";
                subidaNivel.innerHTML = `<div>Subiste de nivel!\n Nivel +1\nAtaque +5\nDefensa +5</div>`;
                document.body.appendChild(subidaNivel);
            }
        }else{
            let dañoSalud = ataqueEnemigo-this.defensa;
            sessionStorage.setItem('dañoSalud', dañoSalud);
            
            if(dañoSalud>=0){
                this.salud -= dañoSalud;
                sessionStorage.setItem('salud', this.salud);
            }else{
                this.salud -= dañoSalud*(-1);
                sessionStorage.setItem('salud', this.salud);
            }
            let derrota = document.createElement('div');
            derrota.id = "div-derrota";    
            derrota.innerHTML = `<div>No ganaste el combate!\nRecibiste ${dañoSalud} de daño\nTu salud restante es: ${this.salud}</div>`;
            document.body.appendChild(derrota);
        }   
    }

    expUp() {   //Segundo método
        this.experiencia = parseInt(sessionStorage.getItem('experiencia'));
        this.nivel = parseInt(sessionStorage.getItem('nivel'));
        this.ataque = parseInt(sessionStorage.getItem('ataque'));
        this.defensa = parseInt(sessionStorage.getItem('ataque'));
        this.experiencia += 10;
        sessionStorage.setItem('experiencia', this.experiencia);

        let subirExp = document.createElement('div');
        subirExp.id = "div-experiencia";
        subirExp.innerHTML = `<div>Entrenaste! Experiencia +10</div>`;
        document.body.appendChild(subirExp);

        if (this.experiencia>=50) {
            this.nivel += 1;
            this.ataque += 5;
            this.defensa += 5;
            this.experiencia = 0;
            sessionStorage.setItem('nivel', this.nivel);
            sessionStorage.setItem('ataque', this.ataque);
            sessionStorage.setItem('defensa', this.defensa);
            sessionStorage.setItem('experiencia', this.experiencia);
            let subidaNivel = document.createElement('div');
            subidaNivel.id = 'subida-nivel';
            subidaNivel.innerHTML = `<div>Subiste de nivel!\nNivel +1\nAtaque +5\nDefensa +5</div>`;
            document.body.appendChild(subidaNivel);
        }        
    }

    explorar() {    //Tercer método
        let items_array = ['Pocion de vida', 'Pocion de mana', 'Pechera', 'Botas', 'Casco', 'Trofeo', 'Espada', 'Hacha', 'Arco', 'Reliquia'];
        let item_index = Math.floor(Math.random() * items_array.length);
        
        console.log(this.inventario);
        
        let ultimoItem = document.getElementById('item-encontrado');
        let ultimoInventario = document.getElementById('inventario-lleno');

        if (ultimoItem != null) {
            ultimoItem.parentNode.removeChild(ultimoItem);
        }

        if (ultimoInventario != null) {
            ultimoInventario.parentNode.removeChild(ultimoInventario);
        }

        if (this.inventario.length>=6) {
            let inventarioLleno = document.createElement('div');
            inventarioLleno.id = 'inventario-lleno';
            inventarioLleno.innerHTML = `<div>Tu inventario esta lleno!</div>`;
            document.body.appendChild(inventarioLleno);
        }else{
            this.inventario.push(items_array[item_index]);
            sessionStorage.setItem('inventario', this.inventario);
            let listaInventario = document.getElementById('lista-inventario');
            let itemNuevo = document.createElement('li');
            let itemNombre = document.createTextNode(this.inventario[this.inventario.length-1]);
            itemNuevo.appendChild(itemNombre);
            listaInventario.appendChild(itemNuevo);
        }

        console.log(this.inventario);

        let itemEncontrado = document.createElement('div');
        itemEncontrado.id = 'item-encontrado';
        itemEncontrado.innerHTML = `<div>Encontraste un item, tenes ${this.inventario.length} items</div>`;
        document.body.appendChild(itemEncontrado);
    }

    borrar(){
        sessionStorage.clear();
    }
    
}
/* Inicio de lo que se imprime en pantalla */
document.getElementById('stats_inicio').onsubmit = function(event){
    /* event.preventDefault(); */
    let nombre = document.getElementById("nombre").value;
    let ataque = document.getElementById("ataque").value;
    let defensa = document.getElementById('defensa').value;
    let salud = document.getElementById('salud').value;

    let personaje = new Personaje(nombre, ataque, defensa, salud);
    
    console.log(typeof(personaje));
    sessionStorage.setItem('personaje', JSON.stringify(personaje));
};

let personaje_creado = JSON.parse(sessionStorage.getItem('personaje'));
let personaje2 = new Personaje (personaje_creado.nombre, personaje_creado.ataque, personaje_creado.defensa, personaje_creado.salud);
console.log(personaje2);
console.log(typeof(personaje_creado));
console.log((personaje_creado));

let divPersonaje = document.createElement('div');
divPersonaje.id = 'personaje';
divPersonaje.innerHTML = `<h2>Tu personaje:  </h2>
                <ul id="char_info">
                <li>Nombre: ${sessionStorage.getItem('nombre')}</li>
                <li>Nivel: ${sessionStorage.getItem('nivel')}</li>
                <li>Experiencia: ${sessionStorage.getItem('experiencia')}</li>
                <li>Ataque: ${sessionStorage.getItem('ataque')}</li>
                <li>Defensa: ${sessionStorage.getItem('defensa')}</li>
                <li>Salud: ${sessionStorage.getItem('salud')}</li>
            </ul>`;
document.body.appendChild(divPersonaje);

let divInventario = document.createElement('div');
divInventario.innerHTML = `
            <h2>Inventario: </h2>
            <ul id=lista-inventario></ul>
            `;
document.body.appendChild(divInventario);


/* Eventos */
let combatNode = document.getElementById('combatir');
combatNode.onclick = function (event) {
    let victoria = document.getElementById('div-victoria');
    let derrota = document.getElementById('div-derrota');
    let subidaNivel = document.getElementById('subida-nivel');

    console.log(victoria);
    console.log(derrota);
    console.log(subidaNivel);

    if (victoria != null) {
        victoria.parentNode.removeChild(victoria);
    }

    if (derrota != null) {
        derrota.parentNode.removeChild(derrota);
    }

    if (subidaNivel != null) {
        subidaNivel.parentNode.removeChild(subidaNivel);
    }

    personaje2.atacar();
    console.log(personaje2);

    let div1 = document.getElementById('personaje');
    div1.parentNode.removeChild(div1);

    let div2 = document.createElement('div');
    div2.id = 'personaje';
    div2.innerHTML = `<h2>Tu personaje:  </h2>
                    <ul id="char_info">
                    <li>Nombre: ${sessionStorage.getItem('nombre')}</li>
                    <li>Nivel: ${sessionStorage.getItem('nivel')}</li>
                    <li>Experiencia: ${sessionStorage.getItem('experiencia')}</li>
                    <li>Ataque: ${sessionStorage.getItem('ataque')}</li>
                    <li>Defensa: ${sessionStorage.getItem('defensa')}</li>
                    <li>Salud: ${sessionStorage.getItem('salud')}</li>
                    </ul>`;
    document.body.appendChild(div2);    
    
    let saludActual = parseInt(sessionStorage.getItem('salud'));
    if (saludActual <= 0) {
        let experienciaUp = document.getElementById('div-experiencia');
        if (experienciaUp != null) {
            experienciaUp.parentNode.removeChild(experienciaUp);            
        }

        div2.parentNode.removeChild(div2);
        let combateStats = document.getElementById('combate-log');
        combateStats.parentNode.removeChild(combateStats);
        let botones = document.getElementById('botones-control');
        botones.parentNode.removeChild(botones);
        let derrota = document.getElementById('div-derrota');
        derrota.parentNode.removeChild(derrota);
        
        let fin = document.createElement('h2');
        fin.textContent = sessionStorage.getItem('nombre')+" se debilito! Se acabo la aventura";
        document.body.appendChild(fin);
    }
}
let trainNode = document.getElementById('entrenar');
trainNode.onclick = () => {
    let experienciaUp = document.getElementById('div-experiencia');
    let subidaNivel = document.getElementById('subida-nivel');
    
    if (subidaNivel != null) {
        subidaNivel.parentNode.removeChild(subidaNivel);
    }

    if (experienciaUp != null) {
        experienciaUp.parentNode.removeChild(experienciaUp);
    }

    personaje2.expUp()
    console.log(personaje2);

    let div1 = document.getElementById('personaje');
    div1.parentNode.removeChild(div1);

    let div2 = document.createElement('div');
    div2.id = 'personaje';
    div2.innerHTML = `<h2>Tu personaje:  </h2>
                    <ul id="char_info">
                    <li>Nombre: ${sessionStorage.getItem('nombre')}</li>
                    <li>Nivel: ${sessionStorage.getItem('nivel')}</li>
                    <li>Experiencia: ${sessionStorage.getItem('experiencia')}</li>
                    <li>Ataque: ${sessionStorage.getItem('ataque')}</li>
                    <li>Defensa: ${sessionStorage.getItem('defensa')}</li>
                    <li>Salud: ${sessionStorage.getItem('salud')}</li>
                    </ul>`;
    document.body.appendChild(div2);
}

let exploreNode = document.getElementById('explorar');
exploreNode.onclick = () => {
    personaje2.explorar()
    console.log(personaje2);
}

let deleteNode = document.getElementById('salir');
deleteNode.onclick = () => {personaje2.borrar()}



/* Validar input */
/* let ataque = null;
while ( !(Number.isInteger(ataque)) || ((ataque<39)||(ataque>100)) || (ataque=="")) {ataque = Number(prompt("Con cuanto ataque queres comenzar? (40-100)"));}
let defensa = null;
while ( !(Number.isInteger(defensa)) || ((defensa<39)||(defensa>100)) || (defensa=="")) {defensa = Number(prompt("Con cuanta defensa queres comenzar? (40-100)"));}
let salud = null;
while ( !(Number.isInteger(salud)) || ((salud<39)||(salud>100)) || (salud=="")) {salud = Number(prompt("Con cuanta salud queres comenzar? (40-100)"));} */
