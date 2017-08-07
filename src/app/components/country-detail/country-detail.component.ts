import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FieldDefinition } from '../../ss/components/dynamic-forms/field-definition';

import { AppDataService } from '../../services/app-data.service';
import { Country } from '../../view-models/country';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  // Declare the country of type Country view-model interface
  country: Country;

  /**
   * Array of field definitions that defines the fields of the view-model required for dynamic form generation.
   * Our Country view-model has 3 fields and below is an array containing the corresponding 3 field objects.
   * This dynamic field definition is what makes dynamic forms possible.
   *
   * TODO: Consider moving this definition to the app-data.service or another service if it
   * needs to be used by any other parts of the application.  Since it is only used in this component,
   * we can leave it here.
   */
  countryDefinition: Array<FieldDefinition> = [
    {
      key: 'id',
      type: 'number',
      isId: true,
      label: 'Id',
      required: true
    },
    {
      key: 'name',
      type: 'string',
      isId: false,
      label: 'Name',
      required: true
    },
    {
      key: 'epiIndex',
      type: 'number',
      isId: false,
      label: 'EPI Index',
      required: true
    },
  ];

  errorMessage: string;
  operation: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: AppDataService) { }

  /**
   * Initializes country based on route parameters (id and operation).
   */
  ngOnInit() {

    this.operation = this.route.snapshot.params['operation'];

    if (this.operation === 'create') {
      this.country = { id: 0, name: '', epiIndex: null };
    } else { // operation is either 'details' or 'edit'
      this.dataService.getCountry(parseInt(this.route.snapshot.params['id'], 10)).subscribe(
        (country: Country) => this.country = country,
        err => this.errorMessage = 'Error getting country'
      );
    }

  }

  createCountry(country: Country) {
    country.id = 0;
    this.errorMessage = null;
    this.dataService.createCountry(country).subscribe(
      data => this.router.navigate(['/authenticated/country-maint']),
      err => this.errorMessage = 'Error creating country'
    );
  }

  updateCountry(country: Country) {
    this.errorMessage = null;
    this.dataService.updateCountry(country).subscribe(
      // If successful, navigate user to the country-maint list of countries.
      data => this.router.navigate(['/authenticated/country-maint']),
      err => this.errorMessage = 'Error updating country'
    );
  }

}
