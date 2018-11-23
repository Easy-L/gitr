import { Component, OnInit } from '@angular/core';
import {CheckCodeService} from "../../../service/check-code.service";
import {LazyLoadEvent,Message, SelectItem} from "primeng/api";
import {Icd} from "../../../domain/icd";
import {Basedatadescribe} from "../../../domain/basedatadescribe";
import {Server} from "../../../domain/server";
import {ServerHospital} from "../../../domain/server-hospital";
import {Medic} from "../../../domain/medic";
import {Basedatainfo} from "../../../domain/basedatainfo";
import {IcdOper} from "../../../domain/icd-oper";
import {IcdOperHospital} from "../../../domain/icd-oper-hospital";
import {Params} from "../../../common/params";
import {MedicHospital} from "../../../domain/checkcode/medic-hospital";
import {IcdHospital} from "../../../domain/checkcode/icd-hospital";
import {CodeService} from "../../../service/code.service";

@Component({
  selector: 'app-compare-code',
  templateUrl: './compare-code.component.html',
  styleUrls: ['./compare-code.component.css']
})
export class CompareCodeComponent implements OnInit {
  msgs:Message[];

  Basedatadescribe: Basedatadescribe=new Basedatadescribe();
  basedatadescribetotalnumber:number=0;
  Basedatainfototalnumber:number=0;
  basedatadescribes: Array<Basedatadescribe>;
  basedatainfos: Array<Basedatainfo>;

  medic:Medic=new Medic();
  mediclist:Array<Medic>=[];
  medictotalnumber:number=0;

  icd:Icd=new Icd();
  icdlist:Array<Icd>=[];
  icdtotalnumber:number=0;


  medicconditons:SelectItem[];
  medicconditonsvalues:any[];

  icdconditons:SelectItem[];
  icdconditonsvalues:any[];

  medicHospitalconditons:SelectItem[];
  uploadflag:boolean=true;

  MedicHospital:MedicHospital=new MedicHospital();
  MedicHospitalList:Array<MedicHospital>=[];
  medicHospitaltotalnumber:number=0;
  selectmedicHospital:MedicHospital=new MedicHospital();
  selectmedic:Medic=new Medic();


  IcdHospital:IcdHospital=new IcdHospital();
  IcdHospitalList:Array<IcdHospital>=[];
  icdHospitaltotalnumber:number=0;
  selecticd:Icd=new Icd();
  selecticdHospital:IcdHospital=new IcdHospital();

   //手术编码对码
  icdoper:IcdOper=new IcdOper();
  icdoperlist:Array<IcdOper>=[];
  icdoperhospitallist:Array<IcdOperHospital>=[];
  icdopertotalnumber:number=0;
  icdoperhospitaltotalnumber:number=0;

  icdoperCondition:SelectItem[];
  selectedIcdoper: string[] = [];
  paramschosed = new Params();
  icdopermatingCondition:SelectItem[];
  select: string = '';
  params = new Params();
  params1 = new Params();
  chosedIcdoper: IcdOper;
  chosedIcdoperHospital: IcdOperHospital;
  chosedIcdoperHospitals: Array<IcdOperHospital>=[];

  //医疗服务项目对码
  server:Server=new Server();
  serverlist:Array<Server>=[];
  serverhospitallist:Array<ServerHospital>=[];
  servertotalnumber:number=0;
  serverhospitaltotalnumber:number=0;

  serverCondition:SelectItem[];
  selectedServer: string[] = [];
  serverparamschosed = new Params();
  servermatingCondition:SelectItem[];
  selectServer: string = '';
  serverparams = new Params();
  serverparams1 = new Params();
  chosedServer: Server;
  chosedServerHospital: ServerHospital;
  chosedServerHospitals: Array<ServerHospital>=[];

  constructor(private codeService:CodeService,private checkCodeService:CheckCodeService) {

    this.icdoperCondition=[
      {label:'手术编码', value:'1'},
      {label:'手术名称', value:'2'}
    ];
    this.icdopermatingCondition=[
      {label:'全选', value:'0'},
      {label:'已匹配', value:'1'},
      {label:'未匹配', value:'2'}
    ];
    this.serverCondition=[
      {label:'项目编码', value:'1'},
      {label:'项目名称', value:'2'}
    ];
    this.servermatingCondition=[
      {label:'全选', value:'0'},
      {label:'已匹配', value:'1'},
      {label:'未匹配', value:'2'}
    ];

    this.medicconditons=[
      {label:'药品编码', value:"medicode"},
      {label:'商用名', value:"goodsname"},
      {label:'国药准字号', value:"approvenum"},
      {label:'生产企业', value:"productenterprisename"},
    ];
    this.icdconditons=[
      {label:'疾病编码', value:"icdcode"},
      {label:'疾病名称', value:"icdname"}
      ];
    this.medicHospitalconditons=[
      {label:'未匹配', value:"notmatch"},
      {label:'全部', value:"all"},
      {label:'已匹配', value:"match"}
    ];
  }

