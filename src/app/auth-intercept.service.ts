import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';

export class AuthInterceptService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(req.method);
    // intercept only certain requests
    // if (req.method === 'DELETE') {
    //   console.log('DELETE Request is on the way');
    // }

    // intercept all requests
    console.log('Request is on the way');

    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz')
    });
    return next.handle(modifiedRequest);
  }
}
