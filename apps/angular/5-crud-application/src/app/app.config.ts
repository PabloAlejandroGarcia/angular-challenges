import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { ErrorHandlingInterceptor } from './services/api.service';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([ErrorHandlingInterceptor]))],
};
