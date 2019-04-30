import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControlName, FormControl } from '@angular/forms';



import { Organizador } from 'src/app/usuario/organizador';
import {CustomValidators, CustomFormsModule} from 'ng2-validation';
import { GenericValidartor } from '../../utils/generic-form-validator';
import {Observable} from "rxjs";




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

  constructor(private fb: FormBuilder) {
    this.validationMessages = {
      nome:{
        required: 'O Nome é requerido.',
        minlength: 'O Nome presisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      cpf:{
        required: 'Informe o CPF',
        rangeLength: 'CPF  deve conter 11 caracteres'
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
      cpf: ['',[Validators.required, CustomValidators.rangeLength(11,11)]],
      email: ['',[Validators.required, CustomValidators.email]],
      senha: senha,
      senhaConfirmacao: senhaConfirmacao
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((FormControl: ElementRef) => Observable.fromEvent(FormControl.nativeElement, 'blur'));

        Observable.merge(this.inscricaoForm.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.inscricaoForm);
      });
  }
}
