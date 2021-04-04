import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckeDetailComponent } from './checkes/checke-detail/checke-detail.component';
import { CheckeListComponent } from './checkes/checke-list/checke-list.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'checkes', component: CheckeListComponent, canActivate: [AuthGuard] },
      { path: 'checkes/:id', component: CheckeDetailComponent },
      { path: 'report', component: ReportComponent }
    ]
  },
  { path: '**', component: HomeComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
