/* ************************************************ VARIABLES ************************************************************************************* */

let nombre;
let total = 0;
let parcial = 0;
let unidad = 0;
const carrito = [];

/* *********************************************************************************************************************************************** */

/* ************************************************ HTML ************************************************************************************** */


/************************ Mostrar productos ********************************** */
const container = document.getElementById("container");

productos.forEach( (el) => {

    const product = document.createElement("div");
    product.className = "product";

    const nombreProducto = document.createElement("h4");
    nombreProducto.innerText = `${el.elemento}`; 

    const imgProducto = document.createElement("img");
    imgProducto.src = el.img;

    const precioProducto = document.createElement("p");
    precioProducto.innerText = `${"Precio: " + el.precio}`;

    const buttonAgregar = document.createElement("button");
    buttonAgregar.innerText = "Agregar producto";
    buttonAgregar.onclick = () => agregarProducto(carrito,el);

    const buttonQuitar = document.createElement("button");
    buttonQuitar.innerText = "Quitar producto";
    buttonQuitar.onclick = () => quitarProducto(carrito,el);
    
    product.appendChild(nombreProducto);
    product.appendChild(imgProducto);
    product.appendChild(precioProducto);
    product.appendChild(buttonAgregar);
    product.appendChild(buttonQuitar);

    container.appendChild(product);
    
})

/************************ Carrito ************************************ */

const verCarrito = document.createElement("carrito");
verCarrito.innerText = "Ver Carrito";
verCarrito.onclick = () => verLista(carrito);

container.appendChild(verCarrito);

const comprarCarrito = document.createElement("comprar");
comprarCarrito.innerText = "Comprar";
comprarCarrito.onclick = () => finalizarCompra(carrito);

container.appendChild(comprarCarrito);

const vaciarLista = document.createElement("quitar");
vaciarLista.innerText = "Vaciar bolso";
vaciarLista.onclick = () => vaciarCarrito(carrito);

container.appendChild(vaciarLista);

/* *********************************************************************************************************************************************** */ 

/* ************************************************ FUNCIONES ************************************************************************************ */

function agregarProducto(lista,producto){
/*Se verifica el stock, se resta del stock lo ingresado por el usuario, se calcula el importe parcial para agregar a la lista y se guarda el total.*/
    if(lista.includes(producto)){
        let unidadAVenderActual = producto.unidadAVender;
        verificarStock(producto);
        restarStock(producto);
        total += producto.precio * producto.unidadAVender;
        producto.unidadAVender += unidadAVenderActual;
        localStorage.setItem("carritoSinComprar",JSON.stringify(producto));
    }
    else{
        verificarStock(producto);
        restarStock(producto);
        total += producto.precio * producto.unidadAVender;
        lista.push(producto);
        localStorage.setItem("carritoSinComprar",JSON.stringify(producto));
    }
    alert("Se agrego el producto al bolso");

}

function verLista(lista){
//Se verifica si la lista posee elementos.
    if(!estaVacia(lista) || hayProductosEnMemoria()){
        verDetalleLista(lista);
    }
    else{
        alert("EL BOLSO NO POSEE PRODUCTOS");
    }
}

function verDetalleLista(lista){
/*Muestra el detalle de la lista ingresada. Valida si hay productos en memoria para mostrarlo o muestra la lista de la sesion actual y luego la guarda en el local storage*/
    if(hayProductosEnMemoria() && estaVacia(lista)){
        lista = mostrarCarritoSinComprar();
        calcularParcialEnMemoria();
        alert(mostrarListaAlUSuario(lista));
    }  
    else{
        guardarCarritoSinComprar(lista);
        alert(mostrarListaAlUSuario(lista));
    }
}

function limpiarLista(lista){
    while(!estaVacia(lista)){
        lista.pop();
    }
    localStorage.clear();
    total = 0;
}

function estaVacia(lista){
    if(lista.length > 0){
        return false;
    }

    return true;
}

function verificarDatos(producto){ 
//Se solicita al usuario la cantidad de unidades que desea agregar de un producto determinado. En caso de que no ingrese un numero, se solicitara nuevamente.
    let cantidad = prompt("Ingrese la cantidad de unidades que desea agregar: \n" + "Stock disponible: " + producto.stock);
    
    while(isNaN(cantidad) || cantidad < 1 || producto.stock < cantidad){
        alert("ERROR. POR FAVOR, INGRESE UN NÚMERO VÁLIDO");
        cantidad = prompt("Ingrese la cantidad de unidades que desea agregar: \n" + "Stock disponible: " + producto.stock);    
    }
    
    unidad = parseInt(cantidad);
}

function verificarStock(producto){
//Se verifica que la cantidad de unidades solicitadas por el usuario sea menor al stock disponible.
    verificarDatos(producto);
    if(producto.stock < unidad){
        alert("NO DISPONEMOS DE STOCK PARA AGREGAR LA CANTIDAD SOLICITADA. Por favor ingrese un número menor a " + producto.stock);
        verificarDatos(producto);
    }

    producto.unidadAVender = unidad;
}

