import { Component } from "@angular/core";
import { FormBuilder, AbstractControl, Validators } from "@angular/forms";
import { AuthService } from "@services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.sass"]
})
export class SignupComponent {
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Redirect to contacts if already logged in
    if (this.authService.userValue) {
      this.router.navigate(["/contacts"]);
    }
  }

  // Build the form
  signupForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  });

  // Public methods

  signup() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.authService.signup(this.emailControl.value.trim(), this.passwordControl.value.trim()).subscribe(
        () => {
          this.router.navigate(["/contacts"]);
        },
        error => {
          console.log(error);
          alert(error.error);
        }
      );
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
