import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { getRoleFromToken } from './jwt.util';

@Component({
  selector: 'app-alumni-list',
  standalone: true,
  imports: [CommonModule],

  template: `
  <div class="min-h-screen bg-gray-100 p-6">

    <h1 class="text-2xl font-bold mb-4">
      {{ title }}
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div *ngFor="let user of alumni"
           class="bg-white p-4 rounded-lg shadow">

        <h3 class="font-semibold text-lg">
          {{ user.name }}
        </h3>

        <p class="text-gray-500">
          {{ user.email }}
        </p>

        <p class="text-sm mt-2">
          🎓 {{ user.college }} ({{ user.passoutYear }})
        </p>

      </div>

    </div>

  </div>
  `
})
export class AlumniListComponent implements OnInit {

  alumni: any[] = [];
  title = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {

    const role = getRoleFromToken();

    // 🔥 Dynamic title
    if (role === 'STUDENT') {
      this.title = 'Explore Alumni Network';
    } else {
      this.title = 'Connect with Alumni';
    }

    // 🔥 Fetch alumni
    this.api.getApprovedAlumni().subscribe({

      next: (data: any[]) => {
        this.alumni = data;
      },

      error: (err: any) => {
        console.error('Error loading alumni:', err);
      }

    });
  }
}