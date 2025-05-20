import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  AfterViewChecked,
} from '@angular/core';
import {
  LucideAngularModule,
  Plus,
  ClipboardList,
  UserRound,
  SquareUserRound,
} from 'lucide-angular';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ModalCreateProjectComponent } from './modal-create-project.component';
import { ProjectsService } from '../../../core/services/projects.service';
import { LoginService } from '../../../auth/services/login.service';
import { Project } from '../../../core/model/project.model';
import { User } from '../../../core/model/user.model';

@Component({
  selector: 'app-sidebar',
  imports: [
    LucideAngularModule,
    CommonModule,
    RouterLink,
    ModalCreateProjectComponent,
  ],
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
  showCreateProjectModal = false;

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

  constructor(
    private projectsService: ProjectsService,
    private loginService: LoginService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const loadProjects = () => {
      this.projectsService.findAll().subscribe({
        next: (data) => {
          this.projects$ = data;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Failed to load projects', err);
        },
      });
    };
    loadProjects();
    this.projectsService.projectsChanged$.subscribe(() => {
      loadProjects();
    });
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

  getColor(index: number): string {
    return this.projectColors[index % this.projectColors.length];
  }

  logout(): void {
    this.loginService.logout();
  }

  openCreateProjectModal() {
    this.showCreateProjectModal = true;
  }

  handleProjectCreated(project: Project) {
    // No need to manually refresh, just close the modal
    this.closeCreateProjectModal();
  }

  closeCreateProjectModal() {
    this.showCreateProjectModal = false;
  }
}
