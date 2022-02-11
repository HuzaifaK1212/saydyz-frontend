import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LogService } from './services/base/log.service';
import { EnvService } from './services/env/env.service';
import { EnvServiceProvider } from './services/env/env.service.provider';
import { MappingService } from './services/mapping/mapping.service';
import { OrderService } from './services/order/order.service';
import { PageLoaderComponent } from './services/pageLoader/pageLoader.component';
import { UIService } from './services/ui/ui.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [HttpClientModule, MatProgressSpinnerModule],
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
