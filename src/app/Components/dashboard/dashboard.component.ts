import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { StyleClassModule } from 'primeng/styleclass';
import { enrollments, StudentService } from '../../Services/student.service';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuModule, TableModule, PanelMenuModule, ButtonModule, ChartModule, StyleClassModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

constructor(private StudentService: StudentService){

}
  chartData: any;
  chartOptions: any;
  recentEnrollments: enrollments[] = [];

  ngOnInit(): void {
    this.chartData = {
      labels: ['A', 'B', 'C', 'D', 'E', 'F'],
      datasets: [
          {
              data: [1500, 7000, 5500, 2000, 4200, 6000],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          },
          
      ],
  };
  
  this.chartOptions = {
      plugins: {
          legend: {
              display: true,
              position: 'top'
          }
      }
  };

  this.StudentService.getEnrollments().subscribe({next:(data:enrollments[]) => {
        this.recentEnrollments = data;
    }});
  }


  

}
