import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { GetFollowUp, IMService } from '../../Services/im.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-followup',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, InputTextareaModule, InputSwitchModule, ConfirmDialogModule, ToastModule, FormsModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './followup.component.html',
  styleUrl: './followup.component.css'
})
export class FollowupComponent {

  allFollowup: GetFollowUp[] = [];
  description: string = '';

  constructor(private imService: IMService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
      this.getAllFollowup();

  }

  getAllFollowup(){
    this.imService.getAllFollowup().subscribe((data: GetFollowUp[]) => {
      this.allFollowup = data;
  });
  }

  editBtn: boolean[] = Array(this.allFollowup.length).fill(false);
  onChange(i: number){
    this.editBtn[i] = this.editBtn[i] == true ? false : true;
  }

  removeFollowup(event: Event, id: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
          this.imService.removeFollowup(id).subscribe({
            next: () => {
              
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Follow-Up Record Removed!' });
              this.getAllFollowup();
            },
            error: () => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to remove Record.' });
            }
          });
        },
        reject: () => {
           
        }
    });
}

updateDescription(id: number, i: number){
  const updatedDescription = this.allFollowup[i].description;
  this.imService.updateDescription(id, updatedDescription).subscribe({
    next: () => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Description Updated!' });
      this.getAllFollowup();
      this.editBtn[i] = false;

    },
    error: () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Update Description.' });
    }
  });
}


}
