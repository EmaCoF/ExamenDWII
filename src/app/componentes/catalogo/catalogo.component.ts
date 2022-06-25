import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {


  constructor(private router:Router, public _servicio : InfoPaginaService) { }

  ngOnInit(): void {
  }

  Detalle(id:number){
    this.router.navigate(['/Detalle',id])
  }
}
