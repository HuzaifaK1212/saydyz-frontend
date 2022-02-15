import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ToastComponent } from "./toast/toast.component";

@NgModule({
  imports: [
    CommonModule
  ],

  declarations: [
    ToastComponent
  ],
  exports: [
    ToastComponent
  ],
  entryComponents: []
})
export class SharedModule {
}
