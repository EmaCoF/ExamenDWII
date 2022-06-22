import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getDatabase,ref,set,child,get} from "firebase/database";
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

  Login(){
    var Refusuario = ref(getDatabase());
    get(child(Refusuario,'Usuarios')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    
  }
}
