import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CestaItem } from 'src/app/interfeces/cesta-item';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  productosCesta: CestaItem[] = [];
  totalAPagar: number;
  constructor(private serv: ServiciosService, private router: Router) {}

  ngOnInit(): void {
    this.productosCesta = this.serv.getProductos();
    this.serv.importeFina.subscribe((importe) => {
      this.totalAPagar = importe;
      localStorage.setItem('importePagar', this.totalAPagar.toString());
    });
  }
  borrarItem(cestaItem: CestaItem) {
    this.serv.borrarProductoArray(cestaItem);
    this.guardarLocalStorage();
  }

  guardarLocalStorage() {
    const arraycesta = this.serv.getProductos();
    localStorage.setItem('arraycesta', JSON.stringify(arraycesta));
  }
  goCesta() {
    this.router.navigateByUrl('/cesta');
  }
}
