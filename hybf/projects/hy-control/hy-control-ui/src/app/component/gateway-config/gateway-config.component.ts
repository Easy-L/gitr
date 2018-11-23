import {Component, OnInit} from '@angular/core';
import {Message, SelectItem, TreeNode,LazyLoadEvent} from "primeng/api";
import {GatewayNodeService} from "../../service/gateway-node.service";
import {GatewayConfigService} from "../../service/gateway-config.service";
import {NodeTable} from "../../domain/gateway/node-table";
import {GatewayConfig} from "../../domain/gateway/gateway-config";
import {NodeDb} from "../../domain/gateway/node-db";
import {ExtraConfig} from "../../domain/gateway/extra-config";

@Component({
  selector: 'app-gateway-config',
  templateUrl: './gateway-config.component.html',
  styleUrls: ['./gateway-config.component.css']
})
export class GatewayConfigComponent implements OnInit {

  constructor(private gatewayNodeService:GatewayNodeService,
              private GatewayConfigService:GatewayConfigService) {}

  ngOnInit() {
    this.NodeStatus();
    this.loadNodeReg();
    const that=this;
    setInterval(function () {
      that.NodeStatus();
      that.nodereglist = [];
      for (let o of that.result) {
        let child: TreeNode[] = [];
        for (let children of o.childrens) {
          if (that.status.indexOf(children.ip) == -1) {
            child.push({
              data: {
                name: children.name,
                nodeId:children.nodeId,
                status:"offline"
              }
            });
          }else {
            child.push({
              data: {
                name: children.name,
                nodeId:children.nodeId,
                status:"online"
              }
            });
          }
        }

        if (that.status.indexOf(o.ip) == -1) {
          that.nodereglist.push({
            leaf:false,
            expanded: true,
            data: {
              name: o.name,
              nodeId:o.nodeId,
              status:"offline"
            },
            children: child
          });
        }else {
          that.nodereglist.push({
            leaf:false,
            expanded: true,
            data: {
              name: o.name,
              nodeId:o.nodeId,
              status:"online"
            },
            children: child
          });
        }
      }
    }, '30000');
  }
  status:Array<any>=[];//节点状态
  result:Array<any>=[];//临时表格结果集
  msgs:Message[];
  nodereglist:TreeNode[]; //表格树
  selectednodereg:TreeNode;//表格树选中项

  extraconfiglist:Array<ExtraConfig>=[]; //配置列表
  extraconfigtotalnumber:number=0;      //列表总数
  selectextraconfig:ExtraConfig=new ExtraConfig();//配置列表选择行
  extraconfig:ExtraConfig=new ExtraConfig();      //分页查询条件类

  nodedbs:SelectItem[]=[];      //节点下的数据库下拉列表
  configname:string;            //配置名称
  fromdb:NodeDb=new NodeDb();   //
  todb:NodeDb=new NodeDb();
  extrasize:number=2000;
  descpripe:string;
  nodetables:Array<NodeTable>=[];   //数据库下的表列表
  selectnodetables:NodeTable[];     //选择的表

  config:GatewayConfig;             //配置项
  showextraconfiglist:boolean=true;
  showaddextraconfig:boolean=false;
  /**
   * 获取选择数据库下的表
   * @param event
   */
  onShowTables(event){
    this.gatewayNodeService.getNodeTableList(event.value.id).subscribe(
      response => {
        this.nodetables=response.json();
      }
    )
  }

  /**
   * 发布作业配置项
   */
  publishconfig(){
    if (this.checkconfig()){
      return;
    }
    this.config=new GatewayConfig();
    this.config.fromdb=this.fromdb;
    this.config.todb=this.todb;
    this.config.count=this.extrasize;
    this.config.configname=this.configname;
    for(let pop of this.selectnodetables){
      this.config.selectnodetables.push(pop.tablecode);
    }
    this.GatewayConfigService.getNodedb(this.config).subscribe(
      response => {
        if (response.status == 200) {
          this.msgs = [];
          this.msgs.push({severity: "success", summary: "提示", detail: "发送成功"});
        }
      },error => {
        this.msgs = [];
        this.msgs.push({severity: "error", summary: "提示", detail: "未发送"});
      }
    )

  }

  /**
   * 加载左侧树节点
   */
  loadNodeReg(){
    this.gatewayNodeService.getList().subscribe(
      response => {
        if (response.status == 200) {
          this.result = response.json();
          this.nodereglist = [];
          for (let o of this.result) {
            let child: TreeNode[] = [];
            for (let children of o.childrens) {
              if (this.status.indexOf(children.ip) == -1) {
                child.push({
                  data: {
                    name: children.name,
                    nodeId:children.nodeId,
                    status:"offline"
                  }
                });
              }else {
                child.push({
                  data: {
                    name: children.name,
                    nodeId:children.nodeId,
                    status:"online"
                  }
                });
              }
            }

            if (this.status.indexOf(o.ip) == -1) {
              this.nodereglist.push({
                leaf:false,
                expanded: true,
                data: {
                  name: o.name,
                  nodeId:o.nodeId,
                  status:"offline"
                },
                children: child
              });
            }else {
              this.nodereglist.push({
                leaf:false,
                expanded: true,
                data: {
                  name: o.name,
                  nodeId:o.nodeId,
                  status:"online"
                },
                children: child
              });
            }
          }
        }
      },
      error => {
        let result = error.json();
        this.msgs = [];
        for (let prop in result.message) {
          this.msgs.push({severity: "error", summary: "提示", detail: result.message[prop]});
        }
      }
    );
  }

