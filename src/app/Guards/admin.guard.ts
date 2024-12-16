import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service'; 
import { getRoleFromToken } from '../Utils/token-utils';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = getRoleFromToken();
    if (role === '1') {
        return true;
    } else {
        this.router.navigate(['/unauthorized']);
        return false;
    }
}
}

