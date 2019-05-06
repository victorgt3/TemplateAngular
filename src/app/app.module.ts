import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { rootRouterConfing } from './app.routes';

//bootstrap
import {CollapseModule} from "ngx-bootstrap/collapse";
import { CarouselModule } from 'ngx-bootstrap/carousel';

//shared components
import { FooterComponent } from './shared/footer/footer.component';
import { MenuSuperiorComponent } from './shared/menu-superior/menu-superior.component';
import { MainPrincialComponent } from './shared/main-princial/main-princial.component';
import { MenuLoginComponent } from './shared/menu-login/menu-login.component';

// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { HomeComponent } from './home/home.component';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './usuario/login/login.component';
import { OrganizadorService } from './usuario/organizador.service';
import { AdicionarEventoComponent } from './eventos/adicionar-evento/adicionar-evento.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuSuperiorComponent,
    MainPrincialComponent,
    ListaEventosComponent,
    MenuLoginComponent,
    HomeComponent,
    InscricaoComponent,
    LoginComponent,
    AdicionarEventoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    RouterModule.forRoot(rootRouterConfing, { useHash: false}),
    BrowserAnimationsModule
  ],
  providers: [
    OrganizadorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
