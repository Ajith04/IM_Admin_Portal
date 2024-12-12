import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


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
    return this.http.get<SingleStudent>(this.url + `/get-single-student/${id}`);
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

  getCoursesForStudent(id: string){
    return this.http.get<CourseForStudent[]>(this.url + `/get-courses-for-student/${id}`);
  }

  checkRegFee(studentId: string): Observable<boolean> {
    return this.http.get<boolean>(this.url + `/check-reg-fee/${studentId}`);
  }

  sendCourseEnrollment(data: CourseEnrollment){
    return this.http.post<CourseEnrollment>(this.url + '/add-student-course-enrollment', data);
  }

  deleteCourseEnrollment(id: number){
    return this.http.delete(this.url + `/delete-course-enrollment/${id}`);
  }

  deleteBatchEnrollment(id: number){
    return this.http.delete(this.url + `/delete-batch-enrollment/${id}`);
  }
  

}


export interface SingleStudent{
  studentId: string;
  firstName: string;
  lastName: string;
  dateOfJoin: string;
  mobileNo: string;
  email: string;
  address: string;
  batch: string;
  intake: string;
  batchEnrollmentId: number;
  singleStudentCourseLevelResponses: SingleStudentCourseLevel[];

}

export interface SingleStudentCourseLevel{
  courseEnrollmentId: number;
  courseImage: File;
  courseName: string;
  levelName: string;
  instructorName: string;
}



export interface CourseEnrollment{
  studentId: string;
  courseId: string;
  instructorId: number;
  courseFee: number;
  duration: string;
  enrollmentDate: string;
}

export interface CourseForStudent{
  mainCourseName: string;
  courseLevels: CourseLevelForStudent[]
}

export interface CourseLevelForStudent{
  levelId: string;
  levelName: string;
  courseFee: number;
  duration: string;
  courseImages: File[];
  instructors: Instructor[];
}

export interface Instructor{
  instructorId: number;
  name: string;
  avatar: File
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
  batch: string;
  studentCourseLevelResponses: StudentCourseLevel[];

}

export interface StudentCourseLevel{
courseId: string;
courseName: string;
levelName: string;
duration: string;
courseFee: number;
instructor: string;
enrolledDate: string;
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
