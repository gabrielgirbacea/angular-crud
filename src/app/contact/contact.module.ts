import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactEditComponent } from "./contact-edit/contact-edit.component";
import { ContactListComponent } from "./contact-list/contact-list.component";
import { ContactRoutingModule } from "./contact-routing.module";

@NgModule({
  declarations: [ContactEditComponent, ContactListComponent],
  imports: [CommonModule, ContactRoutingModule],
  exports: [ContactEditComponent, ContactListComponent]
})
export class ContactModule {}
