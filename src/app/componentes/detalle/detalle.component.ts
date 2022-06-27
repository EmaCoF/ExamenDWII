import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';
import { CatalogoComponent } from '../catalogo/catalogo.component';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
 Producto : any;
 ID!: number;
 Cargando : boolean = true;

  constructor( private router:Router, public _servicio : InfoPaginaService, private Arouter : ActivatedRoute) 
  {
    this.Arouter.params.subscribe(params => {
      if(params ['ID'] !=null){
        this.ID = params ['ID']
      }
    });
     _servicio.getDetalle(this.ID).then(producto => {
      this.Producto = producto
      console.log(this.Producto)
       this.Cargando = false;
     })
    
  }

   ngOnInit(): void {
  }



}
