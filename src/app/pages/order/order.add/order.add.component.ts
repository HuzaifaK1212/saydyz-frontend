import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Message, MessageTypes } from 'src/app/models/message.model';
import {
  Area,
  Channel,
  Customer,
  CustomerType,
  Flavor,
  Order,
  OrderItems,
} from 'src/app/models/models';
import { LogService } from 'src/app/services/base/log.service';
import { EnvService } from 'src/app/services/env/env.service';
import { MappingService } from 'src/app/services/mapping/mapping.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UIService } from 'src/app/services/ui/ui.service';
import { PhoneSearchComponent } from '../../dialog/phone-search/phone-search.component';

@Component({
  selector: 'app-order-add',
  templateUrl: './order.add.component.html',
  styleUrls: ['./order.add.component.scss'],
})
export class OrderAddComponent implements OnInit {
  mainForm!: FormGroup;
  items!: FormArray;
  order!: Order;
  areas!: Area[];
  icicles!: Flavor[];
  tubs!: Flavor[];
  customerTypes!: CustomerType[];
  channels!: Channel[];
  numPattern = '^[0-9]+$';

  genders: string[] = ['Male', 'Female'];

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
    this.loadItemFlavorListAll();
    this.loadCustomerTypeListAll();
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
        flavorId: [''],
      })
    );
  }

  addTub() {
    this.items = this.mainForm.get('tubItems') as FormArray;
    this.items.push(
      this.formBuilder.group({
        quantity: 0,
        price: 0,
        flavorId: [''],
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

  calculatePrice(flavorId: any, index: number, itemType: number) {
    let selectedFlavor;
    let tempItems: any;
    if (itemType == 1) {
      tempItems = this.mainForm.get('icicleItems') as FormArray;
      selectedFlavor = this.icicles?.find((x) => x.id == flavorId);
    } else if (itemType == 2) {
      tempItems = this.mainForm.get('tubItems') as FormArray;
      selectedFlavor = this.tubs?.find((x) => x.id == flavorId);
    }

    var tempItem = tempItems.at(index);
    var quantity = tempItem.get('quantity')?.value;
    tempItem.setValue({
      price: quantity * (selectedFlavor?.price ?? 0),
      quantity: quantity,
      flavorId: flavorId,
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
      this.items ? (this.items.length > 0 ? this.items.reset() : null) : null;
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
        oi.price = control.value.price ?? '0';
        oi.quantity = control.value.quantity ?? 0;
        oi.flavorId = control.value.flavorId;
        oi.isPromo = control.value.price ? false : true;
        this._logService.logMessage('control.value.flavorId');
        this._logService.logMessage(control.value.flavorId);
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
      let alist: Area[] = [];
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
      let clist: Channel[] = [];
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

  openDialog(): void {
    this._logService.logMessage('openDialog');

    const msg = new Message();
    if (this.mainForm.controls['phoneNo']?.value.length == 10) {
      this._logService.logMessage('Inside IF-----');
      let phone = this.mainForm.controls['phoneNo']?.value;
      this.dialog.open(PhoneSearchComponent, {
        width: '900px',
        height: '600px',
        data: { phoneno: phone },
      });
      this._logService.logMessage(this.mainForm.controls['phoneNo']?.value);
    } else {
      msg.msg = 'Please enter complete phone number';
      msg.msgType = MessageTypes.Information;
      msg.autoCloseAfter = 400;
      try {
        this._uiService.showToast(msg, 'error');
      } catch (error) {
        console.log(error);
      }
    }
  }

  async loadItemFlavorListAll() {
    try {
      let res: any = await this.orderService.getFlavorListAll();
      let tempArray = res.data || [];
      this._logService.logMessage(tempArray);
      let ilist = [],
        tlist = [];
      if (res.data && res.data.length > 0) {
        for (let i = 0; i < res.data.length; i++) {
          if (tempArray[i].itemType.id == 1) {
            let icicle = this._mappingService.mapFlavor(tempArray[i]);
            ilist.push(icicle);
          } else if (tempArray[i].itemType.id == 2) {
            let tub = this._mappingService.mapFlavor(tempArray[i]);
            tlist.push(tub);
          }
        }
        this.icicles = ilist;
        this.tubs = tlist;
      }
    } catch (error) {
      this._logService.logMessage('error: ');
      this._logService.logError(error);
    }
  }

  async loadCustomerTypeListAll() {
    try {
      let res: any = await this.orderService.getCustomerTypeListAll();
      let tempArray = res.data || [];
      let ctlist = [];
      if (res.data && res.data.length > 0) {
        for (let i = 0; i < res.data.length; i++) {
          let customertype = this._mappingService.mapFlavor(tempArray[i]);
          ctlist.push(customertype);
        }
        this.customerTypes = ctlist;
      }
    } catch (error) {
      this._logService.logMessage('error: ');
      this._logService.logError(error);
    }
  }
}
