import { Component, Input, OnInit } from '@angular/core';
import ApiModels from 'src/app/models/myApimodels';

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
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})

export class DisplayComponent implements OnInit {
  constructor() { }
  show:boolean=true;

  ///////
  apiResponse:ApiModels.RootObject;
  Amiibo:AmiiboViewModel[];

  @Input()
  urlApi:string;

  isOk:boolean = true;

  async ngOnInit(){
    console.log("Cargó el display");
    await this.callApi();
    console.log("Ya se uso callApi");
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async callApi(){
    const data = await fetch(`https://www.amiiboapi.com/api/amiibo/?character=mario`);
    const response:ApiModels.RootObject = await data.json();
    this.apiResponse = response;
    console.log(this.apiResponse);
    // .then(response => response.json())
    // .then((data : ApiModels.RootObject) => {//aquí data es un arreglo
    //   this.apiResponse=data;
    //   if(data.amiibo==undefined)
    //     this.isOk=false;
    // }).catch(function(err) {
    //   console.error(err);
    //   this.isOk = false;
    // });
  }

  callApiAll(){
    fetch(`https://www.amiiboapi.com/api/amiibo/`).then(response => response.json())
    .then((data : ApiModels.RootObject) => {
      this.apiResponse=data;
    })
    .catch(error => console.log("ERROR"));
  }

  // send(){
  //   this.isOk=true;
  //   var nombre = (<HTMLInputElement>document.getElementById("nombreAmiibo")).value;
  //   this.urlApi = nombre;

  //   if(nombre == "" || nombre==null || nombre==undefined)
  //   {
  //     alert("Debe ingresar el nombre del amiibo que desea buscar");
  //   }
  //   else {
  //     this.callApi();
  //     console.log("Data: "+this.apiResponse.amiibo[0].name);
  //     this.show=true;

  //   }

  //   this.urlApi='';
  // }

  sendAll(){
    this.isOk=true;
    (<HTMLInputElement>document.getElementById("nombreAmiibo")).value="";
    this.callApiAll();
  }
}
