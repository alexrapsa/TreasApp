import { Component, OnInit } from '@angular/core';
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
  constructor(private checkeService: CheckeService) { }

  ngOnInit(): void {
    this.checkes$ = this.checkeService.getCheckes();
  }

  createToggle() {
    this.createMode = true;
  }

  cancelCreateMode(event: boolean) {
    this.createMode = event;
  }
}
