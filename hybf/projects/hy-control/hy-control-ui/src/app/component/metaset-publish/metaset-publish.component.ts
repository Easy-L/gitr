import { Component, OnInit } from '@angular/core';
import {LazyLoadEvent, Message} from "primeng/api";
import {MetasetPublish} from "../../domain/gateway/metaset-publish";
import {PublishService} from "../../service/publish.service";

@Component({
  selector: 'app-metaset-publish',
  templateUrl: './metaset-publish.component.html',
  styleUrls: ['./metaset-publish.component.css']
})
export class MetasetPublishComponent implements OnInit {

  constructor(private PublishService:PublishService) { }

  ngOnInit() {
  }
  msgs:Message[];
  metasetpublishlist:Array<MetasetPublish>=[];  //表格结果集
  metasetpublishtotalnumber:number=0;

  selectpublish:MetasetPublish=new MetasetPublish();     //表格选中结果
  publishcondition:MetasetPublish=new MetasetPublish();     //表格选中结果
  newpublishdialog:boolean=false; //新增对话框

  new(){

    this.PublishService.add().subscribe(response=>{
      this.newpublishdialog=true;
      this.publishcondition.version=response+1;
      console.log(this.publishcondition);
    },error => {
      this.msgs = [];
      this.msgs.push({severity: "error", summary: "", detail: "获取最大版本号失败"});
    });
  }

  save(){
    this.PublishService.addsave(this.publishcondition).subscribe(response=>{
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
    this.PublishService.publish(this.selectpublish).subscribe(response=>{
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
    this.PublishService.list(this.publishcondition).subscribe(response=>{
      this.metasetpublishlist = response["content"];
      this.metasetpublishtotalnumber=response["totalElements"];
    });
  }
}
