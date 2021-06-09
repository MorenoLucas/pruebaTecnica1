import { Component, OnInit } from '@angular/core';
import { CestaItem } from 'src/app/interfeces/cesta-item';
import { Producto } from 'src/app/interfeces/producto';
import { ServiciosService } from 'src/app/services/servicios.service';
import { products } from '../../../assets/productos.json';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  productos;
  constructor(private serv: ServiciosService) {
    this.productos = products;
  }

  ngOnInit(): void {}

  agregar(producto: Producto, cantidad) {
    const item: CestaItem = {
      id: producto.id,
      cantidad: parseInt(cantidad),
      precio: producto.precio,
      precioOferta: producto.precioOferta,
      nombre: producto.nombre,
    };
    console.log(item);
    this.serv.agregarProducto(item);
  }
  guardarLocalStorage() {
    const arraycesta = this.serv.getProductos();
    // devuelve un array en string para poder guardar en memoria
    localStorage.setItem('arraycesta', JSON.stringify(arraycesta));
  }
}
