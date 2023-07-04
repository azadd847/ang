import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table'; // MatTableModule'ü ekleyin
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; // modülü burada ekleyin
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  exports: [CustomerComponent]
})
export class CustomerModule { }
