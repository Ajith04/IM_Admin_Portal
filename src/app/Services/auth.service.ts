import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'https://kind-dune-08ce8e700.6.azurestaticapps.net/api/AdminAuth';

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

  loginRequest(data: Login) {
    return this.http.post<TokenResponse>(this.url + '/login', data);
  }

  logout(id: AccountNames){
    return this.http.patch<AccountNames>(this.url + '/logout', id);
  }
  
}

export interface TokenResponse{
  token: string;
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
