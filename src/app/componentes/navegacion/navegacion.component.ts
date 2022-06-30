import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  Sesion:boolean=false;
  constructor(private router:Router) {
    if (sessionStorage.getItem('Usuario')==null) {
      this.Sesion=false
    }else{
      if (sessionStorage.getItem('Usuario')=='null') {
        this.Sesion=false
      }else{
        this.Sesion=true
      }
    }

   }

  ngOnInit(): void {
  }

  CerrarSession(){
    console.log("no")
    sessionStorage.setItem('Usuario','null')
    window.location.reload();
  }
}
