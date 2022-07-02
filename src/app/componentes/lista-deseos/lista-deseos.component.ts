import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { async } from '@firebase/util';
import { timeout } from 'rxjs';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';

@Component({
  selector: 'app-lista-deseos',
  templateUrl: './lista-deseos.component.html',
  styleUrls: ['./lista-deseos.component.css']
})
export class ListaDeseosComponent implements OnInit {

  Existencias:Boolean;
  Carga: Boolean;
  ListaDeseos: any[];
  Usuario:any;
  constructor(private router:Router, public _servicio : InfoPaginaService,private http: HttpClient) {
    this.ListaDeseos=new Array;
    this.Carga=false;
    this.Existencias=false;

    this.Usuario = sessionStorage.getItem('Usuario')
    if (this.Usuario==null || this.Usuario=="null") {
      this.router.navigate(['/Home'])
    }
    

    //carga la lista de deseos
    _servicio.GetListaDeseos(this.Usuario).then(async(Producto:Array<any>)=>{
        if (Producto!=null && Object.values(Producto).length) {
        Object.values(Producto).forEach( async element => {
         
          var obj: any= _servicio.InfoProd[element];
          obj.index=element;
          obj.EstrellasA=Array(obj.Valoracion).fill(0)
          obj.EstrellasN=Array(5-obj.Valoracion).fill(0)
          this.ListaDeseos.push(obj)
        });
        this.ListaDeseos.sort((a,b)=>{
          if (a.Valoracion<b.Valoracion) {
            return 1;
          }

          if (a.Valoracion>b.Valoracion) {
            return -1;
          }
          return 0
        })
        console.log(this.ListaDeseos)
        this.Existencias=true
        this.Carga=true;
      }
      console.log(this.Existencias)
      
      //espera a terminar el ciclo
      
    })

   }

  ngOnInit(): void {
  }

  //Busca el producto del index enviado
  AgregarProducto(ID:any){
    this.http.get('https://proyectodwii-default-rtdb.firebaseio.com/Productos/'+ID+'.json')
    .subscribe( (resp) => 
    {
      var obj: any=resp;
      obj.index=ID;
      this.ListaDeseos.push(obj)
      
      console.log(ID)
    });

  }

  Detalle(id:number){
    this.router.navigate(['/Detalle',id])
  }



}
