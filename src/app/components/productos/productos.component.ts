import { Component, OnInit } from '@angular/core';
import { products } from '../../../assets/productos.json';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  productos;
  constructor() {
    this.productos = products;
  }

  ngOnInit(): void {}

  agregar() {}
}
