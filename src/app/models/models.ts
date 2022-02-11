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
  channel? : string;
  totalPrice? : string;
  discount? : string;
  deliveryCharge? : string;
  salePrice? : string;
  orderItems? : OrderItems[];
}

export class Customer {
  name? : string
  gender? : string
  address? : string
  area? : string
  phoneNo? : string
  customerTypeId? : number
}
