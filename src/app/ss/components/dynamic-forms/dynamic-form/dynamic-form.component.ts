import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FieldDefinition } from '../field-definition';

@Component({
  selector: 'ss-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnChanges, OnInit {

  @Input() vm: any;
  @Input() vmDefinition: Array<FieldDefinition>;
  @Input() operation: string; // detail, update, create
  @Input() errorMessage: string;
  @Output() update: EventEmitter<any> = new EventEmitter(); // When user clicks the 'Edit' button on a form to update a record.
  @Output() create: EventEmitter<any> = new EventEmitter(); // When user clicks the 'Add New' create button on a form.

  form: FormGroup; // Represents a Reactive form and all of it's inputs (ReactiveFormsModule import is also required in ss.module).
  status: string;
  submitted = false;  // Tracks whether or not a submit has been attempted
  vmCopy: any; // Makes a copy of the @Input 'vm' view-model that we will work with for the form, allowing us to reset back to the original view-model data (vm) if user cancels the change before submitting.  This ensures we are preventing corrupted data of vm.

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  /** Calls clear form, which sets up a Reactive Form, and adds listener (subscribe) to route params for when the operation or id changes */
  ngOnInit() {
    this.clearForm(); // Sets up reactive form (above).

    // Monitor the URL (parameters) we're inside of.  Respond to changes by changing this.operation and resetting the dynamic form (rebuilding the reactive form).
    // The Angular router unsubscribes for us, so we don't have to explicitly unsubscribe.
    this.route.params.subscribe(params => {
      // The following fires each time the route.parames changes:
      this.operation = params['operation']; // detail, update, or create.
      this.clearForm(); // Our reactive form can jump from operation to operation, and this allows us to reset the form each time that happens.
    });
  }

  /**
   * OnChange gets called when there is some kind of @Input() property change.
   * We are using it to check for truth errorMessage (showing error message) while 'waiting' status is display. Clears status
   * */
  ngOnChanges(changes: SimpleChanges) {
    //  Handle changes to inputs: errorMessage
    // If there is an errorMessage (from an update or create, for example) and we are 'waiting',
    // then stop waiting to show the error message.
    if (changes['errorMessage'].currentValue && this.status === 'waiting') {
      this.status = '';
    }
  }

  /** Helper method that clears the form and sets up our Reactive Form Group */
  clearForm() {
    const group = {};
    this.vmCopy = Object.assign({}, this.vm); // Object.assign does not make a deep clone.  Only copies properties made available.  If need more functionality, add it here.
    // TODO: If a deep copy is needed, drilling down into other objects, then write that functionality here (using lodash: this.vmCopy = _.cloneDeep(this.vm) for example.  See https://hassantariqblog.wordpress.com/2016/10/15/angular2-import-lodash-into-angular2-application-using-typescript/)
    // https://lodash.com/docs#cloneDeep
    /**
     * Another Option: (https://stackoverflow.com/questions/34688517/how-can-i-use-angular-copy-in-angular-2)
            function deepClone(obj) {

              // return value is input is not an Object or Array.
              if (typeof(obj) !== 'object' || obj === null) {
                return obj;
              }

              let clone;

              if(Array.isArray(obj)) {
                clone = obj.slice();  // unlink Array reference.
              } else {
                clone = Object.assign({}, obj); // Unlink Object reference.
              }

              let keys = Object.keys(clone);

              for (let i=0; i<keys.length; i++) {
                clone[keys[i]] = deepClone(clone[keys[i]]); // recursively unlink reference to nested objects.
              }

              return clone; // return unlinked clone.
            }
     */
    /**
     * Another Option: Returns a deep copy of the object (https://stackoverflow.com/questions/40966926/create-deep-copy-in-angular-2)
          public static deepCopy(oldObj: any) {
            var newObj = oldObj;
            if (oldObj && typeof oldObj === "object") {
                newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
                for (var i in oldObj) {
                    newObj[i] = this.deepCopy(oldObj[i]);
                }
            }
            return newObj;
          }
     */

    // Loop through the view-model definitions and create a form field (FormControl) for each one.
    this.vmDefinition.forEach(field => {
      group[field.key] = field.required ? new FormControl(this.vmCopy[field.key], Validators.required) : new FormControl(this.vmCopy[field.key]);
    });
    this.form = new FormGroup(group); // Stores our FormControls for all view-model definitions.  Now the 'form' property holds our ReactiveForm and knows about all of the fields.
  }

  /** If user cancels and wants to Go Back, we null any error and call back function on injected Location. */
  onBack() {
    this.errorMessage = null;
    this.location.back();
  }

  onCancel() {
    this.onBack();
  }

  onCreate() {
    this.submitted = true; // Tracks submittion attempts.  Once user tries to submit, we want to show any error messages that have not yet been shown.
    if (this.form.valid) {
      this.status = 'waiting';
      this.create.emit(this.form.value); // Emits the (create) output event which will have an event handler attribute in the tag.  Ex: (create)="createCountry($event)"
    }
  }

  onEdit() {
    // Change the operation parameter within the route.
    // Since we are already inside the dynamic form, we just have to change the route to reflect the new operation: from 'details' to 'edit'.
    // This is how we change a parameter in a route without navigating to an entirely new route.
    // Requires this.route.params.subscribe() in ngOnInit to work properly.
    this.router.navigate(['../', 'edit'], { relativeTo: this.route });
  }

  onSave() {
    this.submitted = true; // Tracks submittion attempts.  Once user tries to submit, we want to show any error messages that have not yet been shown.
    if (this.form.valid) {
      this.status = 'waiting';
      this.update.emit(this.form.value); // Emits the (update) output event which will have an event handler attribute in the tag.  Ex: (update) ="updateCountry($event)". We set up our reactive form so that this.form.value is our view-model.
    }
  }

  onSubmit() {
    console.log('hey now yo testing');
  }
}
