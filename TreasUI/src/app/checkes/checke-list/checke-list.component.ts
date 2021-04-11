import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Checke } from 'src/app/_models/checke';
import { CheckeService } from 'src/app/_services/checke.service';


@Component({
  selector: 'app-checke-list',
  templateUrl: './checke-list.component.html',
  styleUrls: ['./checke-list.component.css']
})
export class CheckeListComponent implements OnInit {
  checkes$: Observable<Checke[]>;
  createMode: boolean = false;
  modalRef: BsModalRef;
  selectedCheckNumber: string;
  selectedCheck: Checke;


  constructor(
    private checkeService: CheckeService, 
    private modalService: BsModalService, 
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.checkes$ = this.checkeService.getCheckes();
  }

  createToggle() {
    this.createMode = true;
  }

  cancelCreateMode(event: boolean) {
    this.createMode = event;
  }

  openModal(template: TemplateRef<any>, checkNumber) {
    this.selectedCheckNumber = checkNumber;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  openReceiverModal(template: TemplateRef<any>, check) {
    this.selectedCheck = check;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  confirm(): void {
    this.checkeService.deleteChecke(this.selectedCheckNumber).subscribe(response => {
      this.checkes$ = this.checkeService.getCheckes();
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

    this.checkeService.updateChecke(this.selectedCheck).subscribe(() => {
      this.selectedCheck = null;
      this.toastr.success('Successfully received check');
      this.modalRef.hide();
    })


  }

  printCheck(checknumber) {
    this.router.navigateByUrl('/checke/print/' + checknumber)
  }

  recieved() { }
}
