import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanTableComponent } from './kanban-table.component';

describe('KanbanTableComponent', () => {
  let component: KanbanTableComponent;
  let fixture: ComponentFixture<KanbanTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
