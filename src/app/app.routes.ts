import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; // Ajustá la ruta según tu estructura

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // Ruta por defecto
    title: 'Inicio | Roberto Automotores'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
