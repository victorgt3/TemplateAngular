import { BrowserModule, Title } from '@angular/platform-browser';
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
import { SeoService } from './services/seo.service';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuSuperiorComponent,
    MainPrincialComponent,
    ListaEventosComponent,
    MenuLoginComponent,
    HomeComponent,
    InscricaoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    RouterModule.forRoot(rootRouterConfing, { useHash: false})
  ],
  providers: [
    Title,
    SeoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
