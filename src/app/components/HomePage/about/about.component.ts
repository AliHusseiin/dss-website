// about.component.ts
import { 
  Component, 
  ElementRef, 
  ViewChild, 
  AfterViewInit, 
  OnDestroy, 
  Inject, 
  PLATFORM_ID,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  computed
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { AboutTextComponent } from "./about-text/about-text.component";
import { AboutImageComponent } from "./about-image/about-image.component";
import { StatsBoxComponent } from "./about-stats-box/about-stats-box.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, AboutTextComponent, AboutImageComponent, StatsBoxComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent  {

}