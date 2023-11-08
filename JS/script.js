let nombre;
let total = 0;
let parcial = 0;
let unidad = 0;


class Producto{
    constructor(elemento,precio){
        this.elemento = elemento;
        this.precio = precio;
    }
}

let arg86 = new Producto("Camiseta Argentina 1986",120000);
let arg22 = new Producto("Camiseta Argentina 2022",75000);
let shortArg86 = new Producto("Short Argentina 1986",35000);
let pelota02 = new Producto("Pelota Adidas Fevernova Mundial 2002",22000);
let pelota22 = new Producto("Pelota Adidas Al Rhila Mundial 2022",26000);

let listaDeCarrito = [];

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
        alert("Por favor, ingrese su nombre para poder agregar el producto al carrito");
    }
    else{
        cantidadDeProducto();
        parcial = producto.precio * unidad;
        totalGeneral();
    
        for(let i=0;i<unidad;i++){
            lista.push(producto); 
        }

        alert("Se agrego el producto al carrito");
    }
}

function verLista(lista){

    if(nombre == null){
        
        alert("INGRESE SU NOMBRE PARA PODER ACCEDER AL CARRITO");
    }
    else if(nombre != null && lista.length>0){
        verDetalleProductos(lista);
        let respuesta = confirm("Desea realizar la compra? El total es: " + total);
        
        if(respuesta == true){
            alert("Gracias por su compra");
            limpiarLista(lista);
        }
        else{
            alert("No se realizo la compra");
        }
    }
    else{
        alert("EL CARRITO NO POSEE PRODUCTOS");
    }
    
    

}

function verDetalleProductos(lista){  
    carrito = [];

    lista.forEach(element => {
        carrito.push(("\n Producto: " + element.elemento + " | Precio: " + element.precio));
    });

    alert(carrito);
}

function limpiarLista(lista){
    while(lista.length > 0){
        lista.pop();
    }
    total = 0;
}

function cantidadDeProducto(){ 
    let cantidad = prompt("Ingrese la cantidad de unidades que desea agregar: ");
    unidad = parseInt(cantidad);
}

function totalGeneral(){
    total = total + parcial;
}