import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, Message, SelectItem, TreeNode} from "primeng/api";
import {GatewayNodeService} from "../../service/gateway-node.service";
import {GatewayNodeReg} from "../../domain/gateway/gateway-node-reg";
import {NodeDb} from "../../domain/gateway/node-db";
import {NodeTable} from "../../domain/gateway/node-table";
import {GatewayConfigService} from "../../service/gateway-config.service";

@Component({
  selector: 'app-gatewayregister',
  templateUrl: './gatewayregister.component.html',
  styleUrls: ['./gatewayregister.component.css']
})
export class GatewayregisterComponent implements OnInit {
  @ViewChild('te') te;

  constructor(private fb: FormBuilder,private confirmationService: ConfirmationService,
              private gatewayNodeService:GatewayNodeService,private gatewayConfigService:GatewayConfigService) {
    this.gatewayForm=this.fb.group(
      {
        'nodeId': new FormControl('', Validators.required),
        'name': new FormControl('', Validators.required),
        'pid': new FormControl('', null),
        'id': new FormControl('', null),
        'address': new FormControl('', null),
        'ip': new FormControl('', null),
        'winUser': new FormControl('', null),
        'winPass': new FormControl('', null),
        'regOper': new FormControl('', null),
        'regDate': new FormControl('', null),
        'conName': new FormControl('', null),
        'conPhone': new FormControl('', null),
        'conEmail': new FormControl('', null),
        'conQq': new FormControl('', null),
        'installDriver': new FormControl('', null),
        'jmsIp': new FormControl('', null),
        'jmsPort': new FormControl('', null),
        'jmsUsername': new FormControl('', null),
        'jmsPassword': new FormControl('', null),
        'intallor': new FormControl('', null),
        'installDate': new FormControl('', null),
        'versions': new FormControl('', null),
        'remark': new FormControl('', null),
        'creator': new FormControl('',  Validators.required),
        'createTime': new FormControl('', Validators.required),
        'modifor': new FormControl('', null),
        'reportEmailList': new FormControl('', null)
      }
    );

    this.nodedbForm=this.fb.group(
      {
        'id': new FormControl('', null),
        'ip': new FormControl('', Validators.required),
        'port': new FormControl('', Validators.required),
        'dbType': new FormControl('', null),
        'accessType': new FormControl('', null),
        'dbName': new FormControl('', Validators.required),
        'userName': new FormControl('', Validators.required),
        'password': new FormControl('', null),
        'connName': new FormControl('', Validators.required),
        'remark': new FormControl('', null),
        'creator': new FormControl('', null),
        'modifor': new FormControl('', null),
        'nodeId': new FormControl('', null)
      }
    )
  }

