import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material.module";
import { AuthModule } from "./auth/auth.module";
import { ContactModule } from "./contact/contact.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, MaterialModule, AuthModule, ContactModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
