import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CheckeService } from 'src/app/_services/checke.service';
import { Checke } from 'src/app/_models/checke';
import { NgxNumToWordsService, SUPPORTED_LANGUAGE } from 'ngx-num-to-words';

@Component({
  selector: 'app-checke-print',
  templateUrl: './checke-print.component.html',
  styleUrls: ['./checke-print.component.css']
})
export class CheckePrintComponent implements OnInit {
  checkNumber: string;
  toPrint: Checke;
  myNumber: number;

  numberInWords!: string;
  lang: SUPPORTED_LANGUAGE = 'en';

  constructor(private route: ActivatedRoute, private router: Router, private checkeService: CheckeService, public ngxNumToWordsService: NgxNumToWordsService) {
    this.route.paramMap.subscribe(params => {
      this.checkNumber = params.get('checknumber');
    });
  }

  ngOnInit(): void {
    this.checkeService.getChecke(this.checkNumber).subscribe(response => {
      this.toPrint = response
      this.myNumber = + this.toPrint.amount
      this.toPrint.amountInWords = this.ngxNumToWordsService.inWords(this.myNumber, this.lang).toUpperCase() + ' ONLY'
    });

    // let myNumber : number = + this.toPrint.amount

    // console.log(this.toPrint);
  }

  cancel() {
    this.router.navigateByUrl('checkes');
  }
}
