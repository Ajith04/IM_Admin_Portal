import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { AdminLayoutComponent } from './Components/admin-layout/admin-layout.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { StudentManagementComponent } from './Components/student-management/student-management.component';
import { CourseManagementComponent } from './Components/course-management/course-management.component';
import { PaymentsComponent } from './Components/payments/payments.component';
import { StudyMaterialsComponent } from './Components/study-materials/study-materials.component';
import { InstituteManagementComponent } from './Components/institute-management/institute-management.component';
import { ViewCourseComponent } from './Components/view-course/view-course.component';
import { EditCourseComponent } from './Components/edit-course/edit-course.component';
import { Component } from '@angular/core';
import { InstructorComponent } from './Components/instructor/instructor.component';
import { AddCourseNameComponent } from './Components/add-course-name/add-course-name.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'admin', component:AdminLayoutComponent,
        children:[
            {path:'dashboard', component:DashboardComponent},
            {path:'student-management', component:StudentManagementComponent},
            {path:'course-management', component:CourseManagementComponent,
                children:[
                    {path:'', component:ViewCourseComponent},
                    {path:'edit-course/:id', component:EditCourseComponent}
                ]
            },
            {path:'payments', component:PaymentsComponent},
            {path:'institute-management', component:InstituteManagementComponent,
                children:[
                    {path:'instructor', component:InstructorComponent},
                    {path:'course-name', component:AddCourseNameComponent}

                ]
            },
            {path:'study-materials', component:StudyMaterialsComponent},
            {path:'', redirectTo:'dashboard', pathMatch:'full'}
        ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
