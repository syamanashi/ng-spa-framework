import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service';
import { Country } from '../view-models/country';

@Injectable()
export class AppDataService {

  /** This list would be coming from a data API */
  private countries: Array<Country> = [
    { id: 1, name: 'Switzerland', epiIndex: 87.67 },
    { id: 2, name: 'Luxembourg', epiIndex: 83.29 },
    { id: 3, name: 'Australia', epiIndex: 82.4 },
    { id: 4, name: 'Singapore', epiIndex: 81.78 },
    { id: 5, name: 'Czech Republic', epiIndex: 81.47 },
    { id: 6, name: 'Germany', epiIndex: 80.47 },
    { id: 7, name: 'Spain', epiIndex: 79.09 },
    { id: 8, name: 'Austria', epiIndex: 78.32 },
    { id: 9, name: 'Sweden', epiIndex: 78.09 },
    { id: 10, name: 'Norway', epiIndex: 78.04 },
  ];

  constructor(private userService: UserService) { } // UserService will be useful for future authorization considerations and with tracking who is doing what with the country data.

  /**
   * TODO: Each of these methods will make an http call to the server in production.
   * Currently, delay(2000) is used to add a 2 second wait to simulate the http request latency.
   */

  createCountry(vm: Country): Observable<any> {
    // return Observable.of({}).delay(2000).flatMap(x => Observable.throw('Unable to create country'))
    let newId = 0;
    // tslint:disable-next-line:curly
    this.countries.forEach(c => { if (c.id >= newId) newId = c.id + 1; }); // loops through each country to find the highest id, adding 1 to it.
    vm.id = newId;
    this.countries.push(vm);
    return Observable.of(vm);
  }

  deleteCountry(id: number): Observable<any> {
    // return Observable.of({}).delay(2000).flatMap(x => Observable.throw('Delete error.'));
    return Observable.of({}).delay(2000).do(e => this.countries.splice(this.countries.findIndex(c => c.id === id), 1));
  }

  /** getCountries gets the entire list of countries and returns an Observable. */
  getCountries(): Observable<any> {
    return Observable.of(this.countries);
  }

  getCountry(id: number): Observable<Country> {
    const country = this.countries.find(c => c.id === id);
    return Observable.of(country);
  }

  updateCountry(updatedCountry: Country): Observable<any> {
    // return Observable.of({}).delay(2000).flatMap(x => Observable.throw('Unable to update country'));
    const country = this.countries.find(c => c.id === updatedCountry.id);
    Object.assign(country, updatedCountry);
    return Observable.of(country).delay(2000);
  }
}
