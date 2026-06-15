import { Component } from '@angular/core';

@Component({
  selector: 'app-pending',
  standalone: true,
  template: `
    <div style="text-align:center; margin-top:100px;">
      <h2 style="color:red">
        Ask admin for approval to access the system
      </h2>
    </div>
  `
})
export class PendingComponent {}