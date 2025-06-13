import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; // Ajustá la ruta según tu estructura
import { FormComponent } from './components/form/form.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // Ruta por defecto
    title: 'Inicio | Roberto Automotores'
  },
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];
