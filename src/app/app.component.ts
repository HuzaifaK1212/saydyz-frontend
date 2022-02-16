import { Component, Inject, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Message, MessageTypes } from './models/message.model';
import {
  Area,
  Channel,
  Customer,
  CustomerType,
  Flavor,
  Icicle,
  Order,
  OrderItems,
  Tub
} from './models/models';
import { PhoneSearchComponent } from './pages/dialog/phone-search/phone-search.component';
import { OrderListComponent } from './pages/order/order-list/order-list.component';
import { LogService } from './services/base/log.service';
import { EnvService } from './services/env/env.service';
import { MappingService } from './services/mapping/mapping.service';
import { OrderService } from './services/order/order.service';
import { UIService } from './services/ui/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private _uiService: UIService,
    private _logService: LogService,
    private orderService: OrderService,
    public environment: EnvService,
    public _mappingService: MappingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {

  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }
  title = 'saydyz-frontend';
}
