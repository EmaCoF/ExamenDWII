import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { CatalogoComponent } from './componentes/catalogo/catalogo.component';
import { LoginComponent } from './componentes/login/login.component';
import { ListaDeseosComponent } from './catalogo/lista-deseos/lista-deseos.component';

const app_routes: Routes = [
  {path: 'Home', component: HomeComponent},
  {path: 'Detalle/:ID', component:DetalleComponent},
  {path:'Login',component:LoginComponent},
  {path:'Login/:estado',component:LoginComponent},
  {path:'Catalogo',component:CatalogoComponent},
  {path:'ListaDeseos',component:ListaDeseosComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'Home'}
];

@NgModule({
  imports: [RouterModule.forRoot(app_routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
