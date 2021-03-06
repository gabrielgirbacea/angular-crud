import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactEditComponent } from "./contact-edit/contact-edit.component";
import { ContactListComponent } from "./contact-list/contact-list.component";
import { ContactRoutingModule } from "./contact-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DeleteConfirmationComponent } from "./delete-confirmation/delete-confirmation.component";

@NgModule({
  declarations: [ContactEditComponent, ContactListComponent, DeleteConfirmationComponent],
  imports: [CommonModule, ContactRoutingModule, ReactiveFormsModule, RouterModule, MaterialModule, FlexLayoutModule],
  exports: [ContactEditComponent, ContactListComponent, DeleteConfirmationComponent]
})
export class ContactModule {}
