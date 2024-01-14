/*const productos = [
    {   
        "elemento": "Camiseta Argentina 1986",
        "precio": 120000,
        "stock": 7,
        "unidadAVender": 0,
        "id": 1,
        "img": "./Imagenes/argentina2022.jpg"
    },

    {
        "elemento": "Camiseta Argentina 2022",
        "precio": 75000,
        "stock": 15,
        "unidadAVender": 0,
        "id": 2,
        "img": "./Imagenes/argentina2022.jpg"
    },

    {
        "elemento": "Short Argentina 1986",
        "precio": 35000,
        "stock": 3,
        "unidadAVender": 0,
        "id": 3,
        "img": "./Imagenes/short1986.jpg"
    },

    {
        "elemento": "Pelota Adidas Fevernova Mundial 2002",
        "precio": 22000,
        "stock": 2,
        "unidadAVender": 0,
        "id": 4,
        "img": "./Imagenes/pelota2002.jpg"
    },

    {
        "elemento": "Pelota Adidas Al Rhila Mundial 2022",
        "precio": 26000,
        "stock": 20,
        "unidadAVender": 0,
        "id": 5,
        "img": "./Imagenes/pelota2022.jpg"
    }
]*/

class Producto{
    constructor(elemento,precio,stock,unidadAVender,id,img){
        this.elemento = elemento;
        this.precio = precio;
        this.stock = stock;
        this.unidadAVender = unidadAVender;
        this.id = id;
        this.img = img;
    }
}

const arg86 = new Producto("Camiseta Argentina 1986",120000,7,0,1,"./Imagenes/argentina1986.jpg");
const arg22 = new Producto("Camiseta Argentina 2022",75000,15,0,2,"./Imagenes/argentina2022.jpg");
const shortArg86 = new Producto("Short Argentina 1986",35000,3,0,3,"./Imagenes/short1986.jpg");
const pelota02 = new Producto("Pelota Adidas Fevernova Mundial 2002",22000,2,0,4,"./Imagenes/pelota2002.jpg");
const pelota22 = new Producto("Pelota Adidas Al Rhila Mundial 2022",26000,20,0,5,"./Imagenes/pelota2022.jpg");

const productos = [arg86,arg22,shortArg86,pelota02,pelota22];
