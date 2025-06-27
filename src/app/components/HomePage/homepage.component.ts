import { Component } from '@angular/core';
import { HeroComponent } from '../HomePage/hero/hero.component';
import { ProductComponent } from '../HomePage/product/product.component';
import { ServiceComponent } from '../HomePage/service/service.component';
import { PartnersComponent } from '../HomePage/partners/partners.component';
import { BlogsComponent } from '../HomePage/blogs/blogs.component';
import { ContactComponent } from '../HomePage/contact/contact.component';
import { AboutComponent } from "./about/about.component";


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    ProductComponent,
    ServiceComponent,
    PartnersComponent,
    BlogsComponent,
    ContactComponent,
    AboutComponent
],
  templateUrl: './homepage.component.html',
})
export class HomePageComponent {

  
}
