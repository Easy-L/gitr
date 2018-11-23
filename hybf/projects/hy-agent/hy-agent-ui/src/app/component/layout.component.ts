///<reference path="../../../node_modules/@angular/core/src/linker/query_list.d.ts"/>
import {
  ChangeDetectorRef, Component, ComponentFactory, ComponentFactoryResolver, OnInit, QueryList, TemplateRef, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {LayoutService} from './layout.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AuthenticationService} from '../service/authentication.service';
import {TabPanel, TabView} from "primeng/primeng";

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

  constructor(private resolver: ComponentFactoryResolver,private vcr:ViewContainerRef,private service: LayoutService, private router: Router, private authenticationService: AuthenticationService) {
  };

  @ViewChild('tv') tabView;


  ngOnInit() {
    this.getMenu();
  }

  menus: any[];
  state: string = 'inactive';
  pTooltipIf: boolean = false;
  menumsg: string;
  private tabTpl: QueryList<any>;

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

  /*
  *  tableView 切换
  * */
  switchTableView(name:string,link:string) {

    let currentTab = this.tabView.findSelectedTab();
    let allTabs:TabPanel[] = this.tabView.tabs;
    let exist:boolean=false;
    let length =allTabs.length;
    for(let i= 0;i<length;i++){
      if(name==allTabs[i].header){
        currentTab.selected=false;
        allTabs[i].selected=true;
        allTabs[i].closed=false;
       // exist=true;
      }
    }

    // if(!exist){
    //   let addTab:TabPanel= new TabPanel(this.vcr);
    //
    //   //this.tabView.el.tabView.insertView();
    //   addTab.header=name;
    //   addTab.closable=true;
    //   addTab.selected=true;
    //   addTab.id=link;
    //   //let factory: ComponentFactory<RouterOutlet>=this.resolver.resolveComponentFactory(RouterOutlet);
    //   //this.vcr.createComponent(factory);
    //   //addTab.viewContainer.createComponent(factory);
    //   addTab.viewContainer.element.nativeElement.append("<RouterOutlet></RouterOutlet>");
    //   currentTab.selected=false;
    //
    //   let tabs: TabPanel[]=this.tabView.tabs.concat(addTab);
    //   this.tabView.tabs=tabs;
    // }

  }

}
