import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IMService {

  url: string = 'https://localhost:7215/api/IM';

  constructor(private http: HttpClient) { }

  sendInstructor(instructor: FormData){
    return this.http.post<FormData>(this.url + '/add-instructor', instructor);
  }

  getAllInstructors(){
    return this.http.get<Instructor[]>(this.url + '/get-all-instructors');
  }

 
}



export interface Instructor{
  InstructorName: string;
  Description: string;
  Avatar: File[];
  DateOfJoin: string;
  Mobile: string;
  Email: string;
}
