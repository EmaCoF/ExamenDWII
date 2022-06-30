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
 Usuario:any;
 Sesion:Boolean;
 Producto : any;
 ID!: number;
 Cargando : boolean = true;
 Deseo: Boolean;

  constructor( private router:Router, public _servicio : InfoPaginaService, private Arouter : ActivatedRoute) 
  {
    this.Sesion=false;
    this.Deseo=false;
    this.Arouter.params.subscribe(params => {
      if(params ['ID'] !=null){
        this.ID = params ['ID']
      }
    
    });

    this.Usuario = sessionStorage.getItem('Usuario')
    if (this.Usuario==null) {
      this.Sesion=false;
    }else  if (this.Usuario=='null') {
      this.Sesion=false;
    }else{
      this,this.Sesion=true;
    }

    //Verificar si esta en lista de deseos
    _servicio.GetListaDeseosExist(this.Usuario,this.ID).then(val=>{
      if (val==true) {
        this.Deseo=true;
        console.log(this.Deseo)
      }
    });
    //Obtener producto
    _servicio.getDetalle(this.ID).then(producto => {
      this.Producto = producto
       this.Cargando = false;
    })

  }

   ngOnInit(): void {
  }

  AgregarListaDeseos(){
    const Btn = document.getElementById('btnAdd');
    Btn?.classList.add('disabled');

    console.log("h1");
    this._servicio.AgregarListaDeseos(this.Usuario,this.ID).then(val=>{
      if (val==true) {
        this.Deseo=true
      }
    });
    Btn?.classList.remove('disabled');
  }

  EliminarListaDeseos(){
    const Btn = document.getElementById('btnDel');
    Btn?.classList.add('disabled');
    this._servicio.EliminarListaDeseos(this.Usuario,this.ID).then(val=>{
      if (val==true) {
        this.Deseo=false
      }
    });
    Btn?.classList.remove('disabled');
  }



}
