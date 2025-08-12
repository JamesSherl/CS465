import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpHandler } from '@angular/common/http';

import { jwtInterceptor } from './utils/jwt-interceptor';

describe('jwtInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() =>
      new jwtInterceptor({ isLoggedIn: () => false, getToken: () => null } as any)
        .intercept(req, { handle: (r) => next(r) }) // wrap HttpHandlerFn in handle()
    );
    
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
