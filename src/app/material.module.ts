import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  declarations: [],
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule],
  exports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule]
})
export class MaterialModule {}
