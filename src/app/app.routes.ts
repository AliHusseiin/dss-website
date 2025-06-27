// app.routes.ts - Updated version
import { Routes } from '@angular/router';
import { HomePageComponent } from './components/HomePage/homepage.component';
import { AboutComponent } from './components/HomePage/about/about.component';
import { BlogsComponent } from './components/HomePage/blogs/blogs.component';
import { ProductComponent } from './components/HomePage/product/product.component';
import { ServiceComponent } from './components/HomePage/service/service.component';
import { ContactComponent } from './components/HomePage/contact/contact.component';
import { MainServiceComponent } from './components/main-service/main-service.component';
import { MainAboutUsComponent } from './components/main-about-us/main-about-us.component';
import { MainBlogsComponent } from './components/MainBlogs/main-blogs/main-blogs.component';
import { MainProductsComponent } from './components/main-products/main-products.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },         
  { path: 'about', component: AboutComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'products', component: ProductComponent },
  { path: 'services', component: ServiceComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'mainservice', component: MainServiceComponent },
  { path: 'mainaboutus', component: MainAboutUsComponent },
  { path: 'mainblogs', component: MainBlogsComponent },
  { path: 'mainproducts', component: MainProductsComponent },
  { path: 'mainproducts/:id', component: MainProductsComponent }, 
  { path: '**', redirectTo: '', pathMatch: 'full' }
];