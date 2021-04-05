import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckeDetailComponent } from './checkes/checke-detail/checke-detail.component';
import { CheckeListComponent } from './checkes/checke-list/checke-list.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
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
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
