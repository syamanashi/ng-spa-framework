import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldDefinition } from '../field-definition';

@Component({
  selector: 'ss-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.css']
})
export class DynamicFieldComponent {
  @Input() field: FieldDefinition;
  @Input() form: FormGroup;
  @Input() operation: string; // detail, update, create
  @Input() submitted: boolean; // Whether or not the form has already been submitted or a submit has been attempted.  Allows us logic to show error messages.

  /** isValid: Helper property to let us know whether or not the field is valid. */
  get isValid() { return this.form.controls[this.field.key].valid; }

  constructor() { }

}
