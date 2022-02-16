import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { OrderService } from './services/order/order.service';
import { HttpClientModule } from '@angular/common/http';
import { ServiceModule } from './services/service.module';
import { PageLoaderComponent } from './shared/pageLoader/pageLoader.component';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderListComponent } from './pages/order/order-list/order-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SharedModule } from './shared/shared.module';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhoneSearchComponent } from './pages/dialog/phone-search/phone-search.component';
import { MaterialModule } from './shared/material/material.module';
import { OrderAddComponent } from './pages/order/order.add/order.add.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    PhoneSearchComponent,
    OrderAddComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    NgxMaskModule.forRoot(),
    SharedModule,

  ],
  exports: [
    BrowserAnimationsModule,
    ServiceModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
