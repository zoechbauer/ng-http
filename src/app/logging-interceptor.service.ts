import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEventType
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Outgoing request: ' + req.method + ' ' + req.url);
    console.log('Request headers', req.headers);

    return next.handle(req).pipe(
      tap(events => {
        if (events.type === HttpEventType.Response) {
          console.log('Incoming Body: ', events.body);
        }
      })
    );
  }
}
