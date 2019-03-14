import { Component, OnInit } from '@angular/core';
//import { searchservice } from "../searchservice.service";
import { DataService } from "../data.service";
import { switchMap } from 'rxjs/operators';

import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { AnyFn } from '@ngrx/store/src/selector';
import { shallowEqualArrays } from '@angular/router/src/utils/collection';
import {CompanyComponent } from '../company/company.component';


const states = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District Of Columbia",
  "Federated States Of Micronesia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Marshall Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Palau",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Islands",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];

@Component({
  selector: "app-searchbar",
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.css"]
})
export class SearchbarComponent implements OnInit {
   model: String;
   currentData = [];
   arrayDisplayStocks = [];
   testhtArray = [{test: 1}, {test: 2}]
  constructor(
    private data: DataService,
  ) { }

  ngOnInit() {

  }

   searchStocks(input): Observable<any[]> {
     return this.data.searchForStock(input).pipe(map(response => {
       let tempArray = [];
       let extracted = response["bestMatches"];
       this.currentData = extracted;
      for(let i = 0; i < extracted.length; i+=1) {
        tempArray.push(`${i+1}. ${extracted[i]["2. name"]} (${extracted[i]["1. symbol"]})`);
      }
       return tempArray;
     }));
  }

  keyUpFunction(event) {
    if(event.keyCode == 13) {
      if(this.model === "") {
        return;
      } else {
        //alert('you just clicked enter');
        let temp = this.model.slice(0,1);
        let index = Number.parseInt(temp) - 1;
        //this.model = this.model.slice(3, this.model.length);
        this.arrayDisplayStocks.push(this.currentData[index])
        for(let i = 0; i < this.arrayDisplayStocks.length; i+=1) {
          console.log(`${i+1}. ${this.arrayDisplayStocks[i]["2. name"]} (${this.arrayDisplayStocks[i]["1. symbol"]})`);
        }
        console.log(this.arrayDisplayStocks)
      }
    }
  }

  // public model: String;
  // public currentData = [];
  // public arrayDisplayStocks = [];


  formatter = (result: string) => result.toUpperCase();

  search = (text$: Observable<string>) => 
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      //map(term => term === '' ? [] : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        //map(term => term === '' ? [] : this.searchStocks(term).subscribe(res => { console.log(res); res.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)}))
        //map(term => term === '' ? [] : this.testfunc(term))
        switchMap(term => term === '' ? [] : this.searchStocks(term)
          .pipe(
            map(results => results.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)) 
          )
        )

    )
  
}
