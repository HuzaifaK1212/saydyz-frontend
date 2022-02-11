// import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { EnvService } from '../env/env.service';
@Injectable()
export class LogService {

    constructor(
        public environment: EnvService
    ) {

    }

    logMessage(msg: any) {
        // if (environment.showLog)
        if (this.environment.showLog)
            console.log(msg);
    }

    logError(err: any) {
        // if (environment.showLog)
        if (this.environment.showLog)
            console.error(err);
    }

    logWarn(warn: any) {
        // if (environment.showLog)
        if (this.environment.showLog)
            console.warn(warn);
    }

    logRequest(req: any) {
        // if (environment.showLog) {
        if (this.environment.showLog) {
            console.log("Request Intercepted");

            console.log(req);
        }
    }

    logResponse(res: any) {
        // if (environment.showLog) {
        if (this.environment.showLog) {
            console.log("Response Intercepted");
            console.log(res);
        }
    }

    logResponseError(resErr: any) {
        // if (environment.showLog) {
        if (this.environment.showLog) {
            console.log("Response Intercepted with Error");
            console.log(resErr);
        }
    }


}
