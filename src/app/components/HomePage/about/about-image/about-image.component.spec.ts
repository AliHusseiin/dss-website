import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutImageComponent } from './about-image.component';

describe('AboutImageComponent', () => {
  let component: AboutImageComponent;
  let fixture: ComponentFixture<AboutImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
