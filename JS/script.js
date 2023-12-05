/* ************************************************ VARIABLES ************************************************************************************* */

let nombre;
let total = 0;
let parcial = 0;
let unidad = 0;
let listaDeBolso = [];

/* *********************************************************************************************************************************************** */

/* ************************************************ OBJETOS ************************************************************************************** */

class Producto{
    constructor(elemento,precio,stock,unidadAVender){
        this.elemento = elemento;
        this.precio = precio;
        this.stock = stock;
        this.unidadAVender;
    }
}

let arg86 = new Producto("Camiseta Argentina 1986",120000,7,0);
let arg22 = new Producto("Camiseta Argentina 2022",75000,15,0);
let shortArg86 = new Producto("Short Argentina 1986",35000,3,0);
let pelota02 = new Producto("Pelota Adidas Fevernova Mundial 2002",22000,2,0);
let pelota22 = new Producto("Pelota Adidas Al Rhila Mundial 2022",26000,20,0);

/* *********************************************************************************************************************************************** */ 

/* ************************************************ FUNCIONES ************************************************************************************ */

function bienvenidaUsuario(){
    nombre = prompt("Ingrese su nombre: ");
    
    let mensaje = "Bienvenido " + nombre;

    let msj = document.getElementById("msjBienvenida");

    msj.textContent = mensaje;
}

function verPrecio(producto){
    alert("El precio del producto es: " + producto.precio);
}

function agregarProducto(lista,producto){
/*Se valida que el usuario haya ingresado su nombre para poder agregar al bolso de compras el producto. Se verifica el stock, se resta del stock lo ingresado por el usuario,
 se calcula el importe parcial para agregar a la lista y se guarda el total.*/
    if(nombre == null){
        alert("Por favor, ingrese su nombre para poder agregar el producto al bolso");
    }
    else{
        verificarStock(producto);
        restarStock(producto);
        parcial = producto.precio * producto.unidadAVender;
        totalGeneral();
        lista.push("\n Producto: " + producto.elemento + " | Unidades: " + producto.unidadAVender + " | Precio: " + parcial);
        alert("Se agrego el producto al bolso");
    }
}

function verLista(lista){
//Se verifica si el usuario ingreso un nombre y si la lista posee elementos.
    if(nombre != null && lista.length>0){
        verDetalleLista(lista);
    }
    else{
        alert("EL BOLSO NO POSEE PRODUCTOS");
    }
}

function verDetalleLista(lista){  
    alert(lista);
}

function limpiarLista(lista){
    while(lista.length > 0){
        lista.pop();
    }
    total = 0;
}

function verificarDatos(){ 
//Se solicita al usuario la cantidad de unidades que desea agregar de un producto determinado. En caso de que no ingrese un numero, se solicitara nuevamente.
    let cantidad = prompt("Ingrese la cantidad de unidades que desea agregar: ");
    
    while(isNaN(cantidad) || cantidad < 1){
        alert("ERROR. POR FAVOR, INGRESE UN NÚMERO VÁLIDO");
        cantidad = prompt("Ingrese la cantidad de unidades que desea agregar: ");    
    }
    
    unidad = parseInt(cantidad);
}

function verificarStock(producto){
//Se verifica que la cantidad de unidades solicitadas por el usuario sea menor al stock disponible.
    verificarDatos();
    if(producto.stock < unidad){
        alert("NO DISPONEMOS DE STOCK PARA AGREGAR LA CANTIDAD SOLICITADA. Por favor ingrese un número menor a " + producto.stock);
        verificarDatos();
    }

    producto.unidadAVender = unidad;
}

function totalGeneral(){
    total = total + parcial;
}

function finalizarCompra(lista){
/*Se valida que la lista no este vacia y que el usuario haya ingresado su nombre. Se muestra la lista, se muestra el total y se solicita confirmacion al usuario para proceder 
con la compra. En caso de que el bolso de compras este vacio, se avisa al usuario.*/
    if(nombre != null && lista.length>0){
        verDetalleLista(lista);
        let respuesta = confirm("Desea realizar la compra? El total es: " + total);
        mostrarMensajeCompra(respuesta);
    }
    else{
        alert("EL BOLSO NO POSEE PRODUCTOS");
    }
}

function mostrarMensajeCompra(rta){
//Se muestra un mensaje al finalizar la compra. En caso de que el usuario acepte, se borra la lista. Caso contrario, la lista permanece con lo añadido.
    if(rta == true){
        alert("Gracias por su compra");
        limpiarLista(lista);
    }
    else{
        alert("No se realizo la compra");
    }
}

function restarStock(producto){
    producto.stock -= producto.unidadAVender;
}

function vaciarBolso(lista){
//Permite vaciar la lista y da aviso al usuario de que el bolso de compras se vacio correctamente.
    limpiarLista(lista);
    alert("EL BOLSO SE HA VACIADO EXITOSAMENTE");
}
