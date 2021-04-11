import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CheckeService } from 'src/app/_services/checke.service';
import { NgxNumToWordsService, SUPPORTED_LANGUAGE } from 'ngx-num-to-words';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-checke-detail',
  templateUrl: './checke-detail.component.html',
  styleUrls: ['./checke-detail.component.css']
})
export class CheckeDetailComponent implements OnInit {
  @Output() cancelChecke = new EventEmitter();
  checkeForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  numberInWords!: string;
  lang: SUPPORTED_LANGUAGE = 'en';

  constructor(
    private checkeService: CheckeService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public ngxNumToWordsService: NgxNumToWordsService,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
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
    }, error => {
      this.validationErrors = error;
    },() => {
      this.cancelChecke.emit(false);
    })
  }

  cancel() {
    this.cancelChecke.emit(false);
  }

  wordsToNumber() {
    let myNumber: number = + this.checkeForm.controls.amount.value
    if (myNumber > 0) {
      return this.ngxNumToWordsService.inWords(myNumber, this.lang).toUpperCase() + ' PESOS ONLY'
    }
  }
}
