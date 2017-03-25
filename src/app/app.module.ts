import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { TopComponent } from './pages/common/top/top.component';
import { SearchBarComponent } from './pages/common/search-bar/search-bar.component';
import { ErrorComponent } from './pages/common/error/error.component';

import { WalkComponent } from './pages/walk/walk.component';
import { PresentationWalkComponent } from './pages/common/presentation/presentation-walk.component';
import { StatisticWalkComponent } from './pages/walk/statistic/statistic-walk.component';
import { ReviewWalkComponent } from './pages/walk/review/review-walk.component';
import { FeatureWalkComponent } from './pages/walk/feature/feature-walk.component';

import { SearchComponent } from './pages/search/search.component';
import { SearchFilterComponent } from './pages/search/search-filter/search-filter.component';
import { AroundComponent } from './pages/search/around/around.component';

import { WalkService } from './services/walk.service';
import { MapService } from './services/map.service';

import { LoginComponent } from './pages/login/login.component';
import { GoogleLoginComponent } from './pages/login/googleLogin/googleLogin.component';
import { FacebookLoginComponent } from './pages/login/facebookLogin/facebookLogin.component';

import 'rxjs/Rx';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        JsonpModule
    ],
    declarations: [
        AppComponent,
        TopComponent,
        SearchBarComponent,
        PresentationWalkComponent,
        StatisticWalkComponent,
        ReviewWalkComponent,
        FeatureWalkComponent,
        DashboardComponent,
        WalkComponent,
        AroundComponent,
        SearchFilterComponent,
        SearchComponent,
        LoginComponent,
        GoogleLoginComponent,
        FacebookLoginComponent,
        ErrorComponent
    ],
    providers: [
        WalkService,
        MapService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
