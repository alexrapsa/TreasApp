import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CheckeService } from 'src/app/_services/checke.service';


@Component({
  selector: 'app-checke-detail',
  templateUrl: './checke-detail.component.html',
  styleUrls: ['./checke-detail.component.css']
})
export class CheckeDetailComponent implements OnInit {
  @Output() cancelChecke = new EventEmitter();
  model: any = {};
  checkeForm: FormGroup;
  maxDate: Date;

  constructor(private checkeService: CheckeService, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18)
  }

  initializeForm() {
    this.checkeForm = this.fb.group({
      checkNumber: ['', [Validators.required, Validators.minLength(4)]],
      payTo: ['', [Validators.required, Validators.minLength(4)]],
      amount: ['', [Validators.required, Validators.minLength(4)]],
      dateIssued: ['', Validators.required]
    })
  }

  create() {
    this.checkeService.addChecke(this.checkeForm.value).subscribe(response => {
      console.log(response);
      this.toastr.success('Successfully created.', 'Success');
      this.cancelChecke.emit(false)
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  cancel() {
    this.cancelChecke.emit(false)
  }
  
}
