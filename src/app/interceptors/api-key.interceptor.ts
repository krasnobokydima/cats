import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set(
        'x-api-key',
        'live_b69j0p9MuYOIaKVhZOBTevhKOlF72N8s3LKLvwvVvPqr4QKALrw0ihq6r17xg1b0'
      ),
    });

    return next.handle(authReq);
  }
}
