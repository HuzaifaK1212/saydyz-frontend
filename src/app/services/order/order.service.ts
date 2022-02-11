import { Injectable } from '@angular/core';
import { observable, Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../env/env.service';
import { Order } from 'src/app/models/models';
import { MappingService } from '../mapping/mapping.service';
import { LogService } from '../base/log.service';

@Injectable()
export class OrderService {
  constructor(
    private _http: HttpClient,
    _handler: HttpBackend,
    public environment: EnvService,
    private mapService : MappingService,
    private logService : LogService
  ) {}

  _completeUrl(url : any) {
    return this.environment.apiBaseUrl + url;
  }

  async addOrder(orderData: Order) {

    let url = this._completeUrl("order/add");
    this.logService.logMessage(url);
    let orderItemsList: any[] = [];

    if (orderData.orderItems && orderData.orderItems.length > 0) {
      orderData.orderItems?.forEach((element) => {
        // Add mapping here
        let orderItem = {
          Quantity: element.quantity,
          Price: element.price,
          FlavorId: element.flavorId,
          isPromo: element.isPromo
        };
        orderItemsList.push(orderItem);
      });
    }

    let cust = {
      Name: orderData.customer?.name,
      Gender: orderData.customer?.gender,
      Address: orderData.customer?.address,
      Area: "",
      PhoneNo: orderData.customer?.phoneNo,
      CustomerTypeId : orderData.customer?.customerTypeId
    };

    let body = {
      OrderCode: orderData.orderCode,
      CreatedOn: orderData.createdOn,
      Customer: cust,
      Channel: orderData.channel,
      TotalPrice: orderData.totalPrice?.toString(),
      Discount: orderData.discount?.toString(),
      DeliveryCharge: orderData.deliveryCharge,
      SalePrice: orderData.salePrice?.toString(),
      OrderItems: orderItemsList,
    };

    return await this._http.post(url, body).toPromise();
  }

  async getOrderListAll() {
    let url = this._completeUrl("order/all");
    return await this._http.get(url).toPromise();
  }
}
