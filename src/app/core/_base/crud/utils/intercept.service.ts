// Angular
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { debug } from 'util';
import { AuthService } from '../../../../views/auth/auth.service';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {
	constructor(public auth: AuthService, private injector: Injector) {}
	// intercept request and add token
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const auth = this.injector.get(AuthService);
		const token = auth.getToken();
		if (token) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`
				}
			});
		}
		if (request.body instanceof FormData) {
			console.log('Ignoring FormData to avoid setHeaders');
		} else {
			if (!request.headers.has('Content-Type')) {
				request = request.clone({
					setHeaders: {
						'Content-Type': `application/json`
					}
				});
			}
		}
		return next.handle(request);

		// tslint:disable-next-line:no-debugger
		// modify request
		// request = request.clone({
		// 	setHeaders: {
		// 		Authorization: `Bearer ${localStorage.getItem('accessToken')}`
		// 	}
		// });
		// console.log('----request----');
		// console.log(request);
		// console.log('--- end of request---');

		// return next.handle(request).pipe(
		// 	tap(
		// 		event => {
		// 			 if (event instanceof HttpResponse) {
		// 				// console.log('all looks good');
		// 				// http response status code
		// 				// console.log(event.status);
		// 			}
		// 		},
		// 		error => {
		// 			// http response status code
		// 			// console.log('----response----');
		// 			// console.error('status code:');
		// 			// tslint:disable-next-line:no-debugger
		// 			console.error(error.status);
		// 			console.error(error.message);
		// 			// console.log('--- end of response---');
		// 		}
		// 	)
		// );
	}
}
