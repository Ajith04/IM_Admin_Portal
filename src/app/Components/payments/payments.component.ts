import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EnrolledCourseWithPayment, getStudentForPayment, NotRegFeeStudents, PaymentHistory, PaymentService, SinglePayment } from '../../Services/payment.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InplaceModule } from 'primeng/inplace';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';


@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, ConfirmDialogModule, ToastModule, FormsModule, FloatLabelModule, InputTextModule, CalendarModule, DialogModule, InplaceModule, TableModule, PanelModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit{

  notRegFeeStudents: NotRegFeeStudents[] = [];
  searchStudenId: string = '';
  visible: boolean = false;
  studentWithCourses: (getStudentForPayment & { enrolledCourses: EnrolledCourseWithPayment[] }) | undefined;

  allNonPaidStudents: (getStudentForPayment & { enrolledCourses: EnrolledCourseWithPayment[] })[] | undefined;

  paymentHistory: PaymentHistory[] = [];


  

  constructor(private paymentService: PaymentService, private confirmationService: ConfirmationService, private messageService: MessageService){

  }

  ngOnInit(): void {
    this.getNotRegFeeStudents();
    this.getNonPaidStudents();
    console.log(this.allNonPaidStudents)
  }

  searchStudent() {
    if (this.searchStudenId !== '') {
      this.visible = !this.visible;
  
      this.paymentService.getSearchStudent(this.searchStudenId).subscribe({
        next: (data: getStudentForPayment) => {
          this.studentWithCourses = {
            ...data,
            enrolledCourses: data.enrolledCourses.map(course => ({
              ...course,
              singlePayment: {
                enrollmentId: course.enrollmentId,
                amount: 0,
                date: ''
              }
            }))
          };
        }
      });
    }
  }
  

  closeSearchResult(){
    this.visible = this.visible == true ? false : true;
  }



  getNotRegFeeStudents(){
    this.paymentService.getNotRegFeeStudents().subscribe({next:(data:NotRegFeeStudents[]) => {
        this.notRegFeeStudents = data;
      }});
  }

  onClick(event: Event, studentId: string){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.paymentService.addRegFee(studentId).subscribe({
         next: () => {
           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration fee Added!' });
           this.getNotRegFeeStudents();
           
         },
         error: () => {
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add registration fee.' });
         }
       });
      },
      reject: () => {
          
      }
  });
  }


  sendSinglePayment(event: Event, course: EnrolledCourseWithPayment){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `You are going to add Rs. ${course.singlePayment.amount}.00 payment for ${this.studentWithCourses?.firstName} for ${course.courseName}`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        
        this.paymentService.sendSinglePayment(course.singlePayment).subscribe({
         next: () => {
           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Payment Added!' });
          this.searchStudent();
           
         },
         error: () => {
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add payment.' });
         }
       });
      },
      reject: () => {
          
      }
  });

  }


  getPaymentHistory(id: string){
    this.paymentService.getPaymentHistory(id).subscribe({next:(data:PaymentHistory[]) => {
      this.paymentHistory = data;
    }});
  }

  getNonPaidStudents(): void {
    this.paymentService.getNonPaidStudents().subscribe({
      next: (data: getStudentForPayment[]) => {
        this.allNonPaidStudents = data.map(student => ({
          ...student,
          enrolledCourses: student.enrolledCourses?.map(course => ({
            ...course,
            singlePayment: {
              enrollmentId: course.enrollmentId,
              amount: 0,
              date: ''
            }
          })) || []
        }));
      },
      error: (err) => {
        
      },
      complete: () => {
        
      }
    });
  }
  
    
}
