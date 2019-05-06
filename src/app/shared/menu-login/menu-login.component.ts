import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: []
})
export class MenuLoginComponent implements OnInit {

  public token;
  public user;
  public nome: string = "";

  constructor(private router: Router) {
    this.token = localStorage.getItem('eio.token');
    this.user = JSON.parse(localStorage.getItem('eio.user'));
   }

   usuarioLogado(): boolean{
     return this.token !== null;
   }

   lougout(){
     localStorage.removeItem('eio.token');
     localStorage.removeItem('eio.user');
     this.router.navigateByUrl('/home');
   }

  ngOnInit() {
     if(this.user){
      this.nome = this.user.email; 
    }
  }
}
