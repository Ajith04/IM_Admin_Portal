import { NgStyle, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DragDropModule } from 'primeng/dragdrop';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AssignInstructor, CourseService, getInsructor, InstructorForCourse, singleCourseLevel, updateCourseData } from '../../Services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignBatch, BatchForStudent, Student, StudentService, updateSingleStudent } from '../../Services/student.service';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [FieldsetModule, AvatarModule, FormsModule, InputTextModule, EditorModule, ButtonModule, DragDropModule, CommonModule, FormsModule, ToggleButtonModule, InputSwitchModule, TagModule, ToastModule, ConfirmDialogModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent implements OnInit{

  constructor(private courseService: CourseService, private route: ActivatedRoute, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router, private studentService: StudentService){

  }

  studentId:string = '';

  isDisabled:boolean = true;
  editorClass:string = 'pointer-events-none';
  editBtnText: string = 'Edit mode is Off';

  formData: updateSingleStudent = {
      mobile: '',
      email: '',
      address: ''          
  }

  assignBatch: AssignBatch = {
   studentId: '',
   batchId: 0
  }

  assignInstructor: AssignInstructor = {
    courseId: '',
    instructorId: 0
   }


checked: boolean = false;

allInstructors: InstructorForCourse[] = [];
selectedInstructor: getInsructor[] = [];
draggedInstructor: InstructorForCourse | undefined | null;
draggedBatch: BatchForStudent | undefined | null;
batchForStudent: BatchForStudent[] = [];

singleStudent: Student |undefined;


ngOnInit() {

  this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.studentId = id ? id.toString() : '';
  })
    this.selectedInstructor = [];

    this.getSingleStudent();

    this.getInstructorForCourse();
    this.getBatchForStudent();
    
    this.getAssignedInstructor();
    
    

}

getBatchForStudent(){
  this.studentService.getBatchForStudent(this.studentId).subscribe({next:(data: BatchForStudent[]) => {this.batchForStudent = data;}});
}

getInstructorForCourse(){
  this.courseService.getInstructorForCourse(this.studentId).subscribe({next:(data: InstructorForCourse[]) => {this.allInstructors = data;}});
}




dragStart(instructor: InstructorForCourse) {
    this.draggedInstructor = instructor;
}

batchDragStart(batch: BatchForStudent) {
  this.draggedBatch = batch;
}


drop(event: Event) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
          this.assignInstructor.courseId = this.studentId;
          this.assignInstructor.instructorId = this.draggedInstructor?.instructorId;
 
          this.courseService.instructorToCourse(this.assignInstructor).subscribe({
           next: () => {
             this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Instructor Assigned!' });
             this.getSingleStudent();
             this.getBatchForStudent();
           },
           error: () => {
             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to assign Instructor.' });
           }
         });
        },
        reject: () => {
            
        }
    });
    }


    batchDrop(event: Event) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
          this.assignBatch.studentId = this.studentId;
          this.assignBatch.batchId = this.draggedBatch?.batchId;
          console.log(this.studentId, this.draggedBatch?.batchId)
 
          this.studentService.batchToStudent(this.assignBatch).subscribe({
           next: () => {
             this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Batch Assigned!' });
             this.getBatchForStudent();
             this.getAssignedInstructor();
             
           },
           error: () => {
             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to assign Batch.' });
           }
         });
        },
        reject: () => {
            
        }
    });
    }


getSingleStudent(){
  this.studentService.getSingleStudent(this.studentId).subscribe({next:(data: Student) => {this.singleStudent = data;
      this.formData.mobile = this.singleStudent?.mobileNo;
      this.formData.email = this.singleStudent?.email;
      this.formData.address = this.singleStudent?.address;

  }});
}



editBtn(){
  this.isDisabled = this.isDisabled === true ? false : true;
  this.editBtnText = this.editBtnText === 'Edit mode is Off' ? 'Edit mode is On' : 'Edit mode is Off';
  this.editorClass = this.editorClass === 'pointer-events-none' ? '' : 'pointer-events-none';
  
}

updateSingleCourse(){
  this.studentService.updateSingleCourse(this.studentId, this.formData).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Student Information Updated.' });
        this.getSingleStudent();
        this.checked = false;
        this.editBtn();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Update Student Information.' });
      }
    });
}

getAssignedInstructor(){
  this.courseService.getAssignedInstructor(this.studentId).subscribe({next:(data: getInsructor[]) => {this.selectedInstructor = data;}});
 

}

deleteEnrollment(event: Event, enrollmentId:number){
  this.confirmationService.confirm({
    target: event.target as EventTarget,
    message: 'Are you sure that you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptIcon:"none",
    rejectIcon:"none",
    rejectButtonStyleClass:"p-button-text",
    accept: () => {
      this.courseService.deleteEnrollment(enrollmentId).subscribe({
       next: () => {
         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Instructor Removed!' });
         this.getAssignedInstructor();
         this.getInstructorForCourse();
        
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

deleteStudent(event: Event, studentId: string){

  this.confirmationService.confirm({
    target: event.target as EventTarget,
    message: 'Are you sure that you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptIcon:"none",
    rejectIcon:"none",
    rejectButtonStyleClass:"p-button-text",
    accept: () => {
      this.studentService.deleteStudent(studentId).subscribe({
       next: () => {
         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Student Removed!' });
         
         setTimeout(() => {
          this.router.navigate(['/admin/student-management']);
        }, 2000);
         
       },
       error: () => {
         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to remove Student.' });
       }
     });
    },
    reject: () => {
        
    }
});


}


}
