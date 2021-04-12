import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Checke } from 'src/app/_models/checke';
import { CheckeParams } from 'src/app/_models/checkeParams';
import { Pagination } from 'src/app/_models/pagination';
import { CheckeService } from 'src/app/_services/checke.service';


@Component({
  selector: 'app-checke-list',
  templateUrl: './checke-list.component.html',
  styleUrls: ['./checke-list.component.css']
})
export class CheckeListComponent implements OnInit {
  receiver: string;
  checkes$: Observable<Checke[]>;
  createMode: boolean = false;
  modalRef: BsModalRef;
  selectedCheckNumber: string;
  selectedCheck: Checke;
  receiveForm: FormGroup;

  checkes: Checke[];
  pagination: Pagination;
  checkParams: CheckeParams;


  constructor(
    private checkeService: CheckeService, 
    private modalService: BsModalService, 
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder) {
      this.checkParams = new CheckeParams(false);
     }

  ngOnInit(): void {
    // this.checkes$ = this.checkeService.getCheckes();
    this.loadCheckes();
  }

  loadCheckes() {
    this.checkeService.getCheckes(this.checkParams).subscribe(response => {
      this.checkes = response.result;
      this.pagination = response.pagination;
    })
  }

  initializeForm() {
    this.receiveForm = this.fb.group({
      receiver: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  createToggle() {
    this.createMode = true;
  }

  cancelCreateMode(event: boolean) {
    this.loadCheckes();
    this.createMode = event;
  }

  openModal(template: TemplateRef<any>, checkNumber) {
    this.selectedCheckNumber = checkNumber;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  openReceiverModal(template: TemplateRef<any>, check) {
    this.selectedCheck = check;
    this.initializeForm();
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  confirm(): void {
    this.checkeService.deleteChecke(this.selectedCheckNumber).subscribe(response => {
      this.loadCheckes();
      this.modalRef.hide();
    }, error => {
      console.log(error)
    })

  }

  decline(): void {
    this.selectedCheck = null;
    this.selectedCheckNumber = '';
    this.modalRef.hide();
  }

  confirmReceiver(): void {
    this.selectedCheck.isReceived = true;
    this.selectedCheck.receivedBy = this.receiveForm.controls.receiver.value;
    console.log(this.selectedCheck);
    this.checkeService.updateChecke(this.selectedCheck).subscribe(() => {
      this.selectedCheck = null;
      this.toastr.success('Successfully received check');
      this.modalRef.hide();
    })
  }

  printCheck(checknumber) {
    this.router.navigateByUrl('/checke/print/' + checknumber)
  }

  pageChange(event: any) {
    this.checkParams.pageNumber = event.page;
    this.loadCheckes();
  }

  // getNowUTC() {
  //   const now = new Date();
  //   return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  // }
}
