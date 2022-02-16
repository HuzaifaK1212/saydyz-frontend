import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LogService } from './base/log.service';
import { EnvService } from './env/env.service';
import { EnvServiceProvider } from './env/env.service.provider';
import { MappingService } from './mapping/mapping.service';
import { OrderService } from './order/order.service';
import { PageLoaderComponent } from '../shared/pageLoader/pageLoader.component';
import { UIService } from './ui/ui.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    UIService,
    OrderService,
    MappingService,
    // EnvService,
    EnvServiceProvider,
    LogService,
  ],
  declarations: [],
  exports: [MatProgressSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ServiceModule {}
