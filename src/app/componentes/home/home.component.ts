import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoPaginaService } from '../../services/info-pagina.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {



  constructor(public _servicio : InfoPaginaService, private Arouter : ActivatedRoute) {
   
  }

  ngOnInit(): void {
  }

}
