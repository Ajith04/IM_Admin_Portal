import { Component } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { EditorModule } from 'primeng/editor';


@Component({
  selector: 'app-study-materials',
  standalone: true,
  imports: [StepperModule, ButtonModule, FileUploadModule, ToastModule, InputTextModule, FloatLabelModule, DropdownModule, CalendarModule, EditorModule],
  templateUrl: './study-materials.component.html',
  styleUrl: './study-materials.component.css'
})
export class StudyMaterialsComponent {

  onUpload(event:any){

  }

}
