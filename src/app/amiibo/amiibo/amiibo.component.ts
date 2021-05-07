import { ApiModels } from "src/app/models/myApimodels";
import { Component, OnInit } from '@angular/core';

interface Release {
  au?: string;
  eu?: string;
  jp?: string;
  na?: string;
}

interface AmiiboViewModel{
    amiiboSeries: string;
    character: string;
    image: string;
    name: string;
    release?: Release;
}

@Component({
  selector: 'app-amiibo',
  templateUrl: './amiibo.component.html',
  styleUrls: ['./amiibo.component.css']
})

export class AmiiboComponent implements OnInit {
  constructor() { }
  apiResponse:ApiModels.RootObject=undefined;
  Amiibo:AmiiboViewModel[];
  urlApi:string;


  show: boolean = false;
  isOk:boolean = true;


  ngOnInit(){
    this.urlApi = '';
  }

  callApi(){
    fetch(`https://www.amiiboapi.com/api/amiibo/?character=${this.urlApi}`).then(response => response.json())
    .then((data : ApiModels.RootObject) => {//aquí data es un arreglo
      this.apiResponse=data;
      if(data.amiibo==undefined)
        this.isOk=false;
    }).catch(function(err) {
      console.error(err);
      this.isOk = false;
    });
    // console.log("callApi dice: Se llamó a la api");
    // console.log(`callApi dice: personaje = ${this.urlApi}`);
    // console.log(`callApi dice: Url= https://www.amiiboapi.com/api/amiibo/?character=${this.urlApi}`);
    // if(this.apiResponse==undefined || this.apiResponse==null) alert("No se encontró el Amiibo");
  }

  callApiAll(){
    fetch(`https://www.amiiboapi.com/api/amiibo/`).then(response => response.json())
    .then((data : ApiModels.RootObject) => {//aquí data es un arreglo
      this.apiResponse=data;
    })
    .catch(error => console.log("ERROR"));
    // console.log("callApi dice: Se llamó a la api");
    // console.log(`callApi dice: Url= https://www.amiiboapi.com/api/amiibo/`);
  }

  send(){
    // this.show=false;
    this.isOk=true;
    var nombre = (<HTMLInputElement>document.getElementById("nombreAmiibo")).value;
    this.urlApi = nombre;
    console.log(nombre);
    this.show=true;

    console.log(this.show);
    if(nombre == "" || nombre==null || nombre==undefined)
    {
      alert("Debe ingresar el nombre del amiibo que desea buscar");
    }
    this.urlApi='';
    this.show=true;
  }

  sendAll(){
    this.isOk=true;
    (<HTMLInputElement>document.getElementById("nombreAmiibo")).value="";
    this.callApiAll();
  }
}
