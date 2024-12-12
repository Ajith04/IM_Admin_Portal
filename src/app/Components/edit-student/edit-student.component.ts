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
import { AssignBatch, BatchForStudent, CourseEnrollment, CourseForStudent, CourseLevelForStudent, SingleStudent, Student, StudentService, updateSingleStudent } from '../../Services/student.service';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [FieldsetModule, AvatarModule, FormsModule, InputTextModule, EditorModule, ButtonModule, DragDropModule, CommonModule, FormsModule, ToggleButtonModule, InputSwitchModule, TagModule, ToastModule, ConfirmDialogModule, ConfirmPopupModule, DialogModule, RadioButtonModule, CalendarModule, FloatLabelModule],
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
  regFeePaid: boolean = false;
  showCourseInstructor: boolean = false;

  formData: updateSingleStudent = {
      mobile: '',
      email: '',
      address: ''          
  }

  courseEnrollment: CourseEnrollment = {
  studentId: '',
  courseId: '',
  instructorId: 0,
  courseFee: 0,
  duration: '',
  enrollmentDate:''
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
draggedCourseLevel: CourseLevelForStudent | undefined | null;
draggedBatch: BatchForStudent | undefined | null;
batchForStudent: BatchForStudent[] = [];
coursesForStudent: CourseForStudent[] = [];


singleStudent: SingleStudent | undefined;


ngOnInit() {

  this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.studentId = id ? id.toString() : '';
  })
    this.selectedInstructor = [];

    this.getSingleStudent();

    this.getCoursesForStudent();
    this.getBatchForStudent();
    
    this.getAssignedInstructor();
    
    

}

getBatchForStudent(){
  this.studentService.getBatchForStudent(this.studentId).subscribe({next:(data: BatchForStudent[]) => {this.batchForStudent = data;}});
}

getCoursesForStudent(){
  this.studentService.getCoursesForStudent(this.studentId).subscribe({next:(data: CourseForStudent[]) => {this.coursesForStudent = data;}});
}






courseDragStart(courseLevel: CourseLevelForStudent) {
    this.draggedCourseLevel = courseLevel;

  this.courseEnrollment.studentId = this.studentId;
  this.courseEnrollment.courseId = this.draggedCourseLevel?.levelId;
  this.courseEnrollment.courseFee =  this.draggedCourseLevel?.courseFee
  this.courseEnrollment.duration = this.draggedCourseLevel?.duration
}

sendCourseEnrollment(){

  this.studentService.sendCourseEnrollment(this.courseEnrollment).subscribe({
    next: () => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Course Assigned.' });
      this.getCoursesForStudent();
      this.getSingleStudent();
     
    },
    error: () => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to assign Course.' });
    }
  });
  this.showCourseInstructor = false;
}

batchDragStart(batch: BatchForStudent) {
  this.draggedBatch = batch;
}




async courseDrop(event: Event) {
  

  this.studentService.checkRegFee(this.studentId).subscribe({
    next: (data: boolean) => {
      this.regFeePaid = data;
      
      if(this.regFeePaid == false){
        this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: 'This Student has not yet paid the Registration Fee.',
          icon: 'pi pi-exclamation-circle',
          acceptIcon: 'pi pi-money-bill mr-1',
          rejectIcon: 'pi pi-times mr-1',
          acceptLabel: 'Pay Registration Fee',
          rejectLabel: 'Cancel',
          rejectButtonStyleClass: 'p-button-outlined p-button-sm',
          acceptButtonStyleClass: 'p-button-sm',
          accept: () => {
              this.router.navigate(['admin/payments']);
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'The Course has not been assigned', life: 3000 });
          }
      });

      }else{
            this.showCourseInstructor = true;

          }


    }});
  
    

      
      
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
             this.getSingleStudent();
             this.getBatchForStudent();
             
             
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
  this.studentService.getSingleStudent(this.studentId).subscribe({next:(data: SingleStudent) => {this.singleStudent = data;
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

deleteCourseEnrollment(event: Event, enrollmentId:number){
  this.confirmationService.confirm({
    target: event.target as EventTarget,
    message: 'Are you sure that you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptIcon:"none",
    rejectIcon:"none",
    rejectButtonStyleClass:"p-button-text",
    accept: () => {
      this.studentService.deleteCourseEnrollment(enrollmentId).subscribe({
       next: () => {
         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Course enrollment Removed!' });
         this.getSingleStudent();
         this.getCoursesForStudent();
        
       },
       error: () => {
         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to remove Course enrollment.' });
       }
     });
    },
    reject: () => {
        
    }
});

}





deleteBatchEnrollment(event: Event, enrollmentId:number){
  this.confirmationService.confirm({
    target: event.target as EventTarget,
    message: 'Are you sure that you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptIcon:"none",
    rejectIcon:"none",
    rejectButtonStyleClass:"p-button-text",
    accept: () => {
      this.studentService.deleteBatchEnrollment(enrollmentId).subscribe({
       next: () => {
         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Batch Enrollment Removed!' });
         this.getSingleStudent();
         this.getBatchForStudent();
         
        
       },
       error: () => {
         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to remove Batch enrollment.' });
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
