/**
 * Interface type for a field definition which describes a form field, an array of which defines the form fields for any given view-model interface, required for dynamic form generation.
 * Note: Every property in a given view-model interface will require a FieldDefinition for the Dynamic Form to be created.
 * TODO: Consider ways to add additional validation requirements for a given field.
 */
export interface FieldDefinition {
  key: string; // id, name, email, etc.
  type: string; // string, number, boolean
  isId: boolean; // true, false
  label: string; // form input label
  required: boolean; // form validation
}
