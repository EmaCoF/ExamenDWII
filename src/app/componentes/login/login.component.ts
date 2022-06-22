import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseError } from 'firebase/app';
import { InfoPaginaService } from '../../services/info-pagina.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma!:FormGroup;

  constructor(private fb:FormBuilder, private fireService:InfoPaginaService) {
    this.CrearFormulario();
    fireService.Login();
  }

  ngOnInit(): void {
  }

  CrearFormulario(){
    this.forma=this.fb.group({
      Usuario:['',[Validators.required,Validators.minLength(5)]],
      Contrasenia:['',[Validators.required]]
    })
  }

  get UsuarioError(){
    return this.forma?.get('Usuario')?.invalid && this.forma.get('Usuario')?.touched
  }
  get ContraseniaError(){
    return this.forma?.get('Contrasenia')?.invalid && this.forma.get('Contrasenia')?.touched
  }

}
