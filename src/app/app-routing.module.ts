import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { WalkComponent } from './pages/walk/walk.component';
import { SearchComponent } from './pages/search/search.component';
import { ErrorComponent } from './pages/common/error/error.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'walk/:id', component: WalkComponent },
    { path: 'search/:lnglat', component: SearchComponent },
    { path: '500', component: ErrorComponent },
    { path: '404', component: ErrorComponent },
    { path: '**', component: DashboardComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [DashboardComponent, WalkComponent, SearchComponent, LoginComponent, ErrorComponent];
