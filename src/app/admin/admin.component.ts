import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { SidebarComponent } from './shared/sidebar/sidebar.component';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {}
