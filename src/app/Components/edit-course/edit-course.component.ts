import { Component, OnInit } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { CommonModule, NgStyle } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DragDropModule } from 'primeng/dragdrop';
import { CourseService, InstructorForCourse } from '../../Services/course.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TagModule } from 'primeng/tag';




@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [FieldsetModule, AvatarModule, FormsModule, InputTextModule, EditorModule, NgStyle, ButtonModule, DragDropModule, CommonModule, FormsModule, ToggleButtonModule, InputSwitchModule, TagModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent implements OnInit{

    constructor(private courseService: CourseService){

    }

  checked: boolean = false;

  allInstructors: InstructorForCourse[] = [];

  selectedProducts: InstructorForCourse[] = [];

  draggedProduct: InstructorForCourse | undefined | null;

  ngOnInit() {
      this.selectedProducts = [];

      this.courseService.getInstructorForCourse().subscribe({next:(data: InstructorForCourse[]) => {this.allInstructors = data;}});

  }

  dragStart(product: InstructorForCourse) {
      this.draggedProduct = product;
  }

  drop() {
      if (this.draggedProduct) {
          let draggedProductIndex = this.findIndex(this.draggedProduct);
          this.selectedProducts = [...(this.selectedProducts as InstructorForCourse[]), this.draggedProduct];
          this.allInstructors = this.allInstructors?.filter((val, i) => i != draggedProductIndex);
          this.draggedProduct = null;
      }
  }

  dragEnd() {
      this.draggedProduct = null;
  }

  findIndex(product: InstructorForCourse) {
      let index = -1;
      for (let i = 0; i < (this.allInstructors as InstructorForCourse[]).length; i++) {
          if (product.instructorId === (this.allInstructors as InstructorForCourse[])[i].instructorId) {
              index = i;
              break;
          }
      }
      return index;
  }
}
