import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'https://localhost:7215/api/AdminAuth';

  constructor(private http: HttpClient) { }

  getAllRoles(){
    return this.http.get<Roles[]>(this.url + '/get-all-roles');
  }

  registerAccount(data: AddAccount){
    return this.http.post<AddAccount>(this.url + '/add-account', data);
  }

  getAccountNames(){
    return this.http.get<AccountNames[]>(this.url + '/get-all-accounts');
  }

  addPassword(data: AccountNames){
    return this.http.patch<AccountNames>(this.url + '/add-password', data);
  }

  loginRequest(data: Login): Observable<string>{
    return this.http.post<string>(this.url + '/login', data);
  }
}

export interface Login{
  mailId: string;
  otp: string;
}

export interface AccountNames{
  mailId: string;
}

export interface Roles{
  roleId: number;
  rolename: string;
}

export interface AddAccount{
  email: string;
  roleId: number;
}