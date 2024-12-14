import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private url: string = 'https://localhost:7215/api/Payment';

  constructor(private http: HttpClient) { }

  getNotRegFeeStudents(){
    return this.http.get<NotRegFeeStudents[]>(this.url + '/get-not-regfee-students');
  }

  addRegFee(studentId: string) {
    const body = {studentId};
    return this.http.post<string>(this.url + '/add-reg-fee', body);
  }

  getSearchStudent(id: string){
    return this.http.get<getStudentForPayment>(this.url + `/get-enrollments-with-student/${id}`);
  }

  sendSinglePayment(singlePayment: SinglePayment){
    return this.http.post<SinglePayment>(this.url + '/send-single-payment', singlePayment)
  }

  getPaymentHistory(id: string){
    return this.http.get<PaymentHistory[]>(this.url + `/get-payment-history/${id}`);
  }



}

export interface PaymentHistory{
  courseName: string;
  amount: number;
  date: string;
}

export interface EnrolledCourseWithPayment extends EnrolledCourses {
  singlePayment: SinglePayment;
}


export interface SinglePayment{
  enrollmentId: number;
  amount: number;
  date: string;
}

export interface getStudentForPayment{
  studentId: string;
  firstName: string;
  enrolledCourses: EnrolledCourses[];
}

export interface EnrolledCourses{
  enrollmentId: number;
  courseId: string;
  courseName: string;
  courseFee: number;
  payableAmount: number;
}


export interface NotRegFeeStudents{
  studentId: string;
}


