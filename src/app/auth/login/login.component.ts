import { Component } from "@angular/core";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent {
  constructor(private fb: FormBuilder) {}

  // Build the form
  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  });

  // Public methods

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }

  get emailControl(): AbstractControl {
    return this.loginForm.get("email");
  }

  get passwordControl(): AbstractControl {
    return this.loginForm.get("password");
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
}
