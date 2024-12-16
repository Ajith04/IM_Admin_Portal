import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { AccountNames, AuthService } from '../../Services/auth.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, TabMenuModule, MenuModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute, private messageService: MessageService){

  }
  loginId: string  | null = null;
  items: MenuItem[] | undefined;
  logoutEmail: AccountNames = {
    mailId:''
  }

    ngOnInit() {
        this.items = [
            { label: 'Dashboard', icon: 'pi pi-home', routerLink:'dashboard'},
            { label: 'Student Management', icon: 'pi pi-user', routerLink:'student-management' },
            { label: 'Course Management', icon: 'pi pi-book', routerLink:'course-management' },
            { label: 'Payments', icon: 'pi pi-money-bill', routerLink:'payments' },
            { label: 'Institute Management', icon: 'pi pi-building-columns', routerLink:'institute-management' },
            { label: 'Study Materials', icon: 'pi pi-tags', routerLink:'study-materials' }
        ]

        this.route.paramMap.subscribe((params) => {
          this.loginId = params.get('id');
          });
          
    }

    logout(){
      localStorage.removeItem('token');
      
      
      if(this.loginId){
        this.logoutEmail.mailId = this.loginId;
        this.authService.logout(this.logoutEmail).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logout Success!' });
            
            setTimeout(() => {
              this.router.navigate(['/login']);
           }, 2000);
            
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Logout.' });
          }
        });
      }

    }
    
}
