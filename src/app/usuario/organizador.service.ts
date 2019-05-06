import { Injectable } from "@angular/core";
import { Organizador } from './organizador';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class OrganizadorService{
    constructor(private http: HttpClient){
       
    }

    registrarOrganizador(organizador: Organizador): Observable<Organizador>{
       const httpOptions = 
       {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',           
            })     
       };
       

        let response = this.http
            .post("http://localhost:56980/api/v1/nova-conta", organizador, httpOptions)
            .pipe(map(this.extractData))
            .pipe(catchError(this.serviceError));

        return response;
    }

    login(organizador: Organizador): Observable<Organizador>{
        const httpOptions = 
        {
             headers: new HttpHeaders({
                 'Content-Type': 'application/json',           
             })     
        };
        
 
         let response = this.http
             .post("http://localhost:56980/api/v1/conta", organizador, httpOptions)
             .pipe(map(this.extractData))
             .pipe(catchError(this.serviceError));
 
         return response;
     }


    private extractData(response: Response){
        let body = response.json();
        return body.data || {};
    }


    protected serviceError(error: Response | any){
        let errMsg: string;
        if (error instanceof Response){
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }else{
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(error);
        return Observable.throw(error);
    }
}