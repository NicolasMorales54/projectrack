import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { SidebarComponent } from './shared/sidebar/sidebar.component';

@Component({
  selector: 'app-client',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {}
