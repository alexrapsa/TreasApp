import { Component, OnInit } from '@angular/core';
import { Checke } from 'src/app/_models/checke';
import { CheckeService } from 'src/app/_services/checke.service';

@Component({
  selector: 'app-checke-list',
  templateUrl: './checke-list.component.html',
  styleUrls: ['./checke-list.component.css']
})
export class CheckeListComponent implements OnInit {
  checkes: Checke[];
  createMode: boolean = false;
  constructor(private checkeService: CheckeService) { }

  ngOnInit(): void {
    this.loadCheckes();
    
  }

  loadCheckes() {
    this.checkeService.getCheckes().subscribe(checkes => {
      this.checkes = checkes;
      console.log(this.checkes)
    });
  }

  createToggle() {
    this.createMode = true;
  }

  cancelCreateMode(event: boolean) {
    this.createMode = event;

    this.loadCheckes();
  }
}
