import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { RouterModule } from '@angular/router';
import { ProductDeltailComponent } from '../product-deltail/product-deltail.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProductDeltailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:HomeComponent},
      {path:'category/:id',component:HomeComponent},
      {path:'detail/:id',component:ProductDeltailComponent},
      {path:'CheckOut', loadChildren:()=>import('../check-out-module/check-out-module.module').then(m=>m.CheckOutModuleModule)}
    ])
  ]
})
export class UserModuleModule { }
