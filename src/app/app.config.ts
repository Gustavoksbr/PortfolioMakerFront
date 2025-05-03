import {ApplicationConfig, ErrorHandler, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideToastr, ToastrModule} from 'ngx-toastr';
import {GlobalErrorHandler} from './providers/GlobalErrorHandler';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    provideAnimations(),
    provideToastr(),
    // importProvidersFrom(
    //   BrowserAnimationsModule,
    //   ToastrModule.forRoot()  // Isso é essencial!
    // )

  ]
};
