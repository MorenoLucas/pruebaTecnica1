import { Component, OnInit } from '@angular/core';
import { CestaItem } from 'src/app/interfeces/cesta-item';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  productosCesta: CestaItem[] = [];
  constructor(private serv: ServiciosService) {}

  ngOnInit(): void {
    this.productosCesta = this.serv.getProductos();
  }
}
