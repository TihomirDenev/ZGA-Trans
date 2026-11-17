import { Routes } from '@angular/router';

import { HomeComponent } from '@libs/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('@libs/pages/privacy-policy/privacy-policy.component').then(
        (module) => module.PrivacyPolicyComponent,
      ),
  },
  {
    path: '404',
    loadComponent: () =>
      import('@libs/pages/not-found/not-found.component').then(
        (module) => module.NotFoundComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('@libs/pages/not-found/not-found.component').then(
        (module) => module.NotFoundComponent,
      ),
  },
];
