import { NavigationEnd, Router, RouterOutlet, Event } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Client } from 'appwrite';

import { SidebarComponent } from './dashboard/shared/sidebar/sidebar.component';
import { FlowbiteService } from './dashboard/core/services/flowbite.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'ProjecTrack';
  client = new Client();

  constructor(
    private flowbiteService: FlowbiteService,
    private router: Router
  ) {
    this.client.setProject('67f1653a00297685a1bf');
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => window.HSStaticMethods.autoInit(), 100);
      }
    });
  }
}
