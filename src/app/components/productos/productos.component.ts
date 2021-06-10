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
    let totalAPagar;
    if (producto.id === 'GR1' && cantidad % 2 == 0) {
      totalAPagar = producto.precio * producto.precioOferta;
    } else if (producto.id === 'SR1' && cantidad >= 3) {
      totalAPagar = producto.precio * producto.precioOferta;
    } else if (producto.id === 'CF1' && cantidad >= 3) {
      totalAPagar = producto.precio * producto.precioOferta;
    } else {
      totalAPagar = producto.precio * cantidad;
    }

    const item: CestaItem = {
      id: producto.id,
      cantidad:
        producto.id === 'GR1' && cantidad % 2 !== 0
          ? parseInt(cantidad) * 2
          : parseInt(cantidad),
      precio: producto.precio,
      precioOferta: producto.precioOferta,
      nombre: producto.nombre,
      total: totalAPagar,
    };
    console.log(item);
    this.serv.agregarProducto(item);
    this.guardarLocalStorage();
  }
  guardarLocalStorage() {
    const arraycesta = this.serv.getProductos();
    // devuelve un array en string para poder guardar en memoria
    localStorage.setItem('arraycesta', JSON.stringify(arraycesta));
  }
}
