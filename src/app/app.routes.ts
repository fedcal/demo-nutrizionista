import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Studio Bilancio Nutrizionale — Nutrizione personalizzata Roma'
  },
  {
    path: 'servizi',
    loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
    title: 'Servizi — Studio Bilancio Nutrizionale'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Studio Bilancio Nutrizionale'
  },
  {
    path: 'risorse',
    loadComponent: () => import('./pages/risorse/risorse.component').then((m) => m.RisorseComponent),
    title: 'Risorse — Studio Bilancio Nutrizionale'
  },
  {
    path: 'contatti',
    loadComponent: () => import('./pages/contatti/contatti.component').then((m) => m.ContattiComponent),
    title: 'Contatti — Studio Bilancio Nutrizionale'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
