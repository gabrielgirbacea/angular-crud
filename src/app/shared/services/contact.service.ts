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

  getContact(id) {
    return this.httpClient.get<Contact>(`${environment.contactApiUrl}/${id}`);
  }

  addContact(contact: Contact) {
    contact.userId = this.authService.userValue.sub;
    return this.httpClient.post<Contact>(`${environment.contactApiUrl}`, contact);
  }

  updateContact(contact: Contact) {
    // contact.userId = this.authService.userValue.sub;
    return this.httpClient.put<Contact>(`${environment.contactApiUrl}/${contact.id}`, contact);
  }

  deleteContact(id: number) {
    return this.httpClient.delete<number>(`${environment.contactApiUrl}/${id}`);
  }
}