  ngOnInit() {
    this.cn = {
      firstDayOfWeek: 0,
      dayNamesMin: ["日","一","二","三","四","五","六"],
      monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
      today: '今天',
      clear: '清除'
    };
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
                ip: children.ip,
                pid:children.pid,
                regOper: children.regOper,
                regDate: children.regDate,
                versions: children.versions,
                remark: children.remark,
                status:"offline"
              }
            });
          }else {
            child.push({
              data: {
                name: children.name,
                nodeId:children.nodeId,
                ip: children.ip,
                pid:children.pid,
                regOper: children.regOper,
                regDate: children.regDate,
                versions: children.versions,
                remark: children.remark,
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
              pid:o.pid,
              ip: o.ip,
              regOper: o.regOper,
              regDate: o.regDate,
              versions: o.versions,
              remark: o.remark,
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
              pid:o.pid,
              ip: o.ip,
              regOper: o.regOper,
              regDate: o.regDate,
              versions: o.versions,
              remark: o.remark,
              status:"online"
            },
            children: child
          });
        }
      }

    }, '30000');
  }
  result:Array<any>=[];
  status:Array<any>=[];
  msgs:Message[];
  cn:any;//日期中国化
  nodereglist:TreeNode[]; //表格树
  selectednodereg:TreeNode;//表格树选中项
  gatewaynoderegtemp:GatewayNodeReg=new GatewayNodeReg();//网管注册实体
  gatewayroots:SelectItem[];
  gatewayForm:FormGroup;
  searchconditon:string;

  showgatewaylist:boolean=true;//网关列表页
  showgatewayregister:boolean=false;//网关注册管理页
  showgatewaynodedb:boolean=false;//

  nodedblist:Array<NodeDb>=[];
  selectnodedb:NodeDb;
  dbTypes:any=[
    {label: 'oracle', value: 'oracle'},
    {label: 'mysql', value: 'mysql'},
    {label: 'sqlserver', value: 'sqlserver'}
  ];
  accessTypes:any=[
    {label: 'jdbc', value: 'jdbc'},
    {label: 'odbc', value: 'odbc'}
  ];
  nodedbForm:FormGroup;
  nodedbtemp:NodeDb=new NodeDb();

  databaselist:boolean=true;
  databasemodify:boolean=false;

  displaymessage:boolean=false;
  databasetable:boolean=false;

  nodetables:Array<NodeTable>=[];
  nodetable:NodeTable;

  dialog(flag: boolean){
    this.gatewayroots=[];
    this.gatewaynoderegtemp=new GatewayNodeReg();
    if(flag){
      if (this.selectednodereg == null) {
        this.msgs = [];
        this.msgs.push({severity: "info", summary: "提示", detail: "请选择数据"});
        return;
      }
      for (let o of this.nodereglist) {
        this.gatewayroots.push({
          label: o.data.name,
          value: o.data.nodeId
        })}
      this.gatewayForm.controls["nodeId"].disable();
      this.gatewayNodeService.getNodeReg(this.selectednodereg.data.nodeId).subscribe(
        response => {
          if (response.status == 200) {
            this.gatewaynoderegtemp=response.json();
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
      //加载db表格
      this.loadNodeDbList();
      this.showgatewaynodedb=true;//显示nodedb
    }else{
      this.gatewayForm.controls["nodeId"].enable();
      for (let o of this.nodereglist) {
        this.gatewayroots.push({
          label: o.data.name,
          value: o.data.nodeId
        })}
      if (this.selectednodereg != null) {
        if(this.selectednodereg.data.pid == "ROOT"){
          this.gatewaynoderegtemp.pid=this.selectednodereg.data.nodeId;
        }else{
          this.gatewaynoderegtemp.pid=this.selectednodereg.data.pid;
        }
      }
      this.gatewaynoderegtemp.creator="FIRSTCREATOR"; //添加创建人到隐藏域中.
      this.gatewaynoderegtemp.modifor="FIRSTCREATOR";//添加修改人人到隐藏域中.
      this.gatewaynoderegtemp.createTime=new Date();
    }
    this.showgatewaylist=false;//网关列表页
    this.showgatewayregister=true;//网管注册管理页
  }

  returnlist(){
    //返回列表页
    this.showgatewaylist=true;//网关列表页
    this.showgatewayregister=false;//网管注册管理页
    this.showgatewaynodedb=false;
    this.loadNodeReg();
  }

  savereg(){
    this.gatewayNodeService.postNodeReg(this.gatewaynoderegtemp).subscribe(
      response => {
        if (response.status == 200) {
          this.showgatewaynodedb=true;
          this.selectednodereg.data.nodeId=response.json().nodeId;
          this.loadNodeDbList();
          this.msgs = [];
          this.msgs.push({severity: "success", summary: "提示", detail:"保存成功"});
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

  deleteNodeReg(){
    if (this.selectednodereg == null) {
      this.msgs = [];
      this.msgs.push({severity: "info", summary: "提示", detail: "请选择一条数据删除"});
      return;
    }
    this.confirmationService.confirm({
      message: '你确定要删除?',
      accept: () => {
        this.gatewayNodeService.deleteNodeReg(this.selectednodereg.data.nodeId).subscribe(
          response => {
            if (response.status == 200) {
              this.msgs = [];
              this.msgs.push({severity: "success", summary: "提示", detail: "删除成功"});
              this.loadNodeReg();
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
    });
  }

  searchnodereglistbyname(){
    this.gatewayNodeService.getListbycondition(this.searchconditon).subscribe(
      response => {
        if (response.status == 200) {
          let result = response.json();
          this.nodereglist = [];
          for (let o of result) {
            let child: TreeNode[] = [];
            for (let children of o.childrens) {
              child.push({
                data: {
                  name: children.name,
                  nodeId:children.nodeId,
                  ip: children.ip,
                  pid:children.pid,
                  regOper: children.regOper,
                  regDate: children.regDate,
                  versions: children.versions,
                  remark: children.remark
                }
              });
            }
            this.nodereglist.push({
              leaf:false,
              expanded: true,
              data: {
                name: o.name,
                nodeId:o.nodeId,
                pid:o.pid,
                ip: o.ip,
                regOper: o.regOper,
                regDate: o.regDate,
                versions: o.versions,
                remark: o.remark
              },
              children: child
            });
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
  // --------------------------------------------------------------------------------
  dialognodedb(flag:boolean){
    this.nodedbtemp=new NodeDb();
    if (flag){
      if (this.selectnodedb==null){
        this.msgs = [];
        this.msgs.push({severity: "error", summary: "提示", detail:"请选择一条数据"});
        return;
      }
      this.gatewayNodeService.getNodeDb(this.selectnodedb.id).subscribe(
        response => {
          if (response.status == 200) {
            this.nodedbtemp=response.json();
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
    }else {
      //新增
      this.nodedbtemp.creator="FIRST";
      this.nodedbtemp.modifor="FIRST";
      let gatewayNodeReg=new GatewayNodeReg();
      this.nodedbtemp.parent.nodeId=this.selectednodereg.data.nodeId;
    }
    this.databaselist=false;
    this.databasemodify=true;
  }
  savenodedb(){
    this.gatewayNodeService.postNodeDb(this.nodedbtemp).subscribe(
      response => {
        if (response.status == 200) {
          this.msgs = [];
          this.msgs.push({severity: "success", summary: "提示", detail: "保存成功"});
          this.databaselist=true;
          this.databasemodify=false;
          this.loadNodeDbList();
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
  delnodedb(){
    if (this.selectnodedb == null) {
      this.msgs = [];
      this.msgs.push({severity: "info", summary: "提示", detail: "请选择一条数据删除"});
      return;
    }
    this.confirmationService.confirm({
      message: '你确定要删除?',
      accept: () => {
        this.gatewayNodeService.deleteNodeDb(this.selectnodedb.id).subscribe(
          response => {
            if (response.status == 200) {
              this.msgs = [];
              this.msgs.push({severity: "success", summary: "提示", detail: "删除成功"});
              this.loadNodeDbList();
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
    })
  }
  returndialogdatabase(){
    this.databaselist=true;
    this.databasemodify=false;
    this.databasetable=false;
  }

  dialogdbtable(){
    if(this.selectnodedb==null){
      this.msgs=[];
      this.msgs.push({severity: "warn", summary: "提示", detail:"请选择数据库"});
      return;
    }
    this.databaselist=false;
    this.databasetable=true;
    this.gatewayNodeService.getNodeTableList(this.selectnodedb.id).subscribe(
      response => {
        if (response.status == 200) {
          this.nodetables=response.json();
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

  dialogtest(){
    this.displaymessage=true;
  }
  //加载数据表格
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
                    ip: children.ip,
                    pid:children.pid,
                    regOper: children.regOper,
                    regDate: children.regDate,
                    versions: children.versions,
                    remark: children.remark,
                    status:"offline"
                  }
                });
              }else {
                child.push({
                  data: {
                    name: children.name,
                    nodeId:children.nodeId,
                    ip: children.ip,
                    pid:children.pid,
                    regOper: children.regOper,
                    regDate: children.regDate,
                    versions: children.versions,
                    remark: children.remark,
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
                  pid:o.pid,
                  ip: o.ip,
                  regOper: o.regOper,
                  regDate: o.regDate,
                  versions: o.versions,
                  remark: o.remark,
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
                  pid:o.pid,
                  ip: o.ip,
                  regOper: o.regOper,
                  regDate: o.regDate,
                  versions: o.versions,
                  remark: o.remark,
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
  loadNodeDbList(){
    this.gatewayNodeService.getNodeDbList(this.selectednodereg.data.nodeId).subscribe(
      response => {
        if (response.status == 200) {
          this.nodedblist=response.json();
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

  NodeStatus(){
    this.gatewayConfigService.getnodestatus().subscribe(
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
}
