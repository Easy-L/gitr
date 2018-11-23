import { Component, OnInit } from '@angular/core';
import {MetasetPublish} from "../../domain/gateway/metaset-publish";
import {Message} from 'primeng/api';
import {PublishService} from "../../service/publish.service";
import {LazyLoadEvent} from 'primeng/api';

@Component({
  selector: 'app-datacheck-publish',
  templateUrl: './datacheck-publish.component.html',
  styleUrls: ['./datacheck-publish.component.css']
})
export class DatacheckPublishComponent implements OnInit {

  constructor(private PublishService:PublishService) { }

  ngOnInit() {
  }

  msgs:Message[];
  datacheckpublishlist:Array<MetasetPublish>=[];  //表格结果集
  datacheckpublishtotalnumber:number=0;

  selectpublish:MetasetPublish=new MetasetPublish();     //表格选中结果
  publishcondition:MetasetPublish=new MetasetPublish();     //表格选中结果
  newpublishdialog:boolean=false; //新增对话框

  new(){

    this.PublishService.datacheckadd().subscribe(response=>{
      this.newpublishdialog=true;
      this.publishcondition.version=response+1;
      console.log(this.publishcondition);
    },error => {
      this.msgs = [];
      this.msgs.push({severity: "error", summary: "", detail: "获取最大版本号失败"});
    });
  }

  save(){
    this.PublishService.datacheckaddsave(this.publishcondition).subscribe(response=>{
      this.newpublishdialog=false;
      this.loadLazy(null);
      this.msgs = [];
      this.msgs.push({severity: "success", summary: "", detail: "新增成功"});
    },error => {
      this.msgs = [];
      this.msgs.push({severity: "error", summary: "", detail: "新增失败"});
    });
  }

  publish(){
    if (this.selectpublish.id==null ){
      this.msgs = [];
      this.msgs.push({severity: "info", summary: "", detail: "请选择版本进行发布"});
      return;
    }
    this.PublishService.datacheckpublish(this.selectpublish).subscribe(response=>{
      this.newpublishdialog=false;
      this.loadLazy(null);
      this.msgs = [];
      this.msgs.push({severity: "success", summary: "", detail: "成功发布版本"});
    },error => {
      this.msgs = [];
      this.msgs.push({severity: "error", summary: "", detail: "发布版本同步消息失败"});
    });
  }

  onHide(event){
    this.publishcondition=new MetasetPublish();
  }

  loadLazy(event: LazyLoadEvent){
    if(event){
      this.publishcondition.pageSize=event.rows;
      this.publishcondition.pageIndex=(event.first+event.rows)/event.rows;
    }
    this.PublishService.datachecklist(this.publishcondition).subscribe(response=>{
      this.datacheckpublishlist = response["content"];
      this.datacheckpublishtotalnumber=response["totalElements"];
    });
  }
}
