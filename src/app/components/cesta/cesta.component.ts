import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css'],
})
export class CestaComponent implements OnInit {
  totalAPagar: number;
  productosFinal;
  totalSinDescuento: number;
  pagado: boolean = false;
  constructor(private serv: ServiciosService, private router: Router) {}

  ngOnInit(): void {
    this.productosFinal = this.serv.getProductos();
    this.serv.importeFina.subscribe((importe) => {
      this.totalAPagar = importe;
    });
    this.totalSinDescuento = this.serv.importeSindescuento();
  }

  pagar() {
    this.pagado = true;
  }
  goHome() {
    this.router.navigateByUrl('/');
  }
}
