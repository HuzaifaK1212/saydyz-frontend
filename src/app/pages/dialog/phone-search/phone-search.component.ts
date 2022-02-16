import { state, style, trigger } from '@angular/animations';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Message, MessageTypes } from 'src/app/models/message.model';
import { Order } from 'src/app/models/models';
import { LogService } from 'src/app/services/base/log.service';
import { MappingService } from 'src/app/services/mapping/mapping.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UIService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-phone-search',
  templateUrl: './phone-search.component.html',
  styleUrls: ['./phone-search.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        // style({ height: "0px", minHeight: "0", visibility: "hidden" })
        style({ height: "0px", minHeight: "0" }),
        // class("dni")
        // style({ height: '0px', minHeight: '0' })
      ),
      state("expanded", style({ height: "*", visibility: "visible" })),
      // state('expanded', style({ height: '*' })),
      // transition(
      //   'expanded <=> collapsed',
      //   animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      // ),
    ]),
  ]
})
export class PhoneSearchComponent implements OnInit {

  orderList: Order[] = [];
  @ViewChild(MatPaginator, {}) paginator!: MatPaginator;
  displayedColumns = [
    'orderNo',
    'customerName',
    'customerGender',
    'customerType',
    'phoneNo',
    'address',
    'actions',
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

  expandedElement: any;
  isExpansionDetailRow = (i: number, row: Object) => true;
  phoneno = "";

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PhoneSearchComponent>,
    private _logService : LogService,
    private _orderService : OrderService,
    private _mappingService : MappingService,
    private _uiService : UIService,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) {
    this.phoneno = data.phoneno;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.loadCustomOrderList();
    this._logService.logMessage("Inside OnIT Dialog")
  }

  async loadCustomOrderList() {
    const msg = new Message();

    this.paginations = [];
    this.pagination = 0;
    this.length = 0;
    this.isSpinner = true;
    this.dataSource = new MatTableDataSource<Order>(this.orderList);

    try {
      let res: any = await this._orderService.getOrdersViaCustomerPhoneNo(this.phoneno);

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
      this._logService.logMessage(this.orderList);
      // this._logService.logMessage("orderList: ");
      // this._logService.logResponse(this.orderList);

      this.dataSource = new MatTableDataSource<Order>(this.orderList);
      this.dataSource.paginator = this.paginator;

      if (this.orderList.length == 0) {
        msg.msg = 'No Order Found for entered phone no';
        msg.msgType = MessageTypes.Information;
        msg.autoCloseAfter = 400;
        this._logService.logMessage(msg);
        this._uiService.showToast(msg, 'info');
      }
    } catch (error) {
      this.isSpinner = false;
      this._logService.logMessage("error: ");
      this._logService.logError(error);
    }
  }

  expandedRow(row: Order) {
    // if (this.expandedElement == row.documentId) {
    if (this.expandedElement == row) {
      this.expandedElement = null;
    } else {
      // this.expandedElement = row.documentId;
      this.expandedElement = row;
    }
  }
}
