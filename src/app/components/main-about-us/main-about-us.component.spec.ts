import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAboutUsComponent } from './main-about-us.component';

describe('MainAboutUsComponent', () => {
  let component: MainAboutUsComponent;
  let fixture: ComponentFixture<MainAboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainAboutUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
