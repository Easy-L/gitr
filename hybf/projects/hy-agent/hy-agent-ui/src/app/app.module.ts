import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {Router, RouterModule} from '@angular/router';
import {NgProgress, NgProgressModule} from 'ngx-progressbar';
import {LayoutService} from './component/layout.service';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {AuthenticationService} from './service/authentication.service';
import {CustomHttp} from './common/custom.http';
import {HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import {AuthGuard} from './common/auth.guard';
import {ConfirmationService} from "primeng/api";

export function CustomHttpFactory(router: Router, backend: XHRBackend, defaultOptions: RequestOptions, ngProgress: NgProgress) {
  return new CustomHttp(router, backend, defaultOptions, ngProgress);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgProgressModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      preventDuplicates: true
    }),
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [{
    provide: CustomHttp,
    useFactory: CustomHttpFactory,
    deps: [Router, XHRBackend, RequestOptions, NgProgress]
  },
    AuthGuard,
    LayoutService,
    AuthenticationService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
