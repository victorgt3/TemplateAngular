import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, Router } from '@angular/router';


@Injectable()
export class AuthService implements CanActivate {
    public token: string;
    public route;
    public user;

   
    constructor(private router: Router){


        this.token = localStorage.getItem('eio.token');
        this.user = localStorage.getItem('eio.user');
    }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       if(!this.token){
           this.router.navigate(['/login'])
           return false;
       }

       return true;

   }

}