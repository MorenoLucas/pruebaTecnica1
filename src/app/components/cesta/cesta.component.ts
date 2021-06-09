import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css'],
})
export class CestaComponent implements OnInit {
  totalAPagar: number;
  constructor(private serv: ServiciosService) {}

  ngOnInit(): void {
    this.serv.importeFina.subscribe((importe) => {
      this.totalAPagar = importe;
    });
  }
}
