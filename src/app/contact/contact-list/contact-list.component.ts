import { Component } from "@angular/core";
import { ContactService } from "@services/contact.service";
import { Contact } from "@models/contact";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.sass"]
})
export class ContactListComponent {
  constructor(private contactService: ContactService) {
    contactService.getContacts().subscribe(results => {
      this.dataSource = results;
    });
  }
  dataSource: Contact[] = [];
  displayedColumns: string[] = ["firstName", "lastName", "email", "phoneNumber", "actions"];

  // Public methods

  editContact(id): void {
    console.log("Editing " + id);
  }
  deleteContact(id): void {
    console.log("Deleting " + id);
  }
}
