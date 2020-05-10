import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Contact } from "@models/contact";

@Component({
  selector: "app-delete-confirmation",
  templateUrl: "./delete-confirmation.component.html",
  styleUrls: ["./delete-confirmation.component.sass"]
})
export class DeleteConfirmationComponent {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.contact = data.contact;
  }

  contact: Contact;

  onNoClick(): void {
    this.dialogRef.close();
  }
}
