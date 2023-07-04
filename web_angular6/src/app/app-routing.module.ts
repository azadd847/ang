import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CustomerComponent } from './customer/customer.component'

import { ProductsComponent } from './components/products/products.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },


 
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
