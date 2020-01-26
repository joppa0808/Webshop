import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductComponent} from './product/product.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AppComponent} from './app.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ProductUpdateComponent} from './product-update/product-update.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';


const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: []
  },
  {
    path: 'products',
    component: ProductComponent,
    canActivate: []
  },
  {
    path: 'products/product-info/:productId',
    component: ProductDetailsComponent,
    canActivate: []
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: []
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: []
  },
  {
    path: 'products/product-create',
    component: ProductCreateComponent,
    canActivate: []
  },
  {
    path: 'products/product-update/:productId',
    component: ProductUpdateComponent,
    canActivate: []
  },
  {
    path: 'shopping-cart/:userId',
    component: ShoppingCartComponent,
    canActivate: []
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
