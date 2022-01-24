import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Icicle, Order, Tub, Type } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  mainForm!: FormGroup;
  items!: FormArray;
  orders!: Order[];
  promoItems! : Order[];
  numPattern = '^[0-9]+$';

  constructor(private formBuilder: FormBuilder) {}

  types: Type[] = [
    { value: 1, displayValue: 'Individual' },
    { value: 2, displayValue: 'Retailer' },
  ];

  genders: string[] = ['Male', 'Female'];

  icicles: Icicle[] = [
    { Id: 1, flavorName: 'Falsa Black Salt', price: 250 },
    { Id: 2, flavorName: 'Anar Black Salt', price: 250 },
    { Id: 3, flavorName: 'Chikoo', price: 250 },
    { Id: 4, flavorName: 'Cookies N Cream', price: 250 },
    { Id: 5, flavorName: 'Dark Chocolate', price: 250 },
    { Id: 6, flavorName: 'Vanilla Nutella', price: 300 },
    { Id: 7, flavorName: 'Chocolate Nutella', price: 300 },
    { Id: 8, flavorName: 'Salted Caramel Nutella', price: 300 },
    { Id: 9, flavorName: 'Choco with Roasted Almonds', price: 300 },
    { Id: 10, flavorName: 'Dark Choco with Roasted Almonds', price: 300 },
    { Id: 11, flavorName: 'Shareefa', price: 300 },
    { Id: 12, flavorName: 'Salted Caramel with Roasted Almonds', price: 300 },
    { Id: 13, flavorName: 'Salted Caramel with Walnuts', price: 300 },
    { Id: 14, flavorName: 'Lychee', price: 300 },
    { Id: 15, flavorName: 'Chai Yen (Thai Iced Tea)', price: 300 },
    { Id: 16, flavorName: 'Icecream Soda', price: 250 },
    { Id: 17, flavorName: 'Badam Kulfi', price: 250 },
    { Id: 18, flavorName: 'Pista Kulfi', price: 250 },
  ];

  tubs: Tub[] = [
    { Id: 1, flavorName: 'Falsa Black Salt', price: 1000 },
    { Id: 2, flavorName: 'Anar Black Salt', price: 1000 },
    { Id: 3, flavorName: 'Chikoo', price: 1000 },
    { Id: 4, flavorName: 'Cookies N Cream', price: 1000 },
    { Id: 5, flavorName: 'Dark Chocolate', price: 1000 },
    { Id: 6, flavorName: 'Vanilla Nutella', price: 1000 },
    { Id: 7, flavorName: 'Chocolate Nutella', price: 1000 },
    { Id: 8, flavorName: 'Salted Caramel Nutella', price: 1000 },
    { Id: 9, flavorName: 'Choco with Roasted Almonds', price: 1200 },
    { Id: 10, flavorName: 'Dark Choco with Roasted Almonds', price: 1200 },
    { Id: 11, flavorName: 'Shareefa', price: 1200 },
  ];

  ngOnInit(): void {
    this.mainForm = this.formBuilder.group({
      orderId: ['OD-015'],
      orderDate: [''],
      customerName: [''],
      channel: [''],
      phoneNo: [''],
      address: [''],
      icicleItems: new FormArray([]),
      tubItems: new FormArray([]),
      totalPrice: [''],
      discount: [''],
      salePrice: [''],
      deliveryCharge: [''],
    });
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
            price: [{value: 0, disabled: true}],
            flavorId: 0,
          })
        );
      }
      else {
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
      selectedFlavor = this.icicles?.find((x) => x.Id == flavor);
    } else if (itemType == 2) {
      tempItems = this.mainForm.get('tubItems') as FormArray;
      selectedFlavor = this.tubs?.find((x) => x.Id == flavor);
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
        total += control.value.price ?? 0;
      }
    }
    var tubs = this.mainForm.get('tubItems') as FormArray;
    if (tubs.length > 0) {
      for (let control of tubs.controls) {
        total += control.value.price ?? 0;
      }
    }
    let disc = this.mainForm.get('discount')?.value;
    if (disc > 0) {
      let discountDeduction = (total / 100) * disc;
      sale = total - discountDeduction;
    }
    this.mainForm.patchValue({
      totalPrice: total,
      salePrice: sale,
    });
  }
  title = 'saydyz-frontend';
}
