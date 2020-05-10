import { Component } from "@angular/core";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Redirect to contacts if already logged in
    if (this.authService.userValue) {
      this.router.navigate(["/contacts"]);
    }
  }

  // Build the form
  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  });

  // Public methods

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.emailControl.value.trim(), this.passwordControl.value.trim()).subscribe(
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
