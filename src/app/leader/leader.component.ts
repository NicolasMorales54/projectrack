import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { SidebarComponent } from './shared/sidebar/sidebar.component';

@Component({
  selector: 'app-leader',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './leader.component.html',
  styleUrl: './leader.component.css',
})
export class LeaderComponent {}
