import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getDatabase,ref,set,child,get,query,orderByChild,equalTo, onValue} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA803MnEQ1LAGbR0qlODMNBzb2CFeWgP6k",
  authDomain: "proyectodwii.firebaseapp.com",
  databaseURL: "https://proyectodwii-default-rtdb.firebaseio.com",
  projectId: "proyectodwii",
  storageBucket: "proyectodwii.appspot.com",
  messagingSenderId: "632417670908",
  appId: "1:632417670908:web:af9fd215d977547c456979",
  measurementId: "G-N74W1D3QRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

@Injectable({
  providedIn: 'root'
})

export class InfoPaginaService {
  cargada = false;
  InfoProd : any = [];
  InfoHome : any = [];

  constructor(private http: HttpClient) { 
    this.cargarProducto();
   
  }
  cargarProducto()
  {
    this.http.get('https://proyectodwii-default-rtdb.firebaseio.com/Productos.json')
    .subscribe( (resp) => 
    {
      this.cargada = true;
      this.InfoProd = resp;
      console.log(resp);
    });
  }




  
  async Login(usuario:any,Contrasenia:any):Promise<boolean>{
    var Refusuario = ref(getDatabase());

    return get(child(Refusuario,'Usuarios/'+usuario+'/Contrasenia')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.key);
        console.log(snapshot.val());
        if(snapshot.val()==Contrasenia){
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    }).catch((error) => {
      console.error(error);
      return true
    });
  }

  
  async getDetalle(id:number):Promise<any>{
    var Refusuario = ref(getDatabase());

    return get(child(Refusuario,'Productos/'+id)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null
      }
    }).catch((error) => {
      console.error(error);
      return null
    });
  }

  async GetListaDeseos(Usuario:string):Promise<any>{
    var Refusuario = ref(getDatabase());
    return get(child(Refusuario,'Usuarios/'+Usuario+'/ListaDeseos')).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null
      }
    }).catch((error) => {
      console.error(error);
      return null
    });
  }

  async GetListaDeseosExist(Usuario:string,ID:number):Promise<Boolean>{
    var Refusuario = ref(getDatabase());
    return get(child(Refusuario,'Usuarios/'+Usuario+'/ListaDeseos/'+ID)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        return true;
      } else {
        return false
      }
    }).catch((error) => {
      console.error(error);
      return false
    });
  }

  async AgregarListaDeseos(Usuario:string,ID:number):Promise<Boolean>{
    var Verificador=false;
    console.log("1");
    await set(ref(db, 'Usuarios/'+Usuario+'/ListaDeseos/' + ID),ID).then(() => {
       Verificador= true;
       console.log("2");
    })
    .catch((error) => {
      Verificador= false;
      console.log("3");
    });;
    return Verificador
    console.log("4");
  }

  async EliminarListaDeseos(Usuario:string,ID:number):Promise<Boolean>{
    var Verificador=false;
    await set(ref(db, 'Usuarios/'+Usuario+'/ListaDeseos/' + ID),null).then(() => {
       Verificador= true;
    })
    .catch((error) => {
      Verificador= false;
    });;
    return Verificador
  }




}



