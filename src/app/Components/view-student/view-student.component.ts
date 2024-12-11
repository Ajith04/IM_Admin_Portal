import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { ImageModule } from 'primeng/image';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AllCourseLevel, AllMainCourse, Category, CourseService, getCourseNames, Instructor, Level, MainCourse, MainCourseName } from '../../Services/course.service';
import { Router } from '@angular/router';
import { Student, StudentService } from '../../Services/student.service';
import { CardModule } from 'primeng/card';
import { BatchName, IMService } from '../../Services/im.service';

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [TableModule, TagModule, ToastModule, RatingModule, ButtonModule, HttpClientModule, DialogModule, RippleModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, RadioButtonModule, RatingModule, FormsModule, InputNumberModule, SplitButtonModule, IconFieldModule, InputIconModule, SkeletonModule, CalendarModule, MultiSelectModule, ReactiveFormsModule, FloatLabelModule, EditorModule, ImageModule, ScrollTopModule, CardModule],
  providers: [CourseService, MessageService, ConfirmationService],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ViewStudentComponent implements OnInit{

  courses: MainCourse[] = [];
  expandedRows: { [key: string]: boolean } = {};
  addCourseBtn: MenuItem[];
  
  searchValue: string | undefined;
  levels: Level[] | undefined;
  categories: Category[] = [];
  selectedCity: Level | undefined;
  addNewStudentPopup: boolean = false;
  addFollowUpPopup: boolean = false;
  editCoursePopup: boolean = false;
  date: Date | undefined;
  value!: string;
  selectedCourse: any = null;
  selectedBatch: any = null;
  mainCourseNames: MainCourseName[] = [];
  allLevels: Level[] = [];
  allStudents: Student[] = [];
  allCourseLevels: AllCourseLevel[] = [];
  instructors: Instructor[] = [];
  allCourseNames: getCourseNames[] = [];
  allBatchNames: BatchName[] =[];



  addNewStudent:FormGroup;
  addToFollowup: FormGroup;

 
  

    constructor(private courseService: CourseService, private messageService: MessageService, private fb: FormBuilder, private router: Router, private studentService: StudentService, private imService: IMService) {
      this.addCourseBtn = [
        {
          icon:'pi pi-file-plus',
            label: 'Add a New Student',
            command: () => {
                this.addStudent();
            }
        },
        { separator: true },
        {
          icon: 'pi pi-user-plus',
            label: 'Add to Follow-up List',
            command: () => {
              this.getAllCourseNames();
              this.addFollowup();
            }
        }
    ];

    this.addNewStudent = this.fb.group({
      regNo: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      dateOfJoin: ['',Validators.required],
      mobileNo: ['',Validators.required],
      email: ['',Validators.required],
      address: ['',Validators.required],
      intake: ['']

    });

    this.addToFollowup = this.fb.group({
      name:['', Validators.required],
      mobile: ['', Validators.required],
      courses: [[], Validators.required],
      date: ['', Validators.required],
      email: [''],
      address: [''],
      description: ['', Validators.required]
    })
    
}

getMainCourseNames(){
  this.courseService.getCourseNames().subscribe({next:(data:MainCourseName[]) => {this.mainCourseNames = data;}});
}

getAllBatchNames(){
  this.imService.getAllBatchNames().subscribe({next:(data:BatchName[]) => {this.allBatchNames = data;}});
}


onSearch(event: Event, table: any): void {
  const input = event.target as HTMLInputElement | null;
  const value = input?.value || ''; 
  table.filterGlobal(value, 'contains');
}

onFilter(table: any): void {
  if (this.selectedCourse && this.selectedCourse.courseName) {
    table.filterGlobal(this.selectedCourse.courseName, 'contains');
  } else {
    table.clear();
  }
}


onFileSelect(event: any): void {

  const selectedFiles = event.files || [];
  const currentFiles = this.addNewStudent.get('thumbnails')?.value || [];

    this.addNewStudent.patchValue({
    thumbnails: [...currentFiles, ...selectedFiles],
  });
}



save(severity: string) {
  this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
}

addStudent() {
  this.addNewStudentPopup = true;
  this.addNewStudent.reset();
}

addFollowup() {
  this.addFollowUpPopup = true;
  this.addToFollowup.reset();
}

    
    ngOnInit() {
      this.courseService.getAllCategories().subscribe({next:(data:Category[]) => {this.categories = data;}});
      this.getAllStudents();
      this.getMainCourseNames();
      this.getAllBatchNames();
             
    }

    sendNewStudent(): void {
      if (this.addNewStudent.valid) {

        var selectedDate = this.addNewStudent.get('dateOfJoin')?.value;
        var formattedDate = selectedDate ? selectedDate.toISOString(): null;

        this.addNewStudent.patchValue({
          intake : 'On Premise'
        });

        this.addNewStudent.patchValue({
          dateOfJoin : formattedDate
        });
        
        const newStudent = this.addNewStudent.value;
        this.studentService.sendNewStudent(newStudent).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Student Registered.' });
            this.addNewStudentPopup = false;
            this.getAllStudents();
            setTimeout(() => {this.router.navigate(['admin/payments'])}, 2000);
            
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Register Student.' });
          }
        });

        
        }
    }

    sendToFollowUp(){
      if(this.addToFollowup.valid){

        const transformedCourses = this.addToFollowup.value.courses.map((course: any) => course.name);

        this.addToFollowup.patchValue({
          courses: transformedCourses
        });

        var followUp = this.addToFollowup.value;
        

        this.studentService.sendToFollowUp(followUp).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added to Follow-Up List' });
            this.addFollowUpPopup = false;
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add to Follow-Up.' });
          }
        });
        
      }
    }

    getAllCourseNames(){
      this.courseService.getAllCourseNames().subscribe({next: (data: getCourseNames[]) => {this.allCourseNames = data}});
    }

  

    addNewCourse(){
      
    }
    

    onRowExpand(event: any) {
      this.expandedRows = {};
      const studentId = event.data.studentId;
      this.expandedRows[studentId] = true;
  }

  onRowCollapse(event: any) {
    const studentId = event.data.studentId;
    delete this.expandedRows[studentId];
}

getAllStudents(){
  this.studentService.getAllStudents().subscribe({next: (data:Student[]) => {this.allStudents = data}});
}

}
