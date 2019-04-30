import { Routes } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';

export const rootRouterConfing: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'proximos-eventos', component: ListaEventosComponent},
    {path: 'inscricao', component: InscricaoComponent}

]