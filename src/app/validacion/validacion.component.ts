import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.css']
})
export class ValidacionComponent implements OnInit {

  form: FormGroup;
  estado:string='';
  estadoMostrar:string='';
  mostrarMensaje:boolean=false;

  rangoSuperior:string;
  rangoInferior:string;
  categoria1:string;
  categoria2:string;
  categoria3:string;

  constructor() { 
    this.rangoInferior='2000';
    this.rangoSuperior='5000';
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = new FormGroup({
      rangoSuperior: new FormControl(this.rangoSuperior, [Validators.required]),
      rangoInferior: new FormControl(this.rangoInferior, [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      categoria1: new FormControl('ALTO', [Validators.required]),
      categoria2: new FormControl('MEDIO', [Validators.required]),
      categoria3: new FormControl('BAJO', [Validators.required])
    });

    this.form.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      console.log(value);
    });
  }

  save(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    this.mostrarMensaje=true;
    this.validarPrecio(value);
    
    this.rangoSuperior=value.rangoSuperior;
    this.rangoInferior=value.rangoInferior;
  }

  validarPrecio(value){

    if(value.rangoSuperior<0||value.rangoInferior<0||value.precio<0){
      console.log("CERO");
      this.estado='ESCERO';
    }else if(value.rangoSuperior<=value.rangoInferior){
      this.estado='ERROR';
    }else{
      if(value.precio>=value.rangoSuperior){
        this.estadoMostrar=value.categoria1;
        this.estado='ALTO';
       }else if(value.precio<value.rangoInferior){
        this.estadoMostrar=value.categoria3;
         this.estado='BAJO';
       }else{
        this.estadoMostrar=value.categoria2;
         this.estado='MEDIO';
       }
    }

  

    
  }
}
