import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Contact } from "@models/contact";
import { environment } from "environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  // Public methods
  getContacts() {
    return this.httpClient.get<Contact[]>(`${environment.contactApiUrl}`);
  }

  addContact(contact: Contact) {
    contact.userId = this.authService.userValue.sub;
    return this.httpClient.post<Contact>(`${environment.contactApiUrl}`, contact);
  }

  deleteContact(id: number) {
    return this.httpClient.delete<number>(`${environment.contactApiUrl}/${id}`);
  }
}
