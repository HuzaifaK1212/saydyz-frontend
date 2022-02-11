import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Message } from '../../models/message.model';
import { LogService } from '../base/log.service';
// import { HttpService } from "../base/http.service";

@Injectable()
export class UIService {

    /**
     * To keep track of the spinner status
     */
    spinnerStatus = new Subject<boolean>();

    /**
     * To keep track of the modal box
     */
    messageBoxStatus = new Subject<Message>();

    /**
     * To emit show snackBar events
     */
    snackBarStatus = new Subject<Message>();

    /**
     * To emit show toast events
     */
    toastStatus = new Subject<Message>();
    infoToastStatus = new Subject<Message>();
    notificationToastStatus = new Subject<Message>();

    /**
     * Constructor
     */
    constructor(
        // private _http : HttpService
        private _logService : LogService
    ) { }


    /**
     * Show Toast
     * Background color depends on MessageType
     * Set autoCloseAfter parameter for auto close
     * @param msg
     */
    showSnackBar(msg: Message, type?: string) {

        // msg.iconType = 'info';
        this.snackBarStatus.next(msg);

        // // this._logService.logMessage("showToast")
        // // this._logService.logMessage("msg")
        // // this._logService.logMessage(msg)
        // // this._logService.logMessage("type")
        // // this._logService.logMessage(type)
        // //  this.toastStatus.next(msg);
        // if (type === 'info') {
        //     msg.iconType = 'info';
        //     this.snackBarStatus.next(msg);
        // } else if (type === 'notification') {
        //     msg.iconType = 'info';
        //     this.notificationToastStatus.next(msg);
        // } else {

        //     // this._logService.logMessage("else ")
        //     msg.iconType = 'error';
        //     this.toastStatus.next(msg);
        // }
    }

    /**
     * Show Toast
     * Background color depends on MessageType
     * Set autoCloseAfter parameter for auto close
     * @param msg
     */
    showToast(msg: Message, type: string) {

        this._logService.logMessage("showToast")
        this._logService.logMessage("msg")
        // this._logService.logMessage(msg)
        // this._logService.logMessage("type")
        // this._logService.logMessage(type)
        //  this.toastStatus.next(msg);
        if (type === 'info') {
          this._logService.logMessage("in info")
            msg.iconType = 'info';
            this.infoToastStatus.next(msg);
        } else if (type === 'notification') {
            msg.iconType = 'info';
            this.notificationToastStatus.next(msg);
        } else {

            // this._logService.logMessage("else ")
            msg.iconType = 'error';
            this.toastStatus.next(msg);
        }
    }

    /**
     * Show popup modal box
     * Icon depends on MessageType
     * @param msg
     */
    showMsgBox(msg: Message,) {
        this.messageBoxStatus.next(msg);
    }

    closeMsgBox(msg: Message,) {
        msg.msg = '_cls';
        this.messageBoxStatus.next(msg);
    }

    /**
     * Show Spinner
     */
    showSpinner() {

      console.log("in ui service showspinner")
        this.spinnerStatus.next(true);
    }

    /**
     * Hide Spinner
     */
    hideSpinner() {
        this.spinnerStatus.next(false);
    }

}
