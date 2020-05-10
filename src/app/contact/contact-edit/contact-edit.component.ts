import { Component } from "@angular/core";
import { AbstractControl, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-contact-edit",
  templateUrl: "./contact-edit.component.html",
  styleUrls: ["./contact-edit.component.sass"]
})
export class ContactEditComponent {
  constructor(private fb: FormBuilder) {}

  // Build the form
  contactForm = this.fb.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    phoneNumber: ["", [Validators.required]]
  });

  // Public methods

  addContact() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
    }
  }

  get firstNameControl(): AbstractControl {
    return this.contactForm.get("firstName");
  }

  get lastNameControl(): AbstractControl {
    return this.contactForm.get("lastName");
  }

  get emailControl(): AbstractControl {
    return this.contactForm.get("email");
  }

  get phoneNumberControl(): AbstractControl {
    return this.contactForm.get("phoneNumber");
  }

  getErrorMessage(control): string {
    if (control.hasError("required")) {
      return "You must enter a value";
    }

    if (control.hasError("email")) {
      return "Not a valid email address";
    }

    return "";
  }
}
