import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, Message, SelectItem, TreeNode} from "primeng/api";
import {TableDataClass} from "../../domain/tabledataclass";
import {TabledataService} from "../../service/tabledata.service";
import {TableDataDetail} from "../../domain/tabledatadetail";


@Component({
  selector: 'app-tabledata',
  templateUrl: './tabledata.component.html',
  styleUrls: ['./tabledata.component.css']
})
export class TabledataComponent  implements OnInit{
  msgs: Message[];
  tabledatatree:TreeNode[];//元数据树
  selectedTabledataClass: TreeNode;//元数据树选中该节点

  displayDialog = false;//元数据对话框
  displayDetailDialog=false;//元数据详细对话框
  header :string;
  tabledatatypecode:boolean=false;//是否显示元数据编码选项
  tabledataparent: SelectItem[];//下拉列表填充项
  tabledataclasstemp:TableDataClass=new TableDataClass();//元数据修改表单模型,
  tabledataclassForm: FormGroup;

  tabledatadetails:Array<TableDataDetail>=[];//详细表格原始数据
  selectTableDataDetails:TableDataDetail[]=[];//详细选中行数据
  tabledataDetailForm: FormGroup;
  tabledatadetailtemp:TableDataDetail=new TableDataDetail();//详细表单模型

  datatypedropdowns: SelectItem[]=[];//数据类型下拉框
  dataformat: SelectItem[]=[{label:'日期', value:"D1"},];//标识格式
  standcode: SelectItem[]=[{label:'日期', value:"D1"},];
  checked:boolean=true; //有无标准类型代码
  disablestandcode:any=false;
  searchconditon:string;
  constructor(private tabledatservice: TabledataService, private fb: FormBuilder,private confirmationService: ConfirmationService) {
    this.tabledataclassForm=this.fb.group(
      {
        'typeCode': new FormControl("", Validators.required),
        'typeName': new FormControl('', Validators.required),
        'typelevel': new FormControl('', null),
        'id': new FormControl('', null),
        'parentId': new FormControl('', null),
        'memo': new FormControl('', null)}
    );

    this.tabledataDetailForm=this.fb.group(
      {
        'id': new FormControl('', null),
        'metaCode': new FormControl('', Validators.required),
        'metaName': new FormControl('', Validators.required),
        'fieldName': new FormControl('', Validators.required),
        'symbolCode': new FormControl('', Validators.required),
        'dataformat': new FormControl('', Validators.required),
        'primaryKey': new FormControl('', Validators.required),
        'required': new FormControl('', Validators.required),
        'foreignKey': new FormControl('', Validators.required),
        'foreignTableName': new FormControl('', null),
        'foreignColumnName': new FormControl('', null),
        'selfDefinedRule': new FormControl('', null),
        'pym': new FormControl('', null),
        'wbm': new FormControl('', null),
        'standardCode': new FormControl('', null),
        'dataSource': new FormControl('', null),
        'updateTime': new FormControl('', null)}
    )
  }

  ngOnInit() {
    this.loadTabledataClassTree();
  }
  //点击加载元数据树子节点
  onNodeExpand(event){
    event.node.children = [];
    this.tabledatservice.getChildrens(event.node.data).subscribe(response => {
      let result: Array<any> = response.json();
      for (let o of result) {
        event.node.children.push({
          label: o.typeName,
          data: o.id,
          icon:"fa-file-word-o",
          leaf: true
        })
      }
    });
    this.selectedTabledataClass=null;
  }

