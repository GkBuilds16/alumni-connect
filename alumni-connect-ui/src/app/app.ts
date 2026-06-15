import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from './api.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule],
  template: `
    <div class="container">

      <h1>🎓 Alumni Connect</h1>

      <!-- 🚫 ACCESS BLOCKED -->
      <div *ngIf="!isApproved">
        <h2 style="color:red">
          Ask admin for approval to access the system
        </h2>
      </div>

      <!-- ✅ FULL ACCESS -->
      <div *ngIf="isApproved">

        <!-- FORM -->
        <div class="form-card">
          <h3>Add Alumni</h3>
          <input [(ngModel)]="name" placeholder="Name" />
          <input [(ngModel)]="domain" placeholder="Domain" />
          <button (click)="addAlumni()">Add</button>
        </div>

        <!-- LIST -->
        <div class="grid">
          <div class="card" *ngFor="let a of alumni">
            <h2>{{ a.name }}</h2>
            <p>{{ a.domain }}</p>

            <button (click)="deleteAlumni(a.id)">Delete</button>
          </div>
        </div>

      </div>

    </div>
  `
})
export class AppComponent implements OnInit {

  alumni: any[] = [];

  name: string = '';
  domain: string = '';

  isApproved: boolean = false;   // 🔥 key variable

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.checkAccess();
  }

  // 🔥 Check if user is approved
  checkAccess() {
    this.api.getAlumni().subscribe((data: any[]) => {

      console.log("ALL USERS:", data);

      // simulate current user = first one
      const currentUser = data[0];

      if (currentUser && currentUser.status === 'APPROVED') {
        this.isApproved = true;
        this.loadAlumni();
      } else {
        this.isApproved = false;
      }

      this.cdr.detectChanges();
    });
  }

  loadAlumni() {
    this.api.getApprovedAlumni().subscribe((data: any[]) => {
      this.alumni = data;
      this.cdr.detectChanges();
    });
  }

  addAlumni() {
    if (!this.name || !this.domain) return;

    this.api.addAlumni({
      name: this.name,
      domain: this.domain
    }).subscribe(() => {
      this.name = '';
      this.domain = '';
      this.loadAlumni();
    });
  }

  deleteAlumni(id: number) {
    this.api.deleteAlumni(id).subscribe(() => {
      this.loadAlumni();
    });
  }
}