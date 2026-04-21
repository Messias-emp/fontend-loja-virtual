import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const publicEndpoints = [
    '/auth/login',
    '/auth/register',
    '/api/products'
  ];

  if (publicEndpoints.some(url => req.url.includes(url))) {
    return next(req);
  }

  const token = localStorage.getItem('token');

  if (token) {
    return next(req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }));
  }

  return next(req);
};
