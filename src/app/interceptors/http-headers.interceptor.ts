import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // req = req.clone({
    //   setHeaders: {
    //     'X-RapidAPI-Key': 'befb762131msh0fca0ea1158c417p1c829djsn8dca637f2a02',
    //     'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
    //   },
    // });
    console.log('clone/////', req);
    return next.handle(req);
  }
}
