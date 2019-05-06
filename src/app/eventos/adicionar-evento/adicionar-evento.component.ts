import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Evento, Categoria, Endereco } from '../evento';
import { GenericValidartor } from 'src/app/utils/generic-form-validator';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';



@Component({
  selector: 'app-adicionar-evento',
  templateUrl: './adicionar-evento.component.html',
  styleUrls: ['./adicionar-evento.component.css']
})
export class AdicionarEventoComponent implements OnInit,  AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
 

  public errors: any[] = [];
  public eventoForm: FormGroup;
  evento: Evento;
  categorias: Categoria[];

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidartor;

  constructor(private fb: FormBuilder, private router: Router) {
    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido.',
        minlength: 'O Nome presica ter no mínimo 2  caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      dataInicio:{
        required: 'Informe a data de início'
      },
      dataFim:{
        required: 'Informe a data de encerramento'
      },
      categoriaId:{
        required: 'Informe a categoria'
      },
    };
    this.genericValidator = new GenericValidartor(this.validationMessages);
    this.evento = new Evento();
    this.evento.endereco = new Endereco();
   }

  ngOnInit() {
    this.eventoForm = this.fb.group({
      nome:['',[Validators.required, Validators.minLength(2),Validators.maxLength(150)]],
      categoriaId: ['', Validators.required],
      descricaoCurta: '',
      descricaoLonga: '',
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      gratuito: '',
      valor: '0',
      online: '',
      nomeEmpresa: '',
      logradouro: '',
      numero: '', 
      complemento: '',
      bairro: '',
      cep: '',
      cidade: '',
      estado: '',
    });
  } 

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((FormControl: ElementRef) => fromEvent(FormControl.nativeElement, 'blur'));

      merge(this.eventoForm.valueChanges, ...controlBlurs).pipe(debounceTime(100)).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.eventoForm);
    });
  }

  adicionarEvento(){
    if(this.eventoForm.dirty && this.eventoForm.valid){
      //let user = this.eventoService.obterUsuario();
    }
  }

}
