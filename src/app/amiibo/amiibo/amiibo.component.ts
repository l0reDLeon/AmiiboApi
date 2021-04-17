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
  apiResponse:ApiModels.RootObject;
  Amiibo:AmiiboViewModel[];
  urlApi:string;

  ngOnInit(): void {
    this.urlApi = '';
  }

  callApi(){
    fetch(`https://www.amiiboapi.com/api/amiibo/?name=${this.urlApi}`).then(response => response.json())
    .then((data : ApiModels.RootObject) => {//aquí data es un arreglo
      this.apiResponse=data;
    });
    console.log("callApi dice: Se llamó a la api");
    console.log(`callApi dice: nombre = ${this.urlApi}`);
    console.log(`callApi dice: Url= https://www.amiiboapi.com/api/amiibo/?name=${this.urlApi}`);
  }

  send(){
    var nombre = (<HTMLInputElement>document.getElementById("nombreAmiibo")).value;
    this.urlApi = nombre;
    this.callApi();
    this.urlApi='';
    console.log(`send dice: Url= ${this.urlApi}`);
  }

}
