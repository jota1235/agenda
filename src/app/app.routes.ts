import { Routes } from '@angular/router';

export const routes: Routes = [
  // Splash Screen (pantalla inicial)
  {
    path: 'splash',
    loadComponent: () => import('./features/splash/splash.page').then((m) => m.SplashPage),
  },

  // Login
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login.page').then((m) => m.LoginPage),
  },

  // Menú principal (home temporal)
  {
    path: 'menu',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

  // Agenda principal
  {
    path: 'agenda',
    loadComponent: () => import('./features/agenda/pages/agenda-main/agenda-main.page').then((m) => m.AgendaMainPage),
  },

  // Alias para home (mantener compatibilidad)
  {
    path: 'home',
    redirectTo: 'menu',
    pathMatch: 'full',
  },

  // Ruta por defecto → Splash
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },

  // Wildcard para rutas no encontradas → Splash
  {
    path: '**',
    redirectTo: 'splash',
  },
];
