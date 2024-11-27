import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  url: string = 'https://localhost:7215/api/Course';

  constructor(private http:HttpClient) { }

  

getAllCategories(){
  return this.http.get<Category[]>(this.url + '/get-all-categories');
}

sendMainCourse(mainCourse: FormData){
  return this.http.post<FormData>(this.url + '/add-main-course', mainCourse);
}

getCourseNames(){
  return this.http.get<MainCourseName[]>(this.url + '/get-main-course-names');
}

getAllLevels(){
  return this.http.get<Level[]>(this.url + '/get-all-levels');
}

sendCourseLevel(courseLevel:CourseLevel){
  return this.http.post<CourseLevel>(this.url + '/add-course-level', courseLevel);
}

getAllCourses(){
  return this.http.get<AllMainCourse[]>(this.url + '/get-all-courses');
}

getInstructorForCourse(){
  return this.http.get<InstructorForCourse[]>(this.url + '/get-instructor-for-course');
}

}

export interface InstructorForCourse{
  instructorId: number;
  instructorName: string;
  avatar: File[];
}

export interface AllInstructors{
  InstructorId: number;
  InstructorName: string;
  Avatar: string;
}

export interface AllMainCourse{
  CourseName: string;
  Thumbnail: File[];
  Categories: Category[];
  CourseLevel: AllCourseLevel[];

}

export interface AllCourseLevel{
  CourseId: string;
  CourseName: string;
  LevelName: string;
  CreatedDate: string;
  Duration: string;
  CourseFee: number;
  Description: string;
  Instructors: Instructor[];
}

export interface Instructor{
  Instructorname: string;
}



export interface CourseLevel{
  CourseId: string;
  CourseName: string;
  LevelName: string;
  CreatedDate: string;
  Duration: string;
  CourseFee: number;
  Description: string;
}

export interface Level{
  LevelName: string;
}

export interface MainCourseName{
  courseName: string;
}

export interface Category{
  categoryName: string;
}

export interface MainCourse{
  courseName: string;
  category: string[];
  thumbnails: File[];
}



export interface AddCourse{
  CourseId: string;
  CourseName: string,
  Level: string;
  Category: string;
  Thumbnail:FormData;
  Duration: string;
  CourseFee: number;
}