  ngOnInit() {
  	this.params.setPageSize(20);
  	this.params1.setPageSize(20);
  	this.serverparams.setPageSize(20);
  	this.serverparams1.setPageSize(20);
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

      if (this.mediclist!=null && this.mediclist.length==1){
        this.selectmedicHospital.medic=this.mediclist[0];
      }
    });
  }
  loadicdListLazy(event: LazyLoadEvent){
    if(event){
      this.icd.pageSize=event.rows;
      this.icd.pageIndex=(event.first+event.rows)/event.rows;
    }
    //添加查询过滤条件
    this.codeService.geticdlistByPage(this.icd).subscribe(response => {
      this.icdlist = response.json()["content"];
      this.icdtotalnumber = response.json()["totalElements"];

      if (this.icdlist!=null && this.icdlist.length==1){
        this.selecticdHospital.icd=this.icdlist[0];
      }
    });
  }

  onUpload(){
    this.msgs = [];
    this.msgs.push({severity: "success", summary: "提示", detail: "上传文件成功"});
    this.uploadflag=true;
    this.loadMedicHospitalListLazy(null);
  }
  onUploadIcd(){
    this.msgs = [];
    this.msgs.push({severity: "success", summary: "提示", detail: "上传文件成功"});
    this.uploadflag=true;
    this.loadicdHospitalListLazy(null);
  }

  onError(){
    this.msgs = [];
    this.msgs.push({severity: "error", summary: "提示", detail: "上传文件失败,请重试"});
    this.uploadflag=true;
  }
  onProgress(){
    this.uploadflag=false;
  }

  downloadmedic(){
    this.checkCodeService.downloadmedic().subscribe(response=> {
      this.checkCodeService.downFile(response,"药品字典.xlsx");
    });
  }
  loadMedicHospitalListLazy(event: LazyLoadEvent){
    if(event){
      this.MedicHospital.pageSize=event.rows;
      this.MedicHospital.pageIndex=(event.first+event.rows)/event.rows;
    }
    // if ((!this.MedicHospital.condition)) {
    //   this.MedicHospital.condition="notmatch";
    // }
    //添加查询过滤条件
    this.checkCodeService.medicHospitalList(this.MedicHospital).subscribe(response=>{
      this.MedicHospitalList = response["content"];
      this.medicHospitaltotalnumber=response["totalElements"];
    });
  }
  selectmedicfunc($event){
    if(this.selectmedicHospital!=null){
      this.selectmedicHospital.medic=this.selectmedic;
    }
  }
  selecthospitalmedic(event){
    this.medic=new Medic();
    if (!this.medicconditonsvalues || this.medicconditonsvalues.length==0) {
      this.medic.approvenum=event.data.approvenum;
    }else{
      if (this.medicconditonsvalues.includes("medicode")) {
        this.medic.medicode=event.data.medicode;
      }
      if (this.medicconditonsvalues.includes("goodsname")) {
        this.medic.goodsname=event.data.goodsname;
      }
      if (this.medicconditonsvalues.includes("approvenum")) {
        this.medic.approvenum=event.data.approvenum;
      }
      if (this.medicconditonsvalues.includes("productenterprisename")) {
        this.medic.productenterprisename=event.data.productenterprisename;
      }
    }
    this.loadMedicListLazy(null);
  }
  medicmatchbyconditon(){

  }
  savemediccheckcode(){
    if(this.selectmedicHospital.mediid==null){
      this.msgs = [];
      this.msgs.push({severity: "warn", summary: "提示", detail: "请选择医院 字典后在保存"});
      return;
    }
    if(this.selectmedicHospital.medic==null){
      this.msgs = [];
      this.msgs.push({severity: "warn", summary: "提示", detail: "请选择平台字典后在保存"});
      return;
    }
    //this.selectmedicHospital.medic=this.selectmedic;
    this.checkCodeService.savemediccheckcode(this.selectmedicHospital).subscribe(response=>{
      if (response.status==200) {
        this.msgs = [];
        this.msgs.push({severity: "success", summary: "提示", detail: "保存匹配关系成功"});
        this.MedicHospital=new MedicHospital();
        this.loadMedicHospitalListLazy(null);
        this.selectmedicHospital=null;
        this.selectmedic=null;
        this.mediclist=[];
        this.medictotalnumber=0;
      }
    },error => {
      this.msgs = [];
      this.msgs.push({severity: "error", summary: "提示", detail: "保存匹配关系失败"});
      this.loadMedicHospitalListLazy(null);
    });
  }

  downloadicd(){
    this.checkCodeService.downloadicd().subscribe(response=> {
      this.checkCodeService.downFile(response,"疾病字典.xlsx");
    });
  }
  loadicdHospitalListLazy(event: LazyLoadEvent){
    if(event){
      this.IcdHospital.pageSize=event.rows;
      this.IcdHospital.pageIndex=(event.first+event.rows)/event.rows;
    }
    //添加查询过滤条件
    // if ((!this.IcdHospital.condition)) {
    //   this.IcdHospital.condition="notmatch";
    // }
    this.checkCodeService.icdHospitalList(this.IcdHospital).subscribe(response=>{
      this.IcdHospitalList = response["content"];
      this.icdHospitaltotalnumber=response["totalElements"];
    });
  }
  selecticdfunc($event){
    if(this.selecticdHospital!=null){
      this.selecticdHospital.icd=this.selecticd;
    }
  }
  selecthospitalicd(event){
    this.icd=new Icd();
    if (!this.icdconditonsvalues || this.icdconditonsvalues.length==0) {
      this.icd.icdname=event.data.icdname;
    }else{
      if (this.icdconditonsvalues.includes("icdname")) {
        this.icd.icdname=event.data.icdname;
      }
      if (this.icdconditonsvalues.includes("icdcode")) {
        this.icd.icdcode=event.data.icdcode;
      }
    }
    this.loadicdListLazy(null);
  }

  saveicdcheckcode() {
    if (this.selecticdHospital.id == null) {
      this.msgs = [];
      this.msgs.push({severity: "warn", summary: "提示", detail: "请选择医院疾病字典后在保存"});
      return;
    }
    if (this.selecticdHospital.icd == null) {
      this.msgs = [];
      this.msgs.push({severity: "warn", summary: "提示", detail: "请选择平台疾病字典后在保存"});
      return;
    }
    //this.selecticdHospital.icd = this.selecticd;
    this.checkCodeService.saveicdcheckcode(this.selecticdHospital).subscribe(response => {
        if (response.status == 200) {
          this.msgs = [];
          this.msgs.push({severity: "success", summary: "提示", detail: "保存匹配关系成功"});
          this.loadicdHospitalListLazy(null);
          this.icdlist = [];
          this.selecticd = null;
          this.selecticdHospital = null;
          this.icdtotalnumber = 0;
        }
      }
      , error => {
        this.msgs = [];
        this.msgs.push({severity: "error", summary: "提示", detail: "保存匹配关系失败"});
        this.loadicdHospitalListLazy(null);
      }
    );
  }
  //手术编码对码
  loadicdoperList(event: LazyLoadEvent): void {
  		if(event == null){
  			this.params1.setPageIndex((0 + this.params1.pageSize) / this.params1.pageSize);
  		}else{
  			this.params1.setPageIndex((event.first + this.params1.pageSize) / this.params1.pageSize);
  		}
	    this.codeService.geticdoperlist(this.params1).subscribe(response=>{
	      let result = response.json();
	      this.icdopertotalnumber = result["page"].totalElements;
	      this.icdoperlist = result["page"]["content"];
    });
  }
  loadicdoperListLazy2(event: LazyLoadEvent): void {
	    this.params.setPageIndex((event.first + this.params.pageSize) / this.params.pageSize);
	    if(this.selectedIcdoper.length == 0){
	   	   this.loadicdoperListMatch();
	    }else{
	    	this.loadicdoperListChooseMatch(null);
	    }

  }
   //根据是否匹配查询
  loadicdoperListMatch(){

   this.selectedIcdoper = [];
  	//清空已保存的匹配关系
  	this.chosedIcdoperHospitals = [];
    //添加查询是否匹配过滤条件
    this.params.set("icdopermatingCondition", this.select);

    this.codeService.geticdoperlistByMatingCondition(this.params).subscribe(response=>{
      let result = response.json();
      this.icdoperhospitaltotalnumber = result["pageHospital"].totalElements;
      this.icdoperhospitallist = result["pageHospital"]["content"];

    });
  }
	//根据选择条件
	loadicdoperListChooseMatch(event: LazyLoadEvent){
		//清空已保存的匹配关系
  		this.chosedIcdoperHospitals = [];
		this.select = '';
	    if(event){
	      this.icdoper.pageSize=event.rows;
	      this.icdoper.pageIndex=(event.first+event.rows)/event.rows;
	    }
	    //添加匹配字段
		this.params.set("paramschosed", this.selectedIcdoper.join(","));

	    this.codeService.loadicdoperListChooseMatch(this.params).subscribe(response=>{
	      let result = response.json();
	      this.icdoperhospitaltotalnumber = result["pageHospital"].totalElements;
	      this.icdoperhospitallist = result["pageHospital"]["content"];
	        for(let i=0;i<this.icdoperhospitallist.length;i++){
          if (this.icdoperhospitallist[i].icdOper != null) {
            this.chosedIcdoperHospitals.push(this.icdoperhospitallist[i]);
          }
        }
	      //this.icdopertotalnumber = result["page"].totalElements;
	      //this.icdoperlist = result["page"]["content"];

	    });
	  }

	onRowSelect() {
		this.chosedIcdoperHospital.paramschosed = this.selectedIcdoper.join(",");
		this.codeService.loadicdoperListOnRow(this.chosedIcdoperHospital).subscribe(response=>{
	      let result = response.json();
	      this.icdopertotalnumber = result["page"].totalElements;
	      this.icdoperlist = result["page"]["content"];
		  if(this.icdopertotalnumber==1) {
        for(let i=0;i<this.chosedIcdoperHospitals.length;i++){
          if (this.chosedIcdoperHospitals[i].cmid == this.chosedIcdoperHospital.cmid) {
            this.chosedIcdoperHospitals.splice(i, 1);
            this.chosedIcdoperHospitals.splice
          }
        }
        this.chosedIcdoper = this.icdoperlist[0];
        this.chosedIcdoperHospital.icdOper = this.chosedIcdoper;
        this.chosedIcdoperHospitals.push(this.chosedIcdoperHospital);
      }
	    });

	  }
	   onRowSelect1() {
	  	   for(let i=0;i<this.chosedIcdoperHospitals.length;i++){
          		 if(this.chosedIcdoperHospitals[i].cmid == this.chosedIcdoperHospital.cmid){
          		 this.chosedIcdoperHospitals.splice(i,1);
        	}
        }
	   	this.chosedIcdoperHospital.icdOper = this.chosedIcdoper;
	   	this.chosedIcdoperHospitals.push(this.chosedIcdoperHospital);
  	}
  	//保存匹配关系
  saveIcdoperMatingRelations(){
  	if (this.chosedIcdoperHospitals.length == 0) {
        this.msgs = [];
        this.msgs.push({severity: "error", summary: "提示", detail: "请选择医院和平台手术编码"});
        return;
      }

  	this.codeService.saveIcdoperMatingRelations(this.chosedIcdoperHospitals).subscribe(
      response => {
        if (response.status == 200) {
          this.msgs = [];
          this.msgs.push({severity: "success", summary: "提示", detail: "保存成功"});
          this.loadicdoperList(null);
          this.loadicdoperListMatch();
          this.chosedIcdoperHospital = null;
      	  this.chosedIcdoper = null;
      	  this.chosedIcdoperHospitals = [];
        }
      },
      error => {
        let result = error.json();
        this.msgs = [];
        this.msgs.push({severity: "error", summary: "提示", detail: "保存失败,请稍后再试！"});
        this.loadicdoperList(null);
        this.loadicdoperListMatch();
        this.chosedIcdoperHospital = null;
  	    this.chosedIcdoper = null;
  	    this.chosedIcdoperHospitals = [];
      }
    );
  }

  //医疗服务项目编码对码
  loadserverList(event: LazyLoadEvent): void {
  		if(event == null){
  			this.serverparams1.setPageIndex((0 + this.serverparams1.pageSize) / this.serverparams1.pageSize);
  		}else{
  			this.serverparams1.setPageIndex((event.first + this.serverparams1.pageSize) / this.serverparams1.pageSize);
  		}
	    this.codeService.getserverlist(this.serverparams1).subscribe(response=>{
	      let result = response.json();
	      this.servertotalnumber = result["page"].totalElements;
	      this.serverlist = result["page"]["content"];
    });
  }
  loadserverListLazy2(event: LazyLoadEvent): void {
	    this.params.setPageIndex((event.first + this.params.pageSize) / this.params.pageSize);
	    if(this.selectedServer.length == 0){
	   	   this.loadserverListMatch();
	    }else{
	    	this.loadserverListChooseMatch(null);
	    }

  }
   //根据是否匹配查询
  loadserverListMatch(){

   this.selectedServer = [];
  	//清空已选择的匹配关系
  	this.chosedServerHospitals = [];
    //添加查询是否匹配过滤条件
    this.params.set("servermatingCondition", this.selectServer);

    this.codeService.getserverlistByMatingCondition(this.params).subscribe(response=>{
      let result = response.json();
      this.serverhospitaltotalnumber = result["pageHospital"].totalElements;
      this.serverhospitallist = result["pageHospital"]["content"];

    });
  }
	//根据选择条件
	loadserverListChooseMatch(event: LazyLoadEvent){
		this.selectServer = '';
	    if(event){
	      this.server.pageSize=event.rows;
	      this.server.pageIndex=(event.first+event.rows)/event.rows;
	    }
	    //添加匹配字段
		this.params.set("serverparamschosed", this.selectedServer.join(","));

	    this.codeService.loadserverListChooseMatch(this.params).subscribe(response=>{
	      let result = response.json();
	      this.serverhospitaltotalnumber = result["pageHospital"].totalElements;
	      this.serverhospitallist = result["pageHospital"]["content"];
	        for(let i=0;i<this.serverhospitallist.length;i++){
          if (this.serverhospitallist[i].server != null) {
            this.chosedServerHospitals.push(this.serverhospitallist[i]);
          }
        }
	      //this.icdopertotalnumber = result["page"].totalElements;
	      //this.icdoperlist = result["page"]["content"];
        let a:string="";


	    });
	  }

	onRowSelectServer(event) {
		this.chosedServerHospital.serverparamschosed = this.selectedServer.join(",");
		this.codeService.loadserverListOnRow(this.chosedServerHospital).subscribe(response=>{
	      let result = response.json();
	      this.servertotalnumber = result["page"].totalElements;
	      this.serverlist = result["page"]["content"];
		  if(this.servertotalnumber==1) {
          for(let i=0;i<this.chosedServerHospitals.length;i++){
          if (this.chosedServerHospitals[i].serverid == this.chosedServerHospital.serverid) {
            this.chosedServerHospitals.splice(i, 1);
          }
        }
        this.chosedServer = this.serverlist[0];
        this.chosedServerHospital.server = this.chosedServer;
        this.chosedServerHospitals.push(this.chosedServerHospital);
      }
	    });

	  }
	   onRowSelectServer1() {
	   	  for(let i=0;i<this.chosedServerHospitals.length;i++){
          		 if(this.chosedServerHospitals[i].serverid == this.chosedServerHospital.serverid){
          		 this.chosedServerHospitals.splice(i,1);
        	}
        }
	   	this.chosedServerHospital.server = this.chosedServer;
		this.chosedServerHospitals.push(this.chosedServerHospital);
  	}
  	//保存匹配关系
  saveServerMatingRelations(){
  	if (this.chosedServerHospitals.length == 0) {
        this.msgs = [];
        this.msgs.push({severity: "error", summary: "提示", detail: "请选择医院和平台医疗服务项目编码"});
        return;
      }
  	this.codeService.saveServerMatingRelations(this.chosedServerHospitals).subscribe(
      response => {
        if (response.status == 200) {
          this.msgs = [];
          this.msgs.push({severity: "success", summary: "提示", detail: "保存成功"});
          this.loadserverList(null);
          this.loadserverListMatch();
          this.chosedServerHospital = null;
      	  this.chosedServer = null;
      	  this.chosedServerHospitals = [];
        }
      },
      error => {
        let result = error.json();
        this.msgs = [];
        this.msgs.push({severity: "error", summary: "提示", detail: "保存失败,请稍后再试！"});
      }
    );
  }
  //下载手术字典
   downloadicdoper(){
    this.checkCodeService.downloadicdoper().subscribe(response=> {
      this.checkCodeService.downFile(response,"手术字典.xlsx");
    });
  }
  //下载医疗服务字典
   downloadserver(){
    this.checkCodeService.downloadserver().subscribe(response=> {
      this.checkCodeService.downFile(response,"医疗服务字典.xlsx");
    });
  }
}
