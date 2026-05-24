import { CategoriesDetailsComponent } from './components/categories-details/categories-details.component';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth/auth.component').then((m) => m.AuthComponent),
    canActivate: [isLoggedInGuard],
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      {
        path: 'signin',
        loadComponent: () =>
          import('./components/signin/signin.component').then(
            (m) => m.SigninComponent,
          ),
        title: 'Sign In - E-Commerce',
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./components/signup/signup.component').then(
            (m) => m.SignupComponent,
          ),
        title: 'Sign Up - E-Commerce',
      },
      {
        path: 'forgot',
        loadComponent: () =>
          import('./components/forgot/forgot.component').then(
            (m) => m.ForgotComponent,
          ),
        title: ' forgot - E-Commerce',
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main/main.component').then((m) => m.MainComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent,
          ),
        // ✅ Optional - can remove as parent already has guard
        title: 'Home - E-Commerce',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (m) => m.CategoriesComponent,
          ),
        title: 'Categories - E-Commerce',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/product/product.component').then(
            (m) => m.ProductComponent,
          ),
        title: 'Products - E-Commerce',
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('./components/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent,
          ),
        title: 'Product Details - E-Commerce',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (m) => m.CartComponent,
          ),
        title: 'Cart - E-Commerce',
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./components/order/order.component').then(
            (m) => m.OrderComponent,
          ),
        title: 'Orders - E-Commerce',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./components/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent,
          ),
        title: 'Wishlist - E-Commerce',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then(
            (m) => m.BrandsComponent,
          ),
        title: 'Brands - E-Commerce',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./components/details/details.component').then(
            (m) => m.DetailsComponent,
          ),
        title: 'details - E-Commerce',
      },

      {
        path: 'brandDetails/:id',
        loadComponent: () =>
          import('./components/brand-details/brand-details.component').then(
            (m) => m.BrandDetailsComponent,
          ),
        title: 'details - E-Commerce',
      },
      {
        path: 'categoryDetails/:id',
        loadComponent: () =>
          import('./components/categories-details/categories-details.component').then(
            (m) => m.CategoriesDetailsComponent,
          ),
        title: 'details - E-Commerce',
      },

      {
        path: '**',
        loadComponent: () =>
          import('./components/not-found/not-found.component').then(
            (m) => m.NotFoundComponent,
          ),
        title: '404 - Page Not Found',
      },
    ],
  },
  // Uncomment checkout route if needed
  // {
  //   path: 'checkout/:cartId',
  //   loadComponent: () => import('./components/checkout/checkout.component').then(m => m.CheckoutComponent),
  //   canActivate: [authGuard],
  //   title: 'Checkout - E-Commerce'
  // },
];