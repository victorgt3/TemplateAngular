import { Routes } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { LoginComponent } from './usuario/login/login.component';
import { AdicionarEventoComponent } from './eventos/adicionar-evento/adicionar-evento.component';
import { AuthService } from './shared/auth-service';

export const rootRouterConfing: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'eventos', component: ListaEventosComponent},
    {path: 'inscricao', component: InscricaoComponent},
    {path: 'login', component: LoginComponent},
    {path: 'novo-evento', canActivate: [AuthService], component: AdicionarEventoComponent, data: [{ claim:{nome: 'Eventos', valor: 'Gravar'}}]},

]