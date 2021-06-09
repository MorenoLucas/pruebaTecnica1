import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  productos;
  constructor() {}
  getProductos() {
    return this.productos;
  }
  setProductos(producto) {
    this.productos = [...producto];
  }
  agregarProducto(producto) {
    const id = this.productos.findIndex((productoParam) => {
      return this.productos.id === productoParam.id;
    });
    if (id >= 0) {
      this.productos[id].cantidad += producto.cantidad;
    } else {
      this.productos.push(producto);
    }
  }
}
