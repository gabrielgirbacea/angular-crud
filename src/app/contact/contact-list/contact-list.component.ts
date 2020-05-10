import { Component } from "@angular/core";
import { ContactService } from "@services/contact.service";
import { Contact } from "@models/contact";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.sass"]
})
export class ContactListComponent {
  constructor(private contactService: ContactService, private router: Router) {
    this.retrieveContacts();
  }
  dataSource: Contact[] = [];
  displayedColumns: string[] = ["firstName", "lastName", "email", "phoneNumber", "actions"];

  isLoading = true;

  // Public methods

  deleteContact(id): void {
    console.log("Deleting " + id);
    this.contactService.deleteContact(id).subscribe(
      () => {
        this.retrieveContacts();
      },
      error => {
        console.log(error);
        alert(error.error);
      }
    );
  }

  // Private methods

  private retrieveContacts(): void {
    this.contactService.getContacts().subscribe(results => {
      this.dataSource = results;
      this.isLoading = false;
    });
  }
}
