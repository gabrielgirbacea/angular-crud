import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "@services/auth.service";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.authService.userValue;

    if (user) {
      // If the user is authorized, add authorization token to the request
      const authorizedRequest = request.clone({ setHeaders: { Authorization: `Bearer ${user.token}` } });

      // Due to json-server-auth limitation that does not filter a list of objects by userId,
      // we'll have to pass it as url parameter to get the job done.
      if (authorizedRequest.url.endsWith("contacts")) {
        if (authorizedRequest.method === "GET") {
          const targetedRequest = authorizedRequest.clone({ setParams: { userId: user.sub.toString() } });
          return next.handle(targetedRequest);
        }
      }

      return next.handle(authorizedRequest);
    }

    return next.handle(request);
  }
}
