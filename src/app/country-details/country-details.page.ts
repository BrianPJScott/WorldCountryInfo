import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.page.html',
  styleUrls: ['./country-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CountryDetailsPage implements OnInit {

  myWeather !: any;
  myName !: any;
  myOfficial !: any;
  allCurrencies !: any;
  myCurrencies !: any[];
  myCapital !: any;
  myPopulation !: any;
  allLanguages !: any;
  myLanguages !: any[];
  myFlags !: any;
  myFlagPNG !: any;
  myCapitalInfo !: any;
  myRate !: any;
  myAmount !: any;
  myResult !: any;
  mainCurrencySym !: any;
  btnDisabled !: boolean;
  weatherOptions!: HttpOptions;
  convertOptions!: HttpOptions;
  txtConvertResult !: string;

  constructor(private mhs: MyHttpService, private ds : DataService) { 

  this.myWeather = "";
  this.myName = "";
  this.myOfficial = "";
  this.allCurrencies = "";
  this.myCurrencies = [];
  this.myCapital = "";
  this.myPopulation = "";
  this.allLanguages = "";
  this.myLanguages =  [];
  this.myFlags = "";
  this.myFlagPNG = "";
  this.myCapitalInfo = "";
  this.myRate = "";
  this.myResult = "";
  this.myAmount = "";
  this.btnDisabled = true;
  this.txtConvertResult = "";
  this.mainCurrencySym = "";
  this.weatherOptions = {url: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/38.9697,-77.385?key=G32EENLFYB7CSLATDL3DDCRBF'};
  this.convertOptions = {url: 'https://v6.exchangerate-api.com/v6/52713258f4148e85ccd263ac/pair/EUR/GBP'};

  
  }

  ngOnChanges(){
    
  }

  ngOnInit() {
    this.getDetails();

  }

  ionViewWillEnter() {
    
  }

  public async getDetails(){

    this.myName = await this.ds.get("keyName");
    this.myOfficial = await this.ds.get("keyOfficial");
    this.allCurrencies = await this.ds.get("keyCurrencies");

    for (const curr in this.allCurrencies){
      this.myCurrencies.push(this.allCurrencies[curr].name);
      if (this.mainCurrencySym == ""){
        this.mainCurrencySym = curr;
      }
    }
    
    console.log("Main Currency: " + this.mainCurrencySym);

    this.myCapital = await this.ds.get("keyCapital");
    this.allLanguages = await this.ds.get("keyLanguages");
    for (const lang in this.allLanguages){
      this.myLanguages.push(this.allLanguages[lang]);
    }

    this.myPopulation = await this.ds.get("keyPopulation");
    this.myFlags = await this.ds.get("keyFlags");
    this.myCapitalInfo = await this.ds.get("keyCapitalInfo");
    console.log("Capital info: " + this.myCapitalInfo.latlng[0] + "," + this.myCapitalInfo.latlng[1]);

    this.myFlagPNG = this.myFlags.png;

    console.log(this.myLanguages);

    this.weatherOptions = {
      url: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + this.myCapitalInfo.latlng[0] + "," + this.myCapitalInfo.latlng[1] + '?key=G32EENLFYB7CSLATDL3DDCRBF'
    }
    console.log(this.weatherOptions);
    let results = await this.mhs.get(this.weatherOptions);
    this.myWeather = results.data.description;
    console.log(this.myWeather);

}

  inputFunc(input : any){

    console.log("inputFunc Fired: " + input);
    if (input > 0){
      console.log(">> Enabling button");
      this.btnDisabled = false;
      this.myAmount = input;
    }else{
      this.btnDisabled = true;
      this.myAmount = 0;
    }
  }

  async convert(){

    this.convertOptions = {
      url: 'https://v6.exchangerate-api.com/v6/52713258f4148e85ccd263ac/pair/' + this.mainCurrencySym + "/EUR"
    }
    
    let results = await this.mhs.get(this.convertOptions);
    this.myRate = results.data.conversion_rate;
    this.myResult = this.myRate * this.myAmount;
    this.txtConvertResult = "Converting amount: " + this.myAmount + " to EUR at rate of " + this.myRate + " = €" + this.myResult;
  
  }
}