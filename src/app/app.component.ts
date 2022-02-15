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
  Icicle,
  Order,
  OrderItems,
  Tub,
  Type,
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
  mainForm!: FormGroup;
  items!: FormArray;
  order!: Order;
  areas!: Area[];
  channels!: Channel[];
  numPattern = '^[0-9]+$';

  constructor(
    private formBuilder: FormBuilder,
    private _uiService: UIService,
    private _logService: LogService,
    private orderService: OrderService,
    public environment: EnvService,
    public _mappingService : MappingService,
    public dialog: MatDialog,
  ) {}

  types: Type[] = [
    { value: 1, displayValue: 'Individual' },
    { value: 2, displayValue: 'Retailer' },
  ];

  genders: string[] = ['Male', 'Female'];

  icicles: Icicle[] = [
    { id: 1, flavorName: 'Falsa Black Salt', price: 250 },
    { id: 2, flavorName: 'Anar Black Salt', price: 250 },
    { id: 3, flavorName: 'Chikoo', price: 250 },
    { id: 4, flavorName: 'Cookies N Cream', price: 250 },
    { id: 5, flavorName: 'Dark Chocolate', price: 250 },
    { id: 6, flavorName: 'Vanilla Nutella', price: 300 },
    { id: 7, flavorName: 'Chocolate Nutella', price: 300 },
    { id: 8, flavorName: 'Salted Caramel Nutella', price: 300 },
    { id: 9, flavorName: 'Choco with Roasted Almonds', price: 300 },
    { id: 10, flavorName: 'Dark Choco with Roasted Almonds', price: 300 },
    { id: 11, flavorName: 'Shareefa', price: 300 },
    { id: 12, flavorName: 'Salted Caramel with Roasted Almonds', price: 300 },
    { id: 13, flavorName: 'Salted Caramel with Walnuts', price: 300 },
    { id: 14, flavorName: 'Lychee', price: 300 },
    { id: 15, flavorName: 'Chai Yen (Thai Iced Tea)', price: 300 },
    { id: 16, flavorName: 'Icecream Soda', price: 250 },
    { id: 17, flavorName: 'Badam Kulfi', price: 250 },
    { id: 18, flavorName: 'Pista Kulfi', price: 250 },
  ];

  tubs: Tub[] = [
    { id: 1, flavorName: 'Falsa Black Salt', price: 1000 },
    { id: 2, flavorName: 'Anar Black Salt', price: 1000 },
    { id: 3, flavorName: 'Chikoo', price: 1000 },
    { id: 4, flavorName: 'Cookies N Cream', price: 1000 },
    { id: 5, flavorName: 'Dark Chocolate', price: 1000 },
    { id: 6, flavorName: 'Vanilla Nutella', price: 1000 },
    { id: 7, flavorName: 'Chocolate Nutella', price: 1000 },
    { id: 8, flavorName: 'Salted Caramel Nutella', price: 1000 },
    { id: 9, flavorName: 'Choco with Roasted Almonds', price: 1200 },
    { id: 10, flavorName: 'Dark Choco with Roasted Almonds', price: 1200 },
    { id: 11, flavorName: 'Shareefa', price: 1200 },
  ];

  ngOnInit(): void {
    this.mainForm = this.formBuilder.group({
      orderId: [this.generateOrderNo()],
      orderDate: [''],
      customerName: [''],
      gender: [''],
      channel: [''],
      phoneNo: [''],
      area: [''],
      address: [''],
      customerTypeId: [''],
      icicleItems: new FormArray([]),
      tubItems: new FormArray([]),
      totalPrice: [''],
      discount: [''],
      salePrice: [''],
      deliveryCharge: [''],
    });

    this.generateOrderNo();
    this.loadAreaListAll();
    this.loadChannelListAll();
  }

  get icicleItemsFormArray() {
    return this.mainForm.get('icicleItems') as FormArray;
  }

  get tubItemsFormArray() {
    return this.mainForm.get('tubItems') as FormArray;
  }

  promoClick(limit: number) {
    this.items = this.mainForm.get('icicleItems') as FormArray;
    for (let i = 0; i < limit; i++) {
      if (i == limit - 1) {
        this.items.push(
          this.formBuilder.group({
            quantity: 1,
            price: [{ value: 0, disabled: true }],
            flavorId: 0,
          })
        );
      } else {
        this.items.push(
          this.formBuilder.group({
            quantity: 1,
            price: 0,
            flavorId: 0,
          })
        );
      }
    }
  }

  addIcicle() {
    this.items = this.mainForm.get('icicleItems') as FormArray;
    this.items.push(
      this.formBuilder.group({
        quantity: 0,
        price: 0,
        flavorId: 0,
      })
    );
  }

  addTub() {
    this.items = this.mainForm.get('tubItems') as FormArray;
    this.items.push(
      this.formBuilder.group({
        quantity: 0,
        price: 0,
        flavorId: 0,
      })
    );
  }

  onDelete(index: number, itemType: number) {
    if (itemType == 1) {
      (<FormArray>this.mainForm.get('icicleItems')).removeAt(index);
    } else if (itemType == 2) {
      (<FormArray>this.mainForm.get('tubItems')).removeAt(index);
    }
  }

  calculatePrice(flavor: any, index: number, itemType: number) {
    let selectedFlavor;
    let tempItems: any;
    if (itemType == 1) {
      tempItems = this.mainForm.get('icicleItems') as FormArray;
      selectedFlavor = this.icicles?.find((x) => x.id == flavor);
    } else if (itemType == 2) {
      tempItems = this.mainForm.get('tubItems') as FormArray;
      selectedFlavor = this.tubs?.find((x) => x.id == flavor);
    }

    var tempItem = tempItems.at(index);
    var quantity = tempItem.get('quantity')?.value;

    tempItem.setValue({
      price: quantity * (selectedFlavor?.price ?? 0),
      quantity: quantity,
      flavorId: flavor,
    });
  }

  refreshPrice(index: any, itemType: number) {
    let tempItems: any;
    if (itemType == 1) {
      tempItems = this.mainForm.get('icicleItems') as FormArray;
    } else if (itemType == 2) {
      tempItems = this.mainForm.get('tubItems') as FormArray;
    }
    var tempItem = tempItems.at(index);
    let flavorIndex = tempItem.get('flavorId')?.value;
    this.calculatePrice(flavorIndex, index, itemType);
  }

  onTotal() {
    let total = 0,
      sale = 0;
    var icicles = this.mainForm.get('icicleItems') as FormArray;
    if (icicles.length > 0) {
      for (let control of icicles.controls) {
        total += parseInt(control.value.price ?? 0);
      }
    }
    var tubs = this.mainForm.get('tubItems') as FormArray;
    if (tubs.length > 0) {
      for (let control of tubs.controls) {
        total += parseInt(control.value.price ?? 0);
      }
    }
    let disc = parseInt(this.mainForm.get('discount')?.value);
    if (disc > 0) {
      let discountDeduction = (total / 100) * disc;
      sale = total - discountDeduction;
    }
    let delivery = parseInt(this.mainForm.get('deliveryCharge')?.value);
    if (delivery > 0) {
      sale += delivery;
    }
    this.mainForm.patchValue({
      totalPrice: total,
      salePrice: sale > 0 ? sale : total,
    });
  }

  // this.mainForm = this.formBuilder.group({
  //   orderId: ['OD-015'],
  //   orderDate: [''],
  //   customerName: [''],
  //   channel: [''],
  //   phoneNo: [''],
  //   address: [''],
  //   icicleItems: new FormArray([]),
  //   tubItems: new FormArray([]),
  //   totalPrice: [''],
  //   discount: [''],
  //   salePrice: [''],
  //   deliveryCharge: [''],
  // });

  async onSubmit() {
    this._logService.logMessage('onSubmit');
    const msg = new Message();
    this._logService.logMessage('showSpinner');
    this._uiService.showSpinner();
    this._logService.logMessage(this.mainForm);
    this.order = new Order();
    if (this.mainForm) {
      let cust = new Customer();
      cust.name = this.mainForm.get('customerName')?.value ?? null;
      cust.gender = this.mainForm.get('gender')?.value ?? null;
      cust.address = this.mainForm.get('address')?.value ?? null;
      cust.areaId = this.mainForm.get('area')?.value ?? null;
      cust.phoneNo = this.mainForm.get('phoneNo')?.value ?? null;
      cust.customerTypeId = this.mainForm.get('customerTypeId')?.value ?? null;

      this.order.orderCode = this.mainForm.get('orderId')?.value ?? null;
      this.order.createdOn = this.mainForm.get('orderDate')?.value ?? null;
      this.order.customer = cust;
      this.order.channelId = this.mainForm.get('channel')?.value ?? null;
      this.order.totalPrice = this.mainForm.get('totalPrice')?.value ?? null;
      this.order.discount = this.mainForm.get('discount')?.value ?? null;
      this.order.deliveryCharge =
        this.mainForm.get('deliveryCharge')?.value ?? null;
      this.order.salePrice = this.mainForm.get('salePrice')?.value ?? null;
      this.order.orderItems = this.getAllItems();
    }
    try {
      let res: any = await this.orderService.addOrder(this.order);
      setTimeout(() => {
        this._uiService.hideSpinner();
      }, 4000);

      msg.msg = 'Order added Successfully';
      msg.msgType = MessageTypes.Information;
      msg.autoCloseAfter = 400;
      this._uiService.showToast(msg, 'info');
      this.mainForm.reset();
      this.items ? this.items.length > 0 ? this.items.clear() : null : null;
      this.generateOrderNo();
    } catch (error) {
      setTimeout(() => {
        this._uiService.hideSpinner();
      }, 4000);
      this._logService.logMessage('error: ');
      this._logService.logError(error);
    }
  }

  getAllItems() {
    let allOrderItems = [];
    var icicles = this.mainForm.get('icicleItems') as FormArray;
    if (icicles.length > 0) {
      for (let control of icicles.controls) {
        let oi = new OrderItems();
        oi.price = control.value.price ?? "0";
        oi.quantity = control.value.quantity ?? 0;
        oi.flavorId = 1;
        oi.isPromo = control.value.price == "0" ? true : false;
        allOrderItems.push(oi);
      }
    }

    var tubs = this.mainForm.get('tubItems') as FormArray;
    if (tubs.length > 0) {
      for (let control of tubs.controls) {
        let oi = new OrderItems();
        oi.price = control.value.price ?? 0;
        oi.quantity = control.value.quantity ?? 0;
        oi.flavorId = 1;
        oi.isPromo = control.value.price == 0 ? true : false;
        allOrderItems.push(oi);
      }
    }

    return allOrderItems;
  }

  async generateOrderNo() {
    var res: any = await this.orderService.getOrderListAll();

    if (res.data.length > 0) {
      var index = res.data.length;
      var currentOrderNo = res.data[index - 1].orderCode ?? 'OD-00000';
      var tempNum = currentOrderNo.split('-');

      var num = +tempNum[1];
      num++;

      currentOrderNo = num.toString().padStart(5, '0');

      this.mainForm.patchValue({
        orderId: tempNum[0] + '-' + currentOrderNo ?? 'OD-00000',
      });
    } else {
      this.mainForm.patchValue({
        orderId: 'OD-00000',
      });
    }

    return 1;
  }

  async loadAreaListAll() {
    try {
      let res: any = await this.orderService.getAreaListAll();
      let tempArray = res.data || [];
      let alist : Area[] = [];
      if (res.data && res.data.length > 0) {
        for (let i = 0; i < res.data.length; i++) {
          let area = this._mappingService.mapArea(tempArray[i]);
          alist.push(area);
        }
      this.areas = alist;
      }
    } catch (error) {
      this._logService.logMessage('error: ');
      this._logService.logError(error);
    }
  }

  async loadChannelListAll() {
    try {
      let res: any = await this.orderService.getChannelListAll();
      let tempArray = res.data || [];
      let clist : Channel[] = [];
      if (res.data && res.data.length > 0) {
        for (let i = 0; i < res.data.length; i++) {
          let channel = this._mappingService.mapChannel(tempArray[i]);
          clist.push(channel);
        }
      this.channels = clist;
      }
    } catch (error) {
      this._logService.logMessage('error: ');
      this._logService.logError(error);
    }
  }

  openDialog() : void {
    const msg = new Message();
    if(this.mainForm.controls['phoneNo']?.value.length == 10) {
      const dialogRef = this.dialog.open(PhoneSearchComponent, {
        width: '900px',
        height: '600px'
      });
      this._logService.logMessage(this.mainForm.controls['phoneNo']?.value);
    } else {
      msg.msg = 'Please enter complete phone number';
      msg.msgType = MessageTypes.Information;
      msg.autoCloseAfter = 400;
      this._uiService.showToast(msg, 'error');
    }
  }

  title = 'saydyz-frontend';
}
