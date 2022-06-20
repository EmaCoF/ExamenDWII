import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  detalle: any  = {};
  loadingArtist = false;

  constructor(private router : ActivatedRoute, public _servicio : InfoPaginaService) 
  {
    this.loadingArtist = true;
    this.router.params.subscribe(params => {
      // this.getDetalle(params['id']);
    });
   }

   ngOnInit(): void {
  }
  // getDetalle(id: string) {
  //   this.loadingArtist = true;
  //   this.servicio.getDetalle(id).subscribe(
  //     detalle => {
  //       console.log(detalle);
  //       this.detalle = detalle;
  //       this.loadingArtist = false;
  //     }
  //   );
  // }

}
