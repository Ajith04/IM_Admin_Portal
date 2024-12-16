import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service'; 
import { getRoleFromToken } from '../Utils/token-utils';

@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = getRoleFromToken();
    if (role === '2' || role === '1') {
        return true;
    } else {
        this.router.navigate(['/unauthorized']);
        return false;
    }
}
}

