import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputOtpModule } from 'primeng/inputotp';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AccountNames, AddAccount, AuthService, Login, Roles, TokenResponse } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, InputTextModule, DropdownModule, InputOtpModule, IconFieldModule, InputIconModule, DialogModule, FormsModule, ToastModule, ConfirmDialogModule],
  providers: [MessageService, ConfirmationService, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(private authService: AuthService, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router){

  }

  signupModelVisible: boolean = false;
  allRoles: Roles[] = [];
  registerEmail: string = '';


  addAccount: AddAccount = {
    email: '',
    roleId: 0
  }

  accountNames: AccountNames[] = [];

  sendMailId: AccountNames = {
    mailId: ''
  }

  login: Login = {
    mailId:'',
    otp:''
  }


  ngOnInit(): void {
    this.getAccountNames();
  }

  openSignUp(){
    this.signupModelVisible = true;
    this.authService.getAllRoles().subscribe({next:(data:Roles[]) => {
          this.allRoles = data;
      }});
  }

  registerAccount(event: Event){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'You are going to create a new account!',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.authService.registerAccount(this.addAccount).subscribe({
         next: () => {
           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account Created!' });
           this.signupModelVisible = false;
           this.getAccountNames();
         },
         error: () => {
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create account.' });
         }
       });
      },
      reject: () => {
          
      }
  });


  }

  getAccountNames(){
    this.authService.getAccountNames().subscribe({next:(data:AccountNames[]) => {
      this.accountNames = data;
  }});
  }

  addPassword(){
    this.authService.addPassword(this.sendMailId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'OTP sent to your Mail!' });
        this.signupModelVisible = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to send OTP.' });
      }
    });
  }

  loginRequest(){
    this.login.mailId = this.sendMailId.mailId;
    this.authService.loginRequest(this.login).subscribe({
      next: (tokenResponse: TokenResponse) => {
        localStorage.setItem('token', tokenResponse.token);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successfull' });

        setTimeout(() => {
          this.router.navigate(['/admin', this.sendMailId.mailId]);
       }, 2000);
       

      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
      }
    });
  }

}
