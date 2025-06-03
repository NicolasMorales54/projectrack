import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EmailsService } from '../../../../core/services/emails.service';
import { LoginService } from '../../../../auth/services/login.service';
import { Email } from '../../../../core/model/email.model';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css',
  imports: [CommonModule, RouterModule],
})
export class InboxComponent implements OnInit {
  emails: Email[] = [];
  loading = true;
  error: string | null = null;
  myUserId: number | null = null;

  private router = inject(Router);
  private loginService = inject(LoginService);

  constructor(private emailsService: EmailsService) {}

  ngOnInit(): void {
    this.myUserId = this.loginService.getCurrentUserId();
    this.emailsService.findMyEmails().subscribe({
      next: (emails) => {
        this.emails = emails;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error cargando los correos';
        this.loading = false;
      },
    });
  }

  openEmail(email: Email) {
    this.router.navigate(['../conversation', email.id]);
  }
}
