import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IMService } from '../../Services/im.service';
import { Instructor } from '../../Services/im.service';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, ImageModule],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.css'
})
export class InstructorComponent {

  allInstructors: Instructor[] = [];

    constructor(private imService: IMService) {}

    ngOnInit() {
      this.getAllInstructors();

    }

    getAllInstructors(){
      this.imService.getAllInstructors().subscribe({next:(data:Instructor[]) => {
        this.allInstructors = data;
    }});
    }

    // getSeverity(status: string) {
    //     switch (status) {
    //         case 'INSTOCK':
    //             return 'success';
    //         case 'LOWSTOCK':
    //             return 'warning';
    //         case 'OUTOFSTOCK':
    //             return 'danger';
    //     }
    // }

}
