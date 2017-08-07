import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppDataService } from '../../services/app-data.service';
import { Country } from '../../view-models/country';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  allCountries: Array<Country>;
  count = 0;
  countries: Array<Country>;

  constructor(
    private dataService: AppDataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // Get the array of countries from the dataService.
    this.dataService.getCountries().subscribe(countries => {
      this.allCountries = countries;
      this.count = this.route.snapshot.params['count'];
      this.updateList();
    });

    // Update the user interface whenever the 'count' param changes.
    this.route.params.subscribe(params => {
      this.count = params['count'];
      this.updateList();
    });
  }

  /** updateList is a helper function that sets this.countries property based on the selected/param count. */
  updateList() {
    this.countries = this.count > 0 ? this.allCountries.slice(0, this.count) : this.allCountries;
  }

}
