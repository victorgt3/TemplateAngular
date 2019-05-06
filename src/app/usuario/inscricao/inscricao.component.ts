import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { fromEvent } from 'rxjs';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Organizador } from 'src/app/usuario/organizador';
import {CustomValidators} from 'ng2-validation';
import { GenericValidartor } from '../../utils/generic-form-validator';
import { Router } from '@angular/router';
import { OrganizadorService } from '../organizador.service';



@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.css']
})
export class InscricaoComponent implements OnInit, AfterViewInit {
@ViewChildren(FormControlName, {read: ElementRef }) formInputElements: ElementRef[];

  public errors: any[] = [];
  public inscricaoForm: FormGroup;
  public organizador: Organizador;

  constructor(private fb: FormBuilder,
              private router: Router,
              private organizadorServive: OrganizadorService) {
    this.validationMessages = {
      nome:{
        required: 'O Nome é requerido.',
        minlength: 'O Nome presisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      cpf:{
        required: 'Informe o CPF',
        minlength: 'CPF  deve conter 11 caracteres'
      },
      email:{
        required: 'Informe o e-mail',
        email: 'Email invalido'
      },
      senha:{
        required: 'Informe a senha',
        minlength: 'a senha deve possuir no mínimo 6 caracteres'
      },
      senhaConfirmacao:{
        required: 'Informe a senha novamente',
        minlength: 'A senha deve possuir no mínimo 6  caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    this.genericValidator = new GenericValidartor(this.validationMessages);
    this.organizador = new Organizador();
   }

   displayMessage: {[key: string]: string} = {};
   private validationMessages: { [key: string]: {[key: string]: string } };
   private genericValidator: GenericValidartor;

  ngOnInit() {
    let senha = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let senhaConfirmacao = new FormControl('',[Validators.required, Validators.minLength(6), CustomValidators.equalTo(senha)]);

    this.inscricaoForm = this.fb.group({
      nome:['',[Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      cpf: ['',[Validators.required, Validators.minLength(11)]],
      email: ['',[Validators.required, CustomValidators.email]],
      senha: senha,
      senhaConfirmacao: senhaConfirmacao
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((FormControl: ElementRef) => fromEvent(FormControl.nativeElement, 'blur'));

        merge(this.inscricaoForm.valueChanges, ...controlBlurs).pipe(debounceTime(100)).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.inscricaoForm);
      });
  }

  adicionarOrganizador() {
    if (this.inscricaoForm.dirty && this.inscricaoForm) {
      let p = Object.assign({}, this.organizador, this.inscricaoForm.value);
      p.password = p.senha;
      p.ConfirmPassword = p.senhaConfirmacao;


      this.organizadorServive.registrarOrganizador(p)
        .subscribe(
          result => {this.onSaveComplete(result)},
          error => {
            this.errors = JSON.parse(error._body).errors;
          });
    }
  } 

   onSaveComplete(response: any): void {
    this.inscricaoForm.reset();
    this.errors = [];

    localStorage.setItem('eio.token', response.data.access_token);
    localStorage.setItem('eio.user', JSON.stringify(response.data.user));
    
   // this.router.navigateByUrl('/proximos-eventos');
  } 

  ngOnDestroy(): void {
    //throw new Error('Methos not implemented.');
  }
}
