import { Component } from "@angular/core";
import { AbstractControl, Validators, FormBuilder } from "@angular/forms";
import { Contact } from "@models/contact";
import { ContactService } from "@services/contact.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact-edit",
  templateUrl: "./contact-edit.component.html",
  styleUrls: ["./contact-edit.component.sass"]
})
export class ContactEditComponent {
  constructor(private fb: FormBuilder, private contactService: ContactService, private router: Router) {
    this.isAdd = true;

    this.operationText = this.isAdd ? "Add Contact" : "Edit Contact";
  }

  isAdd: boolean;
  operationText: string;

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

      const contact: Contact = new Contact();
      contact.firstName = this.firstNameControl.value;
      contact.lastName = this.lastNameControl.value;
      contact.email = this.emailControl.value;
      contact.phoneNumber = this.phoneNumberControl.value;

      this.contactService.addContact(contact).subscribe(
        () => {
          this.router.navigate(["contacts"]);
        },
        error => {
          alert(error.error);
        }
      );
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
