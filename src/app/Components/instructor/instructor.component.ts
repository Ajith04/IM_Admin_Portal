import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IMService } from '../../Services/im.service';
import { Instructor } from '../../Services/im.service';
import { ImageModule } from 'primeng/image';
import { ConfirmationService, MessageService} from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, ImageModule, ConfirmDialogModule, ToastModule, FileUploadModule, DialogModule, InputTextModule, AvatarModule, InputTextareaModule, MultiSelectModule, InputSwitchModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.css'
})
export class InstructorComponent {

  allInstructors: Instructor[] = [];
  updateInstructorVisible = false;

    constructor(private imService: IMService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

    ngOnInit() {
      this.getAllInstructors();

    }

    getAllInstructors(){
      this.imService.getAllInstructors().subscribe({next:(data:Instructor[]) => {
        this.allInstructors = data;
    }});
    }


    deleteInstructor(event: Event, instructorId: number) {
      this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Are you sure that you want to proceed?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          acceptIcon:"none",
          rejectIcon:"none",
          rejectButtonStyleClass:"p-button-text",
          accept: () => {
            this.imService.removeInstructor(instructorId).subscribe({
              next: () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Instructor Removed!' });
                this.getAllInstructors();
              },
              error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to remove Instructor.' });
              }
            });
          },
          reject: () => {
             
          }
      });
  }

  onInstructorSelect(event: any){

  }

  updateInstructor(){

  }

  onUpload(event:any){

  }

  
    

}
