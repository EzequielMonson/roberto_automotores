import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; // ✅ Animaciones necesarias
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr'; // ✅ Importar Toastr

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(), // ✅ Necesario para Toastr
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 2000, // duración en milisegundos, acá 2 segundos
        positionClass: 'toast-top-right', // opcional, posición del toast
        preventDuplicates: true,
      })
    ), // ✅ Registrar Toastr
  ],
};
