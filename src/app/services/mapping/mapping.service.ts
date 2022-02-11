 import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Order, OrderItems } from "src/app/models/models";
import { updateSpreadAssignment } from "typescript";
import { LogService } from "../base/log.service";
import { EnvService } from "../env/env.service";

@Injectable()
export class MappingService {

    constructor(
        private _logService: LogService,
        public environment: EnvService
    ) {}

    public mapOrder(res : any) : Order {
      const orderData = res ? res : null;
      const isOrderData = new Order();
      if (orderData) {
        isOrderData.id = orderData.id || null;
        isOrderData.createdOn = orderData.createdOn || null;
        isOrderData.orderCode = orderData.orderCode || null;
        isOrderData.customer = orderData.customer || null;
        isOrderData.channel = orderData.channel || null;
        isOrderData.totalPrice = orderData.totalPrice || null;
        isOrderData.discount = orderData.discount || null;
        isOrderData.deliveryCharge = orderData.deliveryCharge || null;
        isOrderData.salePrice = orderData.salePrice || null;
        isOrderData.orderItems = orderData.orderItems || null;
      }
      return isOrderData;
    }

    public mapOrderItems(res : any) : OrderItems {
      const orderItemData = res ? res : null;
      const isOrderItemData = new OrderItems();
      if (orderItemData) {
        isOrderItemData.id = orderItemData.id || null;
        isOrderItemData.quantity = orderItemData.quantity || null;
        isOrderItemData.price = orderItemData.price || null;
        isOrderItemData.flavorId = orderItemData.flavorId || null;
        isOrderItemData.isPromo = orderItemData.isPromo || null;
      }
      return isOrderItemData
    }
}