function finalizarCompra(lista){
/*Se valida que la lista no este vacia. Se muestra la lista, se muestra el total y se solicita confirmacion al usuario para proceder 
con la compra. En caso de que el bolso de compras este vacio, se avisa al usuario.*/
    if(hayProductosEnMemoria() && estaVacia(lista)){
        nuevaLista = mostrarCarritoSinComprar();
        verDetalleLista(nuevaLista);
        calcularParcialEnMemoria();
        total = parcial;
        let respuesta = confirm("Desea realizar la compra? El total es: " + total);
        mostrarMensajeCompra(respuesta,lista);
    }
    else if(!estaVacia(lista)){
        verDetalleLista(lista);
        let respuesta = confirm("Desea realizar la compra? El total es: " + total);
        mostrarMensajeCompra(respuesta,lista);
    }
    else{
        alert("EL BOLSO NO POSEE PRODUCTOS");
    }
}

function mostrarMensajeCompra(rta,lista){
//Se muestra un mensaje al finalizar la compra. En caso de que el usuario acepte, se borra la lista. Caso contrario, la lista permanece con lo añadido.
    if(rta == true){
        limpiarLista(lista);
        alert("Gracias por su compra");
    }
    else{
        alert("No se realizo la compra");
    }
}

function restarStock(producto){
    producto.stock -= producto.unidadAVender;
}

function vaciarCarrito(lista){
//Permite vaciar la lista y da aviso al usuario de que el bolso de compras se vacio correctamente.
    if(!estaVacia(lista) || hayProductosEnMemoria()){
        restablecerStock(lista);
        limpiarLista(lista);
        alert("EL BOLSO SE HA VACIADO EXITOSAMENTE");
    }
    else{
        alert("EL BOLSO NO POSEE PRODUCTOS");
    }
    
}

function mostrarListaAlUSuario(lista){
/*Recibe una lista y crea una nueva segun los productos que posee para poder ser mostrada correctamente al usuario. En caso de que el producto posea unidadesAVender < 1, este producto
no sera incluido en la nueva lista*/
    nuevaLista = [];
    if(!hayProductosEnMemoria() || !estaVacia(lista)){
        
        lista.forEach((producto) => {
            if(producto.unidadAVender > 0){
                parcial = producto.precio * producto.unidadAVender;
                nuevaLista.push("\n Producto: " + producto.elemento + " | Unidades: " + producto.unidadAVender + " | Precio: " + parcial);
            }
        });
    }
    else{
        for(let i=0;i<localStorage.length;i++){
            let clave = localStorage.key(i);
            let producto = JSON.parse(localStorage.getItem(clave));
            nuevaLista.push("\n Producto: " + producto.elemento + " | Unidades: " + producto.unidadAVender + " | Precio: " + parcial);
        }   
    }
    return nuevaLista;
}

function quitarProducto(lista,producto){
//Quita el producto seleccionado por el usuario. Se añade al stock la cantidad ingresada por el usuario y se recalcula el precio total.

    if(lista.includes(producto)){
            
        let productosEnlista = contarCantidadDeProductosEnLista(producto,lista);
        let cantidad = prompt("Ingrese la cantidad de unidades que desea agregar: ");
        
        while(isNaN(cantidad) || cantidad < 1 || cantidad > productosEnlista){
            alert("ERROR. POR FAVOR, NO POSEE ESA CANTIDAD EN EL BOLSO");
            cantidad = prompt("Ingrese la cantidad de unidades que desea agregar: ");    
        }

        unidad = parseInt(cantidad);

        nuevaLista = lista.filter(item => item.id != producto);
        lista = nuevaLista;

        producto.unidadAVender -= unidad;
        producto.stock += unidad;
        
        modificarPrecioTotal(lista);
        alert("Se quito correctamente el producto");
    }
    else{
        alert ("El producto no se encuentra en el bolso");
    }

}

function modificarPrecioTotal(lista){
//Verifica los productos de la lista y calcula el precio total.
    total = 0;
    parcial = 0;
    let nuevoParcial;
    
    lista.forEach( (producto) => {
        nuevoParcial = producto.precio * producto.unidadAVender;
        parcial += nuevoParcial; 
    });

    total = parcial;
}

function contarCantidadDeProductosEnLista(prod,lista){
/*Verifica y devuelve la cantidad de productos que posee la lista */
    let cant = 0;

    lista.forEach ( (el) => {
        if(el == prod){
            cant = prod.unidadAVender;
        }
    });

    return cant;
}

function guardarCarritoSinComprar(lista){
/*Almacena en local storage los productos que se encuentran en la lista */
    if(!estaVacia(lista)){
         localStorage.setItem("carritoSinComprar",JSON.stringify(lista));
    }
}

function mostrarCarritoSinComprar(){
/*Trae todos los productos que hay almacenados en local storage*/
    let carritoSinComprar = JSON.parse(localStorage.getItem("carritoSinComprar"));

    return carrito.concat(carritoSinComprar);
}

function hayProductosEnMemoria(){
/*Verifica si hay productos almacenado en local storage*/ 
    if(localStorage.length > 0){
        return true;
    }

    return false;
}

function calcularParcialEnMemoria(){
/*Se trae los productos que estan guardados en local storage, se pasan a una lista interna y se calcula el importe que suman todos ellos. */
    let carritoPendienteDeCompra = mostrarCarritoSinComprar();
    let nuevoParcial = 0;

    carritoPendienteDeCompra.forEach( (el) => { nuevoParcial += (el.precio * el.unidadAVender) } );

    parcial = nuevoParcial;
}

function restablecerStock(lista){
    lista.forEach((el) => { el.stock += el.unidadAVender } );
}
