import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuItem, MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMService } from '../../Services/im.service';
import { Router } from '@angular/router';
import { CourseService, getCourseNames } from '../../Services/course.service';
import { MultiSelectModule } from 'primeng/multiselect';





@Component({
  selector: 'app-institute-management',
  standalone: true,
  imports: [CardModule, ButtonModule, SpeedDialModule, TooltipModule, PanelMenuModule, ToastModule, DialogModule, InputTextModule, InputTextareaModule, FileUploadModule, HttpClientModule, CalendarModule, ReactiveFormsModule, MultiSelectModule],
  providers: [MessageService, IMService],
  templateUrl: './institute-management.component.html',
  styleUrl: './institute-management.component.css'
})
export class InstituteManagementComponent {

    allCourseNames: getCourseNames[] = [];

    addInstructor: FormGroup;

    constructor(private fb: FormBuilder, private imService: IMService, private messageService: MessageService, private router: Router, private courseService: CourseService){
        this.addInstructor = this.fb.group({
            name:['', Validators.required],
            description:['', Validators.required],
            avatar:[null, Validators.required],
            courseNames: [[], Validators.required],
            dateOfJoin:['', Validators.required],
            mobile:['', Validators.required],
            email:['', Validators.required],
        });
    }
    
    visible: boolean = false;

    items: MenuItem[] = [];

   

    ngOnInit() {
        this.items = [
            {
                label: 'Add',
                icon: 'pi pi-plus',
                items: [
                    {
                        label: 'Course Name',
                        icon: 'pi pi-at',
                        command: () => {
                            this.router.navigate(['/admin/institute-management/course-name']);
                        }
                    },
                    {
                        label: 'Course Category',
                        icon: 'pi pi-bars',
                        command: () => {
                            
                        }
                    },
                    {
                        label: 'Course Level',
                        icon: 'pi pi-file-o',
                        command: () => {
                            
                        }
                    },
                    {
                        label: 'Batch',
                        icon: 'pi pi-clone',
                        command: () => {
                            
                        }
                    },
                    {
                        label: 'Instructor',
                        icon: 'pi pi-user',
                        command: () => {
                            this.visible = true;
                            this.courseService.getAllCourseNames().subscribe({next:(data: getCourseNames[]) => {this.allCourseNames = data}});
                        }
                    },
                    {
                        label: 'Expense',
                        icon: 'pi pi-wallet',
                        command: () => {
                            
                        }
                    }
                ]
            },
            {
                label: 'View',
                icon: 'pi pi-eye',
                items: [
                    {
                        label: 'All Instructors',
                        icon: 'pi pi-user',
                        command: () => {
                            this.router.navigate(['/admin/institute-management/instructor']);
                        }
                    },
                    {
                        label: 'All Expenses',
                        icon: 'pi pi-wallet',
                        command: () => {
                           
                        }
                    },
                    {
                        label: 'Follow-up List',
                        icon: 'pi pi-phone',
                        command: () => {
                           
                        }
                    },
                    {
                        label: 'Report',
                        icon: 'pi pi-address-book',
                        command: () => {
                           
                        }
                    }
                ]
            },
            {
                label: 'Change Registration Fee',
                icon: 'pi pi-money-bill',
                command: () => {
                    
                }
            }
        ];
    }

    onSelect(event: any) {
        const selectedFile = event.files[0];
        this.addInstructor.patchValue({ avatar: selectedFile });
      }
      

    sendInstructor(){
        if(this.addInstructor.valid){
            const formData = new FormData();
            var selectedDate = this.addInstructor.value.dateOfJoin;
            var formattedDate = selectedDate ? selectedDate.toISOString() : null;

            formData.append('instructorName', this.addInstructor.value.name);
            formData.append('description', this.addInstructor.value.description);

            this.addInstructor.value.courseNames.forEach((courseName:any) => {
                formData.append('courseNames', courseName.name);
            });
            
            formData.append('dateOfJoin', formattedDate);
            formData.append('mobile', this.addInstructor.value.mobile);
            formData.append('email', this.addInstructor.value.email);

            formData.append('avatar', this.addInstructor.value.avatar);

            this.imService.sendInstructor(formData).subscribe({next: () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Instructor added!' });
                this.visible = false;
                this.router.navigate(['/admin/institute-management/instructor']);
              },
              error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Instructor.' });
              }});       

        }


    }

}
