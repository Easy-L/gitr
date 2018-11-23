import { Component, OnInit } from '@angular/core';
import {Basedatainfo} from "../../domain/basedatainfo";
import {Basedatadescribe} from "../../domain/basedatadescribe";
import {LazyLoadEvent, Message} from "primeng/api";
import {CodeService} from "../../service/code.service";
import {Medic} from "../../domain/medic";
import {Icd} from "../../domain/icd";
import {IcdOper} from "../../domain/icd-oper";
import {Server} from "../../domain/server";
@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
  msgs:Message[];
  Basedatadescribe: Basedatadescribe=new Basedatadescribe();
  basedatadescribetotalnumber:number;
  Basedatainfototalnumber:number=0;
  basedatadescribes: Array<Basedatadescribe>;
  basedatainfos: Array<Basedatainfo>;

  medic:Medic=new Medic();
  mediclist:Array<Medic>=[];
  medictotalnumber:number;

  icd:Icd=new Icd();
  icdlist:Array<Icd>=[];
  icdtotalnumber:number;

  icdoper:IcdOper=new IcdOper();
  icdoperlist:Array<IcdOper>=[];
  icdopertotalnumber:number;

  server:Server=new Server();
  serverlist:Array<Server>=[];
  servertotalnumber:number;

  uploadedFiles: any[] = [];

  constructor(private codeService:CodeService) {
  }

  ngOnInit() {
  }

  onRowSelect2(event) {
    this.basedatainfos = event.data.baseDataInfos;
    this.Basedatainfototalnumber=event.data.baseDataInfos.length;
  }

  loadBaseDecribeListLazy(event: LazyLoadEvent){
    if(event){
      this.Basedatadescribe.pageSize=event.rows;
      this.Basedatadescribe.pageIndex=(event.first+event.rows)/event.rows;
    }
    this.basedatainfos=[];
    //添加查询过滤条件
    this.codeService.getbasedatadescripeByPage(this.Basedatadescribe).subscribe(response=>{
      this.basedatadescribes = response.json()["content"];
      this.basedatadescribetotalnumber=response.json()["totalElements"];
    });
  }

  loadMedicListLazy(event: LazyLoadEvent){
    if(event){
      this.medic.pageSize=event.rows;
      this.medic.pageIndex=(event.first+event.rows)/event.rows;
    }
    //添加查询过滤条件
    this.codeService.getmediclistByPage(this.medic).subscribe(response=>{
      this.mediclist = response.json()["content"];
      this.medictotalnumber=response.json()["totalElements"];
    });
  }

  loadicdListLazy(event: LazyLoadEvent){
    if(event){
    this.icd.pageSize=event.rows;
    this.icd.pageIndex=(event.first+event.rows)/event.rows;
    }
    //添加查询过滤条件
    this.codeService.geticdlistByPage(this.icd).subscribe(response=>{
      this.icdlist = response.json()["content"];
      this.icdtotalnumber=response.json()["totalElements"];
    });
  }

  loadicdoperListLazy(event: LazyLoadEvent){
    if(event){
    this.icdoper.pageSize=event.rows;
    this.icdoper.pageIndex=(event.first+event.rows)/event.rows;
    }
    //添加查询过滤条件
    this.codeService.geticdoperlistByPage(this.icdoper).subscribe(response=>{
      this.icdoperlist = response.json()["content"];
      this.icdopertotalnumber=response.json()["totalElements"];
    });
  }
  loadserverListLazy(event: LazyLoadEvent){
    if(event){
    this.server.pageSize=event.rows;
    this.server.pageIndex=(event.first+event.rows)/event.rows;
    }
    //添加查询过滤条件
    this.codeService.getserverlistByPage(this.server).subscribe(response=>{
      this.serverlist = response.json()["content"];
      this.servertotalnumber=response.json()["totalElements"];
    });
  }

  loadMedicListLazy1(event: LazyLoadEvent){
    if(event){
      this.medic.pageSize=event.rows;
      this.medic.pageIndex=(event.first+event.rows)/event.rows;
    }
    //添加查询过滤条件
    this.medic.medicode=(this.medic.medicode||"").trim();
    this.codeService.getmediclistByCondition(this.medic).subscribe(response=>{
      this.mediclist = response.json()["content"];
      this.medictotalnumber=response.json()["totalElements"];
    });
  }

  loadicdListLazy1(event: LazyLoadEvent){
    if(event){
    this.icd.pageSize=event.rows;
    this.icd.pageIndex=(event.first+event.rows)/event.rows;
    }
    //添加查询过滤条件
    this.icd.icdcode=(this.icd.icdcode||"").trim();
    this.codeService.geticdlistByCondition(this.icd).subscribe(response=>{
      this.icdlist = response.json()["content"];
      this.icdtotalnumber=response.json()["totalElements"];
    });
  }

  loadicdoperListLazy1(event: LazyLoadEvent){
    if(event){
    this.icdoper.pageSize=event.rows;
    this.icdoper.pageIndex=(event.first+event.rows)/event.rows;
    }
    //添加查询过滤条件
    this.icdoper.cmcode=(this.icdoper.cmcode||"").trim();
    this.codeService.geticdoperlistByCondition(this.icdoper).subscribe(response=>{
      this.icdoperlist = response.json()["content"];
      this.icdopertotalnumber=response.json()["totalElements"];
    });
  }
  loadserverListLazy1(event: LazyLoadEvent){
    if(event){
    this.server.pageSize=event.rows;
    this.server.pageIndex=(event.first+event.rows)/event.rows;
    }
    //添加查询过滤条件
    this.server.servercode=(this.server.servercode||"").trim();
    this.codeService.getserverlistByCondition(this.server).subscribe(response=>{
      this.serverlist = response.json()["content"];
      this.servertotalnumber=response.json()["totalElements"];
    });
  }
}
