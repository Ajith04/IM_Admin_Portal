import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url: string = 'https://localhost:7215/api/Student';

  constructor(private http: HttpClient) { }

  sendNewStudent(student: NewStudent){
    return this.http.post<NewStudent>(this.url + '/add-new-student', student);
  }

  sendToFollowUp(followUp:NewFollowUp){
    return this.http.post<NewFollowUp>(this.url + '/add-followup', followUp);
  }

  getAllStudents(){
    return this.http.get<Student[]>(this.url + '/get-all-students');
  }

  getSingleStudent(id: string){
    return this.http.get<Student>(this.url + `/get-single-student/${id}`);
  }

  updateSingleCourse(id: string, formData: updateSingleStudent){
    return this.http.patch<updateSingleStudent>(this.url + `/update-single-student/${id}`, formData);
  }

  deleteStudent(id: string){
    return this.http.delete(this.url + `/delete-student/${id}`);
  }

  getBatchForStudent(id: string){
    return this.http.get<BatchForStudent[]>(this.url + `/get-batches-for-student/${id}`)
  }

  batchToStudent(data: AssignBatch){
    return this.http.post<AssignBatch>(this.url + '/add-student-batch-enrollment', data);
  }

}

export interface AssignBatch{
  studentId: string,
  batchId: number | undefined
}

export interface BatchForStudent{
  batchId: number;
  batchName: string;

}

export interface updateSingleStudent{
  mobile: string;
  email: string;
  address: string;
}

export interface Student{
  studentId: string;
  firstName: string;
  lastName: string;
  dateOfJoin: string;
  mobileNo: string;
  email: string;
  address: string;
  intake: string;

}

export interface NewFollowUp{
  name: string;
  mobile: string;
  courses: string[],
  date: string;
  email: string;
  address: string;
  description: string;
}


export interface NewStudent{
  regNo: string;
  firstName: string;
  lastName: string;
  dateOfJoin: string;
  mobileNo: string;
  email: string;
  address: string;
  intake: string;
}
