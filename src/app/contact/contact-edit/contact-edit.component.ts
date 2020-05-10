import { Component } from "@angular/core";
import { AbstractControl, Validators, FormBuilder } from "@angular/forms";
import { Contact } from "@models/contact";
import { ContactService } from "@services/contact.service";
import { Router, ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
  selector: "app-contact-edit",
  templateUrl: "./contact-edit.component.html",
  styleUrls: ["./contact-edit.component.sass"]
})
export class ContactEditComponent {
  constructor(private fb: FormBuilder, private contactService: ContactService, private router: Router, private route: ActivatedRoute) {
    route.params
      .pipe(
        map(value => {
          if (value.id) {
            return value.id;
          }
          return undefined;
        })
      )
      .subscribe(id => {
        if (id) {
          // If value is not undefined, it means that we are editing a Contact,
          // hence we need to retrieve it.
          this.contactService.getContact(id).subscribe(contact => {
            this.populateFields(contact);
            this.isLoading = false;
          });

          this.isAdd = false;
          this.operationText = "Edit Contact";
        } else {
          this.isLoading = false;
        }
      });
  }

  isLoading = true;
  isAdd: boolean;
  operationText = "Add Contact";
  contact: Contact = new Contact();

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

  editContact() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);

      this.contact.firstName = this.firstNameControl.value;
      this.contact.lastName = this.lastNameControl.value;
      this.contact.email = this.emailControl.value;
      this.contact.phoneNumber = this.phoneNumberControl.value;

      this.contactService.updateContact(this.contact).subscribe(
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

  // Private methods
  populateFields(contact: Contact) {
    this.contact = contact;

    this.firstNameControl.setValue(contact.firstName);
    this.lastNameControl.setValue(contact.lastName);
    this.emailControl.setValue(contact.email);
    this.phoneNumberControl.setValue(contact.phoneNumber);
  }
}
