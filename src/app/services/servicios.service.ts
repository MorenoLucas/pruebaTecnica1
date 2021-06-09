import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CestaItem } from '../interfeces/cesta-item';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  productos: CestaItem[];
  private importe$ = new BehaviorSubject<number>(
    localStorage.getItem('importePagar')
      ? parseInt(localStorage.getItem('importePagar'))
      : 0
  );
  importeFina: Observable<number>;
  constructor() {
    this.productos = [];
    this.importeFina = this.importe$.asObservable();
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
      this.productos[id].cantidad =
        this.productos[id].cantidad + producto.cantidad;
    } else {
      this.productos.push(producto);
    }
    this.importeFinal(this.calcularImporteFinal());
  }
  calcularImporteFinal() {
    let sumatorio = 0;
    this.productos.forEach((producto: CestaItem) => {
      // esta logica no me parece eficiente. ni usar switch
      if (producto.id === 'GR1' && producto.cantidad % 0) {
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
  importeFinal(precio) {
    this.importe$.next(precio);
  }
}
