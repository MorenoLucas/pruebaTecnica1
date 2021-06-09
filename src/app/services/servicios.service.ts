import { Injectable } from '@angular/core';
import { CestaItem } from '../interfeces/cesta-item';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  productos: CestaItem[];
  constructor() {
    this.productos = [];
  }

  getProductos() {
    return this.productos;
  }
  setProductos(producto: CestaItem[]) {
    this.productos = [...producto];
  }
  agregarProducto(producto: CestaItem) {
    const id = this.productos.findIndex((productoParam: CestaItem) => {
      return producto.id === productoParam.id;
    });
    if (id >= 0) {
      this.productos[id].cantidad += producto.cantidad;
    } else {
      this.productos.push(producto);
    }
  }
}
