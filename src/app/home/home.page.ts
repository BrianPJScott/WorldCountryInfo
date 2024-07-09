import { Component } from '@angular/core';
//import { IonHeader, IonToolbar, IonTitle, IonContent, IonList } from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, FormsModule],
  
})
export class HomePage {

  countryData !: any;
  countryNames!: any;
  myName !: any;
  myOfficial !: any;
  myCurrencies !: any;
  myCapital !: any;
  myPopulation !: any;
  myLanguages !: any;
  myFlags !: any;
  mylatlng !: any;

  options: HttpOptions = {
    url: 'https://restcountries.com/v3.1/all'
  }

  constructor(private mhs: MyHttpService, private ds: DataService, private router: Router) { 
    this.countryNames = [];
    this.countryData = "";
    this.myName = "";
    this.myOfficial = "";
    this.myCurrencies = "";
    this.myCapital = "";
    this.myPopulation = "";
    this.myLanguages = "";
    this.myFlags = "";
    this.mylatlng = "";
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.getCountryData();
  }

  private async getCountryData() {
    let results = await this.mhs.get(this.options);
    this.countryData = results.data;
  }

  async openCountryDetails(clickedCountry: string) {
    this.findCountryDetails(clickedCountry);
    this.router.navigate(['/country-details'])
  }

  async findCountryDetails(countryName: string){

    for (const country in this.countryData){
      
      if(this.countryData[country].name.common == countryName){
        await this.ds.set("keyName", this.countryData[country].name.common);
        await this.ds.set("keyOfficial", this.countryData[country].name.official);
        await this.ds.set("keyCurrencies", this.countryData[country].currencies);
        await this.ds.set("keyCapital", this.countryData[country].capital);
        await this.ds.set("keyLanguages", this.countryData[country].languages);
        await this.ds.set("keyPopulation", this.countryData[country].population);
        await this.ds.set("keyFlags", this.countryData[country].flags);
        await this.ds.set("keyCapitalInfo", this.countryData[country].capitalInfo);
      }
    }
}
}

