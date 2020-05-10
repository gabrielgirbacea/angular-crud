import { Component } from "@angular/core";
import { FormBuilder, AbstractControl, Validators } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.sass"]
})
export class SignupComponent {
  constructor(private fb: FormBuilder) {}

  // Build the form
  signupForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  });

  // Public methods

  signup() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    }
  }

  get emailControl(): AbstractControl {
    return this.signupForm.get("email");
  }

  get passwordControl(): AbstractControl {
    return this.signupForm.get("password");
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
