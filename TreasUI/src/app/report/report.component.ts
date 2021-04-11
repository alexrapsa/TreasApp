import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Checke } from '../_models/checke';
import { CheckeService } from '../_services/checke.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  checkes$: Observable<Checke[]>;

  constructor(
    private checkeService: CheckeService,
    private modalService: BsModalService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.checkes$ = this.checkeService.getCheckes();
  }


}
