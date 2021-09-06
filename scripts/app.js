//prevenimos errores por escritura, etc
'use strict'

//indicamos la raiz de la app (etiqueta ng-app), que será 'miTienda'
var app = angular.module('miTienda',[]);

//creamos el controlador TiendaController que calculara diversos
//parametros relacionados con el array de articulos
app.controller('TiendaController', ['$scope', function($scope){
	
	//creamos la variable que nos interese decada producto (nombre, precio, etc)
	this.productos=articulos;

	//creamos una funcion que cambie el color de la etiqueta
	//dependiendo del stock que quede (mayor o menor que 15 o 0)
	this.stockClass= function(stock){
		if(stock>=15){
			return 'label-info';
		}else if(stock === 0){
			return 'label-danger';
		}else{
			return 'label-warning';
		}
	};

	//definimos el número de columnas que queremos que se visualicen
	//en las cuales se distribuiran los productos
	this.numColumnas = 4;

	//definimos una funcion para obtener como estaran distribuidos
	//los articulos en las filas, dividiendo el array de articulos
	//en funcion cuantas columnas indicamos que hubiera
	//(lo que cambia el numero de filas que se visualizan)
	this.getFilas = function(array, columns){
		var filas=[];

		//el siguiente bucle añade a una fila el numero de articulos
		//que quepan segun el numero de columnas definido, luego pasa
		//a la siguiente fila, etc hasta que no haya mas productos
		var i, j, temporary, chunk = columns;
		for (i=0, j=array.length; i < j; i +=chunk){
			temporary = array.slice(i, i+chunk);
			filas.push(temporary);
		}
		return filas;
	};

	//llamamos a la funcion anterior con los articulos y columnas introducidos
	this.filas = this.getFilas(this.productos, this.numColumnas);

	//aqui se utiliza el objeto scope y la funcion watch para
	//visualizar en tiempo real si ha cambiado numColumnas
	//y, si lo ha hecho, recalcular las filas. Esto cambia
	//la variable this, por lo que antes hay que guardarla
	var self=this;
	$scope.$watch('tienda.numColumnas', function() {
		self.filas = self.getFilas(self.productos, self.numColumnas);
	});
	


}]);

//esta será la variable que represente a los articulos en cuestion
var articulos = [{
	nombre: 'FUJIFILM FinePix S8600 - negro - Cámara fotográfica digital',
	precio: 149.00,
	//la foto del producto se define mediante el directorio donde esta guardada
	imagen: 'fotos/fujifilm.jpg',
	//definimos el stock restante del producto
	stock: 0,
	//y el descuento que le corresponde (en porcentaje)
	descuento:19
},
//ahora hacemos lo mismo para el resto de los articulos
{
	nombre: 'SAMSUNG Galaxy S4 Value Edition - blanco - 16GB - Smartphone',
	precio: 399.00,
	imagen: 'fotos/galaxy_1.jpg',
	stock: 22,
	descuento: 20
},{
	nombre: 'PANASONIC VIERA TX-55AS650E - Televisor LED 3D Smart TV',
	precio: 1499.00,
	imagen: 'fotos/tv1.jpg',
	stock: 9,
	descuento: 45
},{
	nombre: 'SMASUNG Gear Fit - negro - Reloj conectado',
	precio: 199.00,
	imagen: 'fotos/samsung-gear.jpg',
	stock: 52,
	descuento:0
}
];