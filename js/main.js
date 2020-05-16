// -----------------------------------------------
//            VARIABLES GLOBALES (danielsanchez68.hotmail.com)
// -----------------------------------------------
let listaproductos = [
    { nombre: 'pan', cantidad: 2, precio: 12.34 },
    { nombre: 'carne', cantidad: 3, precio: 34.34 },
    { nombre: 'leche', cantidad: 4, precio: 56.34 },
    { nombre: 'fideos', cantidad: 5, precio: 65.34 }
]
let crearlista = true
let ul

// -----------------------------------------------
//                 FUNCIONES
// -----------------------------------------------
function borrarprod(index) {
    console.log(index)
    listaproductos.splice(index, 1)
    renderlista()
}

function cambiarcantidad(index, e) {
    let cantidad = Number(e.value)
    listaproductos[index].cantidad = cantidad
}

function cambiarprecio(index, e) {
    let precio = Number(e.value)
    listaproductos[index].precio = precio
}

function configurarListeners() {
    document.getElementById('btn-entrada-producto').addEventListener('click', () => {

        console.log('btn-entrada-producto')

        let input = document.getElementById('ingreso-producto')
        let producto = input.value

        console.log(producto)
        if (producto != '') {

            listaproductos.push({
                nombre: producto,
                cantidad: 1,
                precio: 0
            })
            renderlista()

            input.value = ''
        }
    })

    document.getElementById('btn-borrar-productos').addEventListener('click', () => {
        console.log('borrar productos')

        listaproductos = []
        renderlista()
    })
}

function renderlista() {

    if (crearlista) {

        ul = document.createElement('ul')
        ul.classList.add('demo-list-icon', 'mdl-list', 'w-100')
    }

    ul.innerHTML = ''

    //listaproductos.forEach(function(prod,index){
    listaproductos.forEach((prod, index) => {
        ul.innerHTML += `
            <li class="mdl-list__item">

                <span class="mdl-list__item-primary-content w-10">
                    <i class="material-icons mdl-list__item-icon">shopping_cart</i>
                 </span>

                <span class="mdl-list__item-primary-content w-30">
                ${prod.nombre}
                 </span>

                 <span class="mdl-list__item-primary-content w-20">
                     <div class="mdl-textfield mdl-js-textfield">
                        <input onchange='cambiarcantidad(${index}, this)' 
                          class="mdl-textfield__input" type="text" id="sample-cantidad-${index}">
                        <label class="mdl-textfield__label" for="sample-cantidad-${index}">${prod.cantidad}</label>
                     </div>
                 </span>

                <span class="mdl-list__item-primary-content w-20 ml-item">
                        <div class="mdl-textfield mdl-js-textfield">
                        <input onchange='cambiarprecio(${index}, this)'
                            class="mdl-textfield__input" type="text" id="sample-precio-${index}">
                        <label class="mdl-textfield__label" for="sample-precio-${index}">${prod.precio}</label>
                        </div>
                </span>

                <span class="mdl-list__item-primary-content w-20 ml-item">
                     <!-- Colored FAB button -->
                    <button onclick='borrarprod(${index})' 
                        class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
                        <i class="material-icons">remove_shopping_cart</i>
                    </button>
    
                </span>
    
            </li>
        `
    })
    if (crearlista) {
        document.getElementById('lista').appendChild(ul)
    }
    else {
        componentHandler.upgradeElements(ul)
    }
    crearlista = false;
}
function registrarServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            this.navigator.serviceWorker.register('./sw.js').then(function (reg){
            console.log('El service worker se registro correctamente', reg)
            })
            .catch(function(err){
                console.warn('El service worker no se ha registrado', err)
            })
        })
    }
}

function start() {
    registrarServiceWorker()
    configurarListeners()
    renderlista()
}

// -----------------------------------------------
//                 EJECUCIÓN
// -----------------------------------------------
//start()
//window.onload = start
window.addEventListener('DOMContentLoaded', start)