  //点击加载详细表格
  onNodeSelect(event) {
    this.loadDetailTable();
  }
  //元数据对话框
  dialog(flag: boolean) {
    this.tabledataparent=[];
    this.tabledataclasstemp = new TableDataClass();
    if (flag) {
      if(this.UnSelectTreeNodeTip()){
        return;
      }
      for (let o of this.tabledatatree) {
        this.tabledataparent.push({
          label: o.label,
          value: o.data
        })}
      this.header = '编辑';
      this.tabledataclassForm.controls["typeCode"].disable();
      this.tabledatservice.get(this.selectedTabledataClass.data).subscribe(
        response => {
          this.tabledataclasstemp.id=response.json().id;
          this.tabledataclasstemp.typeCode=response.json().typeCode;
          this.tabledataclasstemp.typeName=response.json().typeName;
          this.tabledataclasstemp.memo=response.json().memo;
          this.tabledataclasstemp.typeOrder=response.json().typeOrder;
          this.tabledataclasstemp.parentId=response.json().parentId;
        }
      )
    } else {
      this.header="新增";
      for (let o of this.tabledatatree) {
        this.tabledataparent.push({
          label: o.label,
          value: o.data
        })}
      //如果选中则赋值给
      if (this.selectedTabledataClass != null) {
        if(!this.selectedTabledataClass.leaf){
          this.tabledataclasstemp.parentId=this.selectedTabledataClass.data
        }else{
          this.tabledatservice.get(this.selectedTabledataClass.data).subscribe(
            response => {
              this.tabledataclasstemp.parentId=response.json().parentId;
            })
        }
      }
    }
    this.displayDialog = true;
  }
  //对话框隐藏的时候
  onHide(event){
    this.tabledataclassForm.controls["typeCode"].enable();
    this.selectTableDataDetails=[];
  }
  cancel() {
    this.displayDialog = false;
    this.displayDetailDialog=false;
  }
  // 保存元数据
  save() {
    if (this.header == "新增") {
      this.tabledatservice.post(this.tabledataclasstemp).subscribe(
        response => {
          if (response.status == 200) {
            this.displayDialog = false;
            this.msgs = [];
            this.msgs.push({severity: "success", summary: "提示", detail: "新增成功"});
            this.loadTabledataClassTree();
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
    else {
      this.tabledatservice.put(this.tabledataclasstemp).subscribe(
        response => {
          if (response.status == 200) {
            this.displayDialog = false;
            this.msgs = [];
            this.msgs.push({severity: "success", summary: "提示", detail: "修改成功"});
            this.loadTabledataClassTree();
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

  }
  //删除节点
  deleteNode() {
    if(this.UnSelectTreeNodeTip()){
      return;
    }
    this.confirmationService.confirm({
      message: '你确定要删除?',
      accept: () => {
        this.tabledatservice.delete(this.selectedTabledataClass.data).subscribe(
          response => {
            if (response.status == 200) {
              this.msgs = [];
              this.msgs.push({severity: "success", summary: "提示", detail: "删除成功"});
              this.loadTabledataClassTree();
              this.tabledatadetails=[];
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

  //加载元数据树父节点
  loadTabledataClassTree(){
    this.tabledatatree=[];
    this.tabledatservice.getRoot().subscribe(response => {
      let result: Array<any> = response.json();
      for(let o of result){
        this.tabledatatree.push({
          label: o.typeName,
          data: o.id,
          expandedIcon: "fa-folder-open",
          collapsedIcon: "fa-folder",
          leaf: false
        })
      }
    });
    this.selectedTabledataClass=null;
  }

  dialogDetail(flag){
    //填充下拉列表
    this.datatypedropdowns = [
      {label:'日期', value:"D1"},
      {label:'布尔', value:"B1"},
      {label:'数值', value:"N1"},
      {label:'字符', value:"S1"},
      {label:'时间字符', value:"D2"}
    ];
    if(flag){
      this.header="修改";
      if(this.selectTableDataDetails.length!=1){
        this.displayDetailDialog=false;
        this.msgs = [];
        this.msgs.push({severity: "info", summary: "提示", detail: "请选择一条数据"});
        return;
      }
      this.tabledatadetailtemp=new TableDataDetail();
      this.tabledatadetailtemp = this.selectTableDataDetails.pop();
      this.displayDetailDialog=true;
    } else{
      this.header="新增";
      if(this.UnSelectTreeNodeTip()){
        return;
      }
      //将class id填充到
      this.tabledatadetailtemp = new TableDataDetail();
      this.tabledatadetailtemp.managerTabledataClassId=this.selectedTabledataClass.data;

      this.displayDetailDialog=true;
    }
  }

  saveDetail(){
    if (this.header == "新增") {
      this.tabledatservice.postDetail(this.tabledatadetailtemp).subscribe(
        response => {
          if (response.status == 200) {
            this.displayDetailDialog = false;
            this.msgs = [];
            this.msgs.push({severity: "success", summary: "提示", detail: "新增成功"});
            //重新加载detail表格
            this.loadDetailTable();
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
    }else{
      this.tabledatadetailtemp.updateTime = null;
      this.tabledatservice.putDetail(this.tabledatadetailtemp).subscribe(
        response => {
          if (response.status == 200) {
            this.displayDetailDialog = false;
            this.msgs = [];
            this.msgs.push({severity: "success", summary: "提示", detail: "修改成功"});
            //重新加载detail表格
            this.loadDetailTable();
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
  }
  //重新加载detail表格
  loadDetailTable() {
    this.selectTableDataDetails=[];
    this.tabledatservice.getDetails(this.selectedTabledataClass.data).subscribe(response => {
      this.tabledatadetails=[];
      this.tabledatadetails = response.json();
    })
  }

  deleteDetail() {
    this.confirmationService.confirm({
      message: '你确定要删除?',
      accept: () => {
        this.tabledatservice.deleteDetail(this.selectTableDataDetails).subscribe(
          response => {
            if (response.status == 200) {
              this.loadDetailTable();
              this.msgs = [];
              this.msgs.push({severity: "success", summary: "提示", detail: "删除成功"});
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
  UnSelectTreeNodeTip(){
    if (this.selectedTabledataClass == null) {
      this.msgs = [];
      this.msgs.push({severity: "info", summary: "提示", detail: "请选择数据"});
      this.tabledataclasstemp = new TableDataClass();
      return true;
    }
  }
  //有无标准代码改变
  onchangeCheck(event){
    this.checked = event.checked;
    this.disablestandcode=!event.checked;
  }

  onsearchconditon(){
    if(this.searchconditon==null||this.searchconditon==""||this.searchconditon==undefined ){
      this.loadTabledataClassTree();
      return;
    }
    this.tabledatservice.searchDataClassTree(this.searchconditon).subscribe(
      response => {
        if (response.status == 200) {
          console.log(response);
          let result = response.json();
          this.tabledatatree=[];
          for (let o of result) {
            let child: TreeNode[] = [];
            for (let children of o.childrens) {
              child.push({
                label: children.typeName,
                data: children.id,
                icon: "fa-file-word-o",
              });
            }
            this.tabledatatree.push({
              label: o.typeName,
              data: o.id,
              expanded: true,
              children: child,
              expandedIcon: "fa-folder-open",
              collapsedIcon: "fa-folder"
            });
          }
        }
      },
      error => {
      }
    );
  }

}
