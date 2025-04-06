import {
  LucideAngularModule,
  Plus,
  ClipboardList,
  UserRound,
  SquareUserRound,
} from 'lucide-angular';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  constructor() {}
  readonly plus = Plus;
  readonly clipboardList = ClipboardList;
  readonly userRound = UserRound;
  readonly squareUserRound = SquareUserRound;
  ngOnInit(): void {}
}
