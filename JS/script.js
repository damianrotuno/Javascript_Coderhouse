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

    let cantidad = prompt("Ingrese la cantidad de unidades que desea agregar: ");
    
    while(isNaN(cantidad) || cantidad < 1){
        alert("ERROR. POR FAVOR, INGRESE UN NÚMERO VÁLIDO");
        cantidad = prompt("Ingrese la cantidad de unidades que desea agregar: ");    
    }
    
    unidad = parseInt(cantidad);
}

function verificarStock(producto){

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
    if(nombre != null && lista.length>0){
        verDetalleLista(lista);
        let respuesta = confirm("Desea realizar la compra? El total es: " + total);
        limpiarLista(lista);
        mostrarMensajeCompra(respuesta);
    }
    else{
        alert("EL BOLSO NO POSEE PRODUCTOS");
    }
}

function mostrarMensajeCompra(rta){
    if(rta == true){
        alert("Gracias por su compra");
    }
    else{
        alert("No se realizo la compra");
    }
}

function restarStock(producto){
    producto.stock -= producto.unidadAVender;
}
