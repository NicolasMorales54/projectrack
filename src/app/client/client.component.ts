import { CommonModule, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { NotificationsComponent } from './shared/notifications/notifications.component';
import { NotificationsService } from '../core/services/notifications.service';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterOutlet,
    NotificationsComponent,
    CommonModule,
    NgIf,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {
  showNotifications = false;
  unreadCount = 0;

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit() {
    this.loadUnreadCount();
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.loadUnreadCount();
    }
  }

  loadUnreadCount() {
    this.notificationsService
      .findMyNotifications()
      .subscribe((notifications) => {
        this.unreadCount = notifications.filter((n) => !n.leida).length;
      });
  }
}
