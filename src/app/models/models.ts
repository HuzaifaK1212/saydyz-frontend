export class Type {
  value? : number;
  displayValue? : string;
}

export class Icicle {
  id? : number;
  flavorName?: string;
  price? : number;
}

export class Tub {
  id? : number;
  flavorName?: string;
  price? : number;
}

export class OrderItems {
  id? : number;
  quantity?: string;
  price? : string;
  flavorId?: number;
  isPromo? : boolean = false;
}

export class Order {
  id? : number;
  orderCode? : number;
  createdOn? : string;
  customer? : Customer;
  channelId? : number;
  totalPrice? : string;
  discount? : string;
  deliveryCharge? : string;
  salePrice? : string;
  orderItems? : OrderItems[];
}

export class Customer {
  name? : string;
  gender? : string;
  address? : string;
  areaId? : number;
  phoneNo? : string;
  customerTypeId? : number;
}

export class Area {
  id? : number;
  code? : string;
  name? : string;
}

export class Channel {
  id? : number;
  code? : string;
  name? : string;
}
