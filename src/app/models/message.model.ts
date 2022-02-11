export enum MessageTypes {
  Information,
  Confirmation,
  Warning,
  Error
}

export class Message {

  msgType: MessageTypes = MessageTypes.Information;
  iconType = 'info';
  icon = '';
  msg = '';
  title = 'Saydyz Order';
  autoCloseAfter = 500;
  okBtnTitle = 'Ok';
  cancelBtnTitle = 'Cancel';
  showInput = 'none';
  // selectedDatesWorkingDay:Schedule;
  // onOkBtnClick : (res,id) => any;
  onOkBtnClick?: () => any;
  // onCancelBtnClick : () => any;
  onCancelBtnClick?: () => any;
}
