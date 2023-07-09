import { Component, OnInit } from '@angular/core';
import { AtributosService } from './atributos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  atributos: any;
  selectedFile: File | undefined;
  previewUrl: any;


  atr = {
    codigo:0,
    nombre:"",
    descripcion:"",
    tipo:"",
    peso:0
  }

  constructor(private atributosServicios: AtributosService){}


  ngOnInit() {
    this.recuperarTodos();
  }

  recuperarTodos(){
    this.atributosServicios.recuperarTodos().subscribe((result:any) => this.atributos = result);
  }

  alta(){
    this.atributosServicios.alta(this.atr).subscribe((datos:any) => {
      if (datos['resultado'] =='OK'){
        alert(datos['mensaje']);
        this.recuperarTodos();
      }
    });
  }

  baja(codigo:number){
    this.atributosServicios.baja(codigo).subscribe((datos:any) => {
      if (datos['resultado']=='OK') {
        alert(datos['mensaje']);
        this.recuperarTodos();
      }
    });
  }

  modificar(){
    this.atributosServicios.modificar(this.atr).subscribe((datos:any) => {
      if (datos['resultado'] == 'OK') {
        alert(datos['mensaje']);
        this.recuperarTodos();
      }
    });
  }

  seleccionar(codigo:number){
    this.atributosServicios.seleccionar(codigo).subscribe((result:any) => this.atr = result[0]);
  }

  hayRegistros(){
    return true;
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}


