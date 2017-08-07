import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppDataService } from '../../services/app-data.service';
import { Country } from '../../view-models/country';

@Component({
  selector: 'app-country-maint',
  templateUrl: './country-maint.component.html',
  styleUrls: ['./country-maint.component.scss']
})
export class CountryMaintComponent {

  /** Array of the Country view-model interface: Must get populated. */
  countries: Array<Country>;

  deleteError: string;
  deleteId: number;
  isDeleting = false;

  constructor(
    private dataService: AppDataService,
    private router: Router,
  ) {
    dataService.getCountries().subscribe(
      (data) => this.countries = data,
      (err) => this.deleteError = err,
    );
  }

  cancelDelete() {
    this.isDeleting = false;
    this.deleteId = null;
  }

  createCountry() {
    // Route user to country-detail with an operation of 'create' and arbitrary ID of 0.
    this.router.navigate(['/authenticated/country-detail', 0, 'create']);
  }

  deleteCountry(id: number) {
    this.isDeleting = true;
    this.dataService.deleteCountry(id).subscribe(
      c => this.cancelDelete(), // Clears out the isDeleting and deleteId fields since this data result indicates that the country was successfully removed.
      err => { this.deleteError = err; this.isDeleting = false; } // Causes error message to be displayed.
      );
  }

  deleteCountryQuestion(id: number) {
    this.deleteError = null; // Clears out any possible lingering deleteError.
    this.deleteId = id; // This triggers the template's *ngIf statement to add the table cell that displays "Delete this country?" along with Cancel and Delete buttons.
  }

  editCountry(id: number) {
    this.router.navigate(['/authenticated/country-detail', id, 'edit']);
  }

  showCountryDetail(id: number) {
    this.router.navigate(['/authenticated/country-detail', id, 'details']);
  }

}
