// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { Component } from '@angular/core';


import { CdkTableModule } from '@angular/cdk/table';



// import {
//   MatIconModule, MatBadgeModule,
//   MatButtonModule, MatCheckboxModule, MatCardModule,
//   MatFormFieldModule, MatDialogModule, MatProgressSpinnerModule,
//   MatAutocompleteModule,
//   MatInputModule, MatDatepickerModule, MatTableModule, MatSortModule,
//   MatTabsModule, MatButtonToggleModule, MatChipsModule, MatRadioModule, MatOptionModule,
//   MatSelectModule, MatTooltipModule, MatSidenavModule, MatToolbarModule, MatListModule,
//   MatExpansionModule, MatProgressBarModule, MatPaginatorModule, MatNativeDateModule, MatMenuModule,
//   MatSnackBarModule
// } from "@angular/material";

import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CdkTableModule,
    // BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatFormFieldModule, MatButtonToggleModule,
    MatChipsModule, MatTabsModule, MatRadioModule,
    MatDialogModule, MatInputModule,
    MatTooltipModule, MatSidenavModule,
    MatToolbarModule, MatListModule,
    MatExpansionModule, MatProgressBarModule,
    MatMenuModule, MatTableModule, MatPaginatorModule,
    MatDatepickerModule, MatNativeDateModule,
    MatSnackBarModule
  ],

  exports: [
    CdkTableModule,
    // BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule, MatSortModule,
    MatButtonModule, MatTabsModule,
    MatButtonToggleModule, MatChipsModule,
    MatCheckboxModule, MatRadioModule,
    MatFormFieldModule, MatDialogModule,
    MatInputModule, MatSidenavModule,
    MatToolbarModule, MatListModule,
    MatExpansionModule, MatProgressBarModule,
    MatMenuModule, MatTableModule, MatPaginatorModule, MatStepperModule,
    MatDatepickerModule, MatGridListModule, MatNativeDateModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
