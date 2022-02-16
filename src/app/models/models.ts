
export class CustomerType {
  id? : number;
  code? : string;
  name? : string;
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
  flavor? : Flavor;
  isPromo? : boolean = false;
}

export class Order {
  id? : number;
  orderCode? : number;
  createdOn? : string;
  customer? : Customer;
  channelId? : number;
  channel? : Channel;
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
  area? : Area;
  phoneNo? : string;
  customerTypeId? : number;
  customerType? : CustomerType;
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

export class ItemType {
  id? : number;
  code? : string;
  name? : string;
}

export class Flavor {
  id? : number;
  name? : string;
  code? : string;
  price? : number;
  itemType? : ItemType;
}
