import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CestaItem } from '../interfeces/cesta-item';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  private importe$ = new BehaviorSubject<number>(
    localStorage.getItem('importePagar')
      ? parseInt(localStorage.getItem('importePagar'))
      : 0
  );
  importeFina: Observable<number>;
  productos: CestaItem[] = localStorage.getItem('arraycesta')
    ? JSON.parse(localStorage.getItem('arraycesta'))
    : [];
  constructor() {
    this.importeFina = this.importe$.asObservable();
  }
  // obtenemos la lista de productos
  getProductos() {
    return this.productos;
  }
  // establecemos la lista de productos
  setProductos(producto: CestaItem[]) {
    this.productos = [...producto];
  }
  agregarProducto(producto: CestaItem) {
    const id = this.productos.findIndex((productoParam: CestaItem) => {
      return producto.id === productoParam.id;
    });
    if (id >= 0) {
      this.productos[id].cantidad =
        this.productos[id].cantidad + producto.cantidad;
    } else {
      this.productos.push(producto);
    }
    this.importeFinal(this.calcularImporteFinal());
  }
  // calcula el importe final con los descuentos
  calcularImporteFinal() {
    let sumatorio = 0;
    this.productos.forEach((producto: CestaItem) => {
      // esta logica no me parece eficiente. ni usar switch
      if (producto.id === 'GR1') {
        sumatorio += producto.cantidad * producto.precioOferta;
      } else if (producto.id === 'SR1' && producto.cantidad >= 3) {
        sumatorio += producto.cantidad * producto.precioOferta;
      } else if (producto.id === 'CF1' && producto.cantidad >= 3) {
        sumatorio += producto.cantidad * producto.precioOferta;
      } else {
        sumatorio += producto.precio * producto.cantidad;
      }
    });
    return sumatorio;
  }
  // va actualizando el precio final
  importeFinal(precio) {
    this.importe$.next(precio);
  }
  // calcula el importe final sin el descuento
  importeSindescuento() {
    let sumatorio = 0;
    this.productos.forEach((producto: CestaItem) => {
      sumatorio += producto.precio * producto.cantidad;
    });
    return sumatorio;
  }
  deleteProductoArray(item: CestaItem) {
    // compara el objeto entero y devuelve el indice
    const index = this.productos.indexOf(item);
    // quita el producto
    this.productos.splice(index, 1);
    // logica para restar el precio
    this.importeFinal(this.calcularImporteFinal());
  }
}
