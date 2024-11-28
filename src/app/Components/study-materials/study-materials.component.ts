import { Component } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-study-materials',
  standalone: true,
  imports: [StepperModule, ButtonModule],
  templateUrl: './study-materials.component.html',
  styleUrl: './study-materials.component.css'
})
export class StudyMaterialsComponent {

}
