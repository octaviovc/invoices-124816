import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class SignInGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthorized();
  }
  isAuthorized () {
    if (!this.authService.isLoggedIn()) {
      return true;
    } else {
      const token = this.authService.getToken();
      const a_token = token.split('/');
      const rfc = a_token[1];
      this.router.navigate([`/invoices/${rfc}`]);
      return false;
    }
  }
}
