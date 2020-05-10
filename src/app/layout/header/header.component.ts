import { Component } from "@angular/core";
import { AuthService } from "@services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"]
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  isAuthenticated = false;

  logout(): void {
    this.authService.logout();
  }
}
