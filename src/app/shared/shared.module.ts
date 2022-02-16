import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SpinComponent } from "./dialog/spin/spin.component";
import { MaterialModule } from "./material/material.module";
import { PageLoaderComponent } from "./pageLoader/pageLoader.component";
import { ToastComponent } from "./toast/toast.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],

  declarations: [
    ToastComponent,
    PageLoaderComponent,
    SpinComponent
  ],
  exports: [
    ToastComponent,
    PageLoaderComponent,
    MaterialModule,
    SpinComponent
  ],
  entryComponents: []
})
export class SharedModule {
}
