import { Component } from "@angular/core";
import { ContactService } from "@services/contact.service";
import { Contact } from "@models/contact";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DeleteConfirmationComponent } from "../delete-confirmation/delete-confirmation.component";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.sass"]
})
export class ContactListComponent {
  constructor(private contactService: ContactService, private router: Router, public dialog: MatDialog) {
    this.retrieveContacts();
  }
  dataSource: Contact[] = [];
  displayedColumns: string[] = ["firstName", "lastName", "email", "phoneNumber", "actions"];

  isLoading = true;

  // Public methods

  deleteContact(contact): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: "300px",
      data: { contact }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");

      if (result) {
        console.log("Deleting " + contact.id);
        this.contactService.deleteContact(contact.id).subscribe(
          () => {
            this.retrieveContacts();
          },
          error => {
            console.log(error);
            alert(error.error);
          }
        );
      }
    });
  }

  // Private methods

  private retrieveContacts(): void {
    this.contactService.getContacts().subscribe(results => {
      this.dataSource = results;
      this.isLoading = false;
    });
  }
}
