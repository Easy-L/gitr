import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {};

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  onLogin() {
    this.authenticationService.login(this.user.username, this.user.password);
  }

}
