import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from './layout.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [
    trigger('menuState', [
      state('inactive', style({
        left: '0px'
      })),
      state('active', style({
        left: '-130px'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ]),
    trigger('routerState', [
      state('inactive', style({
        marginLeft: '180px'
      })),
      state('active', style({
        marginLeft: '50px'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ]),
    trigger('imgState', [
      state('inactive', style({
        left: '16px'
      })),
      state('active', style({
        left: '143px'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ]
})
export class LayoutComponent implements OnInit {

  constructor(private service: LayoutService, private router: Router, private authenticationService: AuthenticationService) {
  };

  ngOnInit() {
    this.getMenu();
  }

  menus: any[];
  state: string = 'inactive';
  pTooltipIf: boolean = false;
  menumsg: string;

  getMenu() {
    if (sessionStorage.getItem('menus')) {
      this.menus = JSON.parse(sessionStorage.getItem('menus'));
    } else {
      this.service.getMenu()
        .then(
          menus => this.menus = menus,
          error => {
            this.menumsg = '获取菜单失败,请刷新再试';
          }
        )
        .then(() => {
          if (this.menus) {
            // sessionStorage.setItem('menus', JSON.stringify(this.menus));
          }
        });
    }

  }

  changeMenuWidth() {
    this.state = (this.state === 'active' ? 'inactive' : 'active');
    let fa = document.getElementsByClassName('ui-accordion-header');
    if (this.state == 'active') {
      for (let i = 0; i < fa.length; i++) {
        fa[i].getElementsByTagName('span')[0].style.display = 'none';
      }
      this.pTooltipIf = true;
    } else {
      for (let i = 0; i < fa.length; i++) {
        fa[i].getElementsByTagName('span')[0].style.display = 'inline-block';
      }
      this.pTooltipIf = false;
    }
  }

  loginOut() {
    sessionStorage.clear();
    this.authenticationService.logout();
  }
}
