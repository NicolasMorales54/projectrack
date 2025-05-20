import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, AfterViewChecked, } from '@angular/core';
import { LucideAngularModule, Plus, ClipboardList, UserRound, SquareUserRound, } from 'lucide-angular';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProjectsService } from '../../../core/services/projects.service';
import { LoginService } from '../../../auth/services/login.service';
import { Project } from '../../../core/model/project.model';
import { User } from '../../../core/model/user.model';


@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule, CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, AfterViewChecked {
  readonly plus = Plus;
  readonly clipboardList = ClipboardList;
  readonly userRound = UserRound;
  readonly squareUserRound = SquareUserRound;
  projects$: Project[] = [];
  currentUser: User | null = null;
  projectColorMap: { [projectId: number]: string } = {};

  projectColors = [
    'bg-green-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-red-500',
  ];

  private getRandomColor(): string {
    const idx = Math.floor(Math.random() * this.projectColors.length);
    return this.projectColors[idx];
  }

  constructor(
    private projectsService: ProjectsService,
    private loginService: LoginService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get current user
    this.currentUser = this.loginService.getCurrentUser();
    if (this.currentUser?.id) {
      this.projectsService.findByUserId(this.currentUser.id).subscribe({
        next: (data) => {
          this.projects$ = data;
          // Assign a random color to each project if not already assigned
          for (const project of data) {
            if (!this.projectColorMap[project.id]) {
              this.projectColorMap[project.id] = this.getRandomColor();
            }
          }
          this.cdr.markForCheck();
          console.log('Projects loaded:', this.projects$);
        },
        error: (err) => {
          console.error('Failed to load projects', err);
        },
      });
    }
  }

  ngAfterViewChecked(): void {
    try {
      if ((window as any).HSStaticMethods) {
        (window as any).HSStaticMethods.autoInit(['accordion']);
      }
    } catch (error) {
      console.error('Error initializing HSStaticMethods:', error);
    }
  }

  getColor(projectId: number): string {
    return this.projectColorMap[projectId] || 'bg-gray-400';
  }

  logout(): void {
    this.loginService.logout();
  }
}
