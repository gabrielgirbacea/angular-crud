import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactEditComponent } from "./contact-edit/contact-edit.component";
import { ContactListComponent } from "./contact-list/contact-list.component";

const routes: Routes = [
  {
    path: "add-contact",
    component: ContactEditComponent
  },
  {
    path: "",
    component: ContactListComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class ContactRoutingModule {}
