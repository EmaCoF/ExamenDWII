import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class InfoPaginaService {
  cargada = false;
  InfoProd : any = [];
  InfoDet : any = [];

  constructor(private http: HttpClient) { 
    this.cargarProducto();
    this.cargarDetalle()
  }

  cargarProducto()
  {
    this.http.get('https://angulardemo-a7369-default-rtdb.firebaseio.com/productos_subarashijp.json')
    .subscribe( (resp) => 
    {
      this.cargada = true;
      this.InfoProd = resp;
      console.log(resp);
    });
  }
  cargarDetalle()
  {
    this.http.get('https://angulardemo-a7369-default-rtdb.firebaseio.com/detalle_subarashijp.json')
    .subscribe( (resp) =>
    {
      this.cargada = true;
      this.InfoDet = resp;
      console.log(resp);
    })
  }
  getQuery (query : string)
  {
    const url = `https://angulardemo-a7369-default-rtdb.firebaseio.com/detalle_subarashijp/${query}`;
  }

  getDetalle (id : string)
  {
    return this.getQuery(`${id}.json`);
  }
}
