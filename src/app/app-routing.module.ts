import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';

const app_routes: Routes = [
  {path: 'Home', component: HomeComponent},
  {path: 'Detalle', component:DetalleComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'Home'}
];

@NgModule({
  imports: [RouterModule.forRoot(app_routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
