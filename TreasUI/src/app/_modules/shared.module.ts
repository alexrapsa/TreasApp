import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    BsDatepickerModule,
    ModalModule,
    PaginationModule
  ]
})
export class SharedModule { }
