import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutStatsBoxComponent } from './about-stats-box.component';

describe('AboutStatsBoxComponent', () => {
  let component: AboutStatsBoxComponent;
  let fixture: ComponentFixture<AboutStatsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutStatsBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutStatsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
