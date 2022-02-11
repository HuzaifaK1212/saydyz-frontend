import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/models/models';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LogService } from 'src/app/services/base/log.service';
import { Message, MessageTypes } from 'src/app/models/message.model';
import { MappingService } from 'src/app/services/mapping/mapping.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UIService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orderList: Order[] = [];
  @ViewChild(MatPaginator, {}) paginator!: MatPaginator;
  displayedColumns = [
    'orderNo',
    'customerName',
    'customerGender',
    'customerType',
    'phoneNo',
    'address',
  ];
  dataSource = new MatTableDataSource<Order>(this.orderList);

  isSpinner = false;
  pageSizeOptions = [10, 25, 50, 100];
  paCount = 0;
  pageIndex = 0;
  pageSize = 10; // by default
  pageEvent!: PageEvent;
  length: number = 0;
  pagination = 0;
  paginations = [];

  constructor(
    private _logService: LogService,
    private _mappingService: MappingService,
    private _orderService: OrderService,
    private _uiService: UIService
  ) {}

  ngOnInit(): void {
    this.loadOrderAllList();
  }

  async loadOrderAllList() {
    const msg = new Message();

    this.paginations = [];
    this.pagination = 0;
    this.length = 0;
    this.isSpinner = true;
    this.dataSource = new MatTableDataSource<Order>(this.orderList);

    try {
      let res: any = await this._orderService.getOrderListAll();

      this.isSpinner = false;
      // this._logService.logMessage("success res: ");
      // this._logService.logResponse(res);
      let array = res.data || [];

      this.length = res && res.data ? res.data.length || 0 : 0;
      var oList: Order[] = [];
      for (let i = 0; i < array.length; i++) {
        let o = this._mappingService.mapOrder(array[i]);
        // let o = array[i];
        oList.push(o);
      }
      this.orderList = oList;

      // this._logService.logMessage("orderList: ");
      // this._logService.logResponse(this.orderList);

      this.dataSource = new MatTableDataSource<Order>(this.orderList);
      this.dataSource.paginator = this.paginator;

      if (this.orderList.length == 0) {
        msg.msg = 'No Order Found';
        msg.msgType = MessageTypes.Information;
        msg.autoCloseAfter = 400;
        this._uiService.showToast(msg, 'info');
      }
    } catch (error) {
      this.isSpinner = false;
      // this._logService.logMessage("error: ");
      // this._logService.logError(error);
    }
  }
}