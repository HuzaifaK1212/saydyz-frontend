export class Type {
  value? : number;
  displayValue? : string;
}

export class Icicle {
  Id? : number;
  flavorName?: string;
  price? : number;
}

export class Tub {
  Id? : number;
  flavorName?: string;
  price? : number;
}

export class Items {
  Id? : number;
  itemType?: number;
  itemName?: string;
  quantity?: string;
}

export class Order {
  orderId? : number;
  customerName? : string;
  customerTypeId? : number;
  customerType?: Type;
  items? : Items[];
}

