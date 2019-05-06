import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Organizador } from '../organizador';
import { GenericValidartor } from 'src/app/utils/generic-form-validator';
import { CustomValidators } from 'ng2-validation';
import { merge, fromEvent, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
//import { OrganizadorService } from '../organizador.service';
import { Router } from '@angular/router';
import { OrganizadorService } from '../organizador.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public errors: any[] = [];
  loginForm: FormGroup;
  organizador: Organizador;

  constructor(private fb: FormBuilder,
    private organizadorServive: OrganizadorService,
    private router: Router) {

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email invalido'
      },
      senha: {
        required: 'Informe a senha',
        minlength: 'A senha deve possuir no mínino 6 caracteres'
      }
    };
    this.genericValidator = new GenericValidartor(this.validationMessages);
    this.organizador = new Organizador();
  }

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidartor;

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((FormControl: ElementRef) => fromEvent(FormControl.nativeElement, 'blur'));

    merge(this.loginForm.valueChanges, ...controlBlurs).pipe(debounceTime(100)).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    });
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      let p = Object.assign({}, this.organizador, this.loginForm.value);
      p.password = p.senha;
      

      this.organizadorServive.login(p)
        .subscribe(
                    result => {
            this.onSaveComplete(result)
          },
          error => {          
            this.errors = JSON.parse(error._body).errors;
          });
    }
  }

  onSaveComplete(response: any): void {
    this.loginForm.reset();
    this.errors = [];

    localStorage.setItem('eio.token', response.data.access_token);
    localStorage.setItem('eio.user', JSON.stringify(response.data.user));

    this.router.navigate(['/proximos-eventos']);
  }
}
