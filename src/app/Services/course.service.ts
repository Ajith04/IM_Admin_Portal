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

getAllCourseNames(){
  return this.http.get<getCourseNames[]>(this.url + '/get-all-course-names');
}

getSingleCourseLevel(id: string){
  return this.http.get<singleCourseLevel>(this.url + `/get-single-course-level/${id}`)
}

updateSingleCourse(levelId: string, formData:updateCourseData){
  return this.http.patch<updateCourseData>(this.url + `/update-single-course/${levelId}`, formData);
}

instructorToCourse(data: AssignInstructor){
  return this.http.post<AssignInstructor>(this.url + '/assign-instructor', data);
}

getAssignedInstructor(courseId: string){
  return this.http.get<getInsructor[]>(this.url + `/get-assigned-instructors/${courseId}`)
}

}

export interface getInsructor{
  instructorName: string;
  avatar: File[];
  instructorKnowCourses: courseNames[];
}



export interface AssignInstructor{
  courseId: string,
  instructorId: number | undefined
}

export interface updateCourseData{
  duration: string;
  courseFee: number;
  description: string;
}

export interface singleCourseLevel{
  courseName: string,
  thumbnail: File[],
  levelId: string,
  levelName: string,
  createdDate: string,
  duration: string,
  courseFee: number,
  description: string
}

export interface getCourseNames{
  name : string;
}

export interface InstructorForCourse{
  instructorId: number;
  instructorName: string;
  avatar: File[];
  instructorCourseNameResponses: courseNames[]
}

export interface courseNames{
  courseName: string;
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
