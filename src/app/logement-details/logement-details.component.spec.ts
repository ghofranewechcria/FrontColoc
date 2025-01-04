import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogementDetailsComponent } from './logement-details.component';

describe('LogementDetailsComponent', () => {
  let component: LogementDetailsComponent;
  let fixture: ComponentFixture<LogementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogementDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
