import { partitionArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { InfoPaginaService } from '../../services/info-pagina.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  fallo:Boolean;
  forma!:FormGroup;

  constructor(private routerRec:ActivatedRoute, private router:Router, private fb:FormBuilder, private fireService:InfoPaginaService) {
    this.fallo=false;
    this.CrearFormulario();
    
    // Verificar si no hay error
    
    this.routerRec.params.subscribe(params=>{
      if(params['estado']!=null){
        var  verificador: Boolean =params['estado'];
        this.fallo=verificador;
      }  
    });
  }

  ngOnInit(): void {}

  
  //LLamar a firebase para comprobar
  Ingresar(){
    var user=this.forma?.get('Usuario')?.value
    var pass=this.forma?.get('Contrasenia')?.value
    this.fireService.Login(user,pass).then(val=>{
      if (val==false) {
        sessionStorage.setItem('Usuario',user)
        this.router.navigate(['/Catalogo'])
      }
      else {
        console.log(val);        
        this.router.navigate(['/Login',val]);
        if (Boolean(this.fallo)==true) {
          
          window.location.reload();
        }
      }
    });
    
  }
  CrearFormulario(){
    
    this.forma=this.fb.group({
      Usuario:['',[Validators.required,Validators.minLength(5)]],
      Contrasenia:['',[Validators.required]]
    });
  }

  get UsuarioError(){
    return this.forma?.get('Usuario')?.invalid && this.forma.get('Usuario')?.touched
  }
  get ContraseniaError(){
    return this.forma?.get('Contrasenia')?.invalid && this.forma.get('Contrasenia')?.touched
  }

}