  /**
   * 获取节点状态
   * @constructor
   */
  NodeStatus(){
    this.GatewayConfigService.getnodestatus().subscribe(
      response => {
          this.status=response;
      },
      error => {
        let result = error;
        this.msgs = [];
        for (let prop in result.message) {
          this.msgs.push({severity: "error", summary: "提示", detail: result.message[prop]});
        }
      }
    );
  }

  /**
   * 加载右侧配置项
   * @param {} event
   */
  loadExtraConfig(event: LazyLoadEvent){
    if(event){
      this.extraconfig.pageSize=event.rows;
      this.extraconfig.pageIndex=(event.first+event.rows)/event.rows;
    }
    this.GatewayConfigService.getextraconfiglist(this.extraconfig).subscribe(response=>{
      this.extraconfiglist = response["content"];
      this.extraconfigtotalnumber=response["totalElements"];
    });
  }

  /**
   * 点击节点获取节点下数据库
   */
  onNodeSelect(event){
    this.nodedbs=[];
    this.fromdb=null;
    this.todb=null;
    this.nodetables=[];
    this.selectnodetables=[];
    this.configname=null;
    this.gatewayNodeService.getNodeDbList(this.selectednodereg.data.nodeId).subscribe(
      response => {
        let lists = response.json();
        for(let value of lists){
          this.nodedbs.push(
            {
              label:value.dbName,
              value:{id:value.id,
                ip: value.ip,
                port: value.port,
                dbType: value.dbType,
                dbName:value.dbName,
                userName: value.userName,
                password: value.password
              }
            }
          )
        }
      }
    )
  }
  /**
   *新增配置项
   */
  addextraconfig(){
    if (!this.selectednodereg){
      this.msgs=[];
      this.msgs.push({severity: "warn", summary: "提示", detail: "请选择节点后在添加"});
      return;
    }
    this.showaddextraconfig=true;
    this.showextraconfiglist=false;
  }

  /**
   * 返回按钮功能
   */
  returnlist(){
    this.showaddextraconfig=false;
    this.showextraconfiglist=true;
    this.loadExtraConfig(null);
  }

  /**
   * 保存配置项
   */
  saveextraconfig(){
    if (this.checkconfig()){
      return;
    }
    this.extraconfig=new ExtraConfig();
    this.extraconfig.fromdb=this.fromdb.dbName;
    this.extraconfig.fromdbid=this.fromdb.id;
    this.extraconfig.todb=this.todb.dbName;
    this.extraconfig.todbid=this.todb.id;
    this.extraconfig.extraNumber=this.extrasize;
    this.extraconfig.configname=this.configname;
    this.extraconfig.descripe=this.descpripe;
    for(let pop of this.selectnodetables){
      this.extraconfig.childs.push({tablename:pop.tablecode});
    }
    this.GatewayConfigService.saveextraconfig(this.extraconfig).subscribe(response=>{
      let elementById = document.getElementById("buttonid");
      elementById.setAttribute("disabled", "disabled");
      this.msgs=[];
      this.msgs.push({severity: "success", summary: "提示", detail: "保存成功"});
    });
  }

  /**
   * 从保存的配置项进行数据抽取
   */
  publishsaveconfig(){
    if(!this.selectextraconfig){
      this.msgs=[];
      this.msgs.push({severity: "info", summary: "提示", detail: "请选择配置项"});
      return;
    }
    this.config=new GatewayConfig();
    this.config.count=this.selectextraconfig.extraNumber;
    this.config.configname=this.selectextraconfig.configname;
    this.gatewayNodeService.getNodeDb(this.selectextraconfig.fromdbid).subscribe(response=>{
      let result=response.json();
      this.fromdb.id=result.id;
      this.fromdb.ip=result.ip;
      this.fromdb.port=result.port;
      this.fromdb.dbType=result.dbType;
      this.fromdb.dbName=result.dbName;
      this.fromdb.userName=result.userName;
      this.fromdb.password=result.password;
      this.config.fromdb=this.fromdb;
      this.gatewayNodeService.getNodeDb(this.selectextraconfig.todbid).subscribe(response=>{
        let result=response.json();
        this.todb.id=result.id;
        this.todb.ip=result.ip;
        this.todb.port=result.port;
        this.todb.dbType=result.dbType;
        this.todb.dbName=result.dbName;
        this.todb.userName=result.userName;
        this.todb.password=result.password;
        this.config.todb=this.todb;
        console.log(this.selectextraconfig.childs);
        for(let pop of this.selectextraconfig.childs){
          this.config.selectnodetables.push(pop.tablename);
        }
        this.GatewayConfigService.getNodedb(this.config).subscribe(response => {

        })
      })
      this.msgs=[];
      this.msgs.push({severity: "success", summary: "提示", detail: "保存成功"});
    },error=>{
      this.msgs=[];
      this.msgs.push({severity: "error", summary: "提示", detail: "节点无此数据库"});
    });
  }
  /**
   * 检查配置项参数是否输入完成
   */
  checkconfig(){
    if (!this.fromdb) {
      this.msgs=[];
      this.msgs.push({severity: "info", summary: "提示", detail: "请选择来源数据库"});
      return true;
    }
    if (!this.todb) {
      this.msgs=[];
      this.msgs.push({severity: "warn", summary: "提示", detail: "请选择到数据库"});
      return true;
    }
    if (!this.configname) {
      this.msgs=[];
      this.msgs.push({severity: "warn", summary: "提示", detail: "请输入配置名称"});
      return true;
    }
    if (!this.selectnodetables||this.selectnodetables.length==0) {
      this.msgs=[];
      this.msgs.push({severity: "warn", summary: "提示", detail: "请选择同步表"});
      return true;
    }
  }
}
