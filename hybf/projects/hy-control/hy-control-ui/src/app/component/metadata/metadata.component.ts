import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, Message, SelectItem, TreeNode} from "primeng/api";
import {MetaDataClass} from "../../domain/meta-data-class";
import {MetadataService} from "../../service/metadata.service";
import {MetaDataDetail} from "../../domain/metadatadetail";


@Component({
    selector: 'app-metadata',
    templateUrl: './metadata.component.html',
    styleUrls: ['./metadata.component.css']
  })
export class MetadataComponent  implements OnInit{
    msgs: Message[];
    metadatatree:TreeNode[];//元数据树
    selectedMetadataClass: TreeNode;//元数据树选中该节点

    displayDialog = false;//元数据对话框
    displayDetailDialog=false;//元数据详细对话框
    header :string;
    metadatatypecode:boolean=false;//是否显示元数据编码选项
    metadataparent: SelectItem[];//下拉列表填充项
    metadataclasstemp:MetaDataClass=new MetaDataClass();//元数据修改表单模型,
    metadataclassForm: FormGroup;

    metadatadetails:Array<MetaDataDetail>=[];//详细表格原始数据
    selectMetaDataDetails:MetaDataDetail[]=[];//详细选中行数据
    metadataDetailForm: FormGroup;
    metadatadetailtemp:MetaDataDetail=new MetaDataDetail();//详细表单模型

    datatypedropdowns: SelectItem[]=[];//数据类型下拉框
    dataformat: SelectItem[]=[{label:'日期', value:"D1"},];//标识格式
    standcode: SelectItem[]=[{label:'日期', value:"D1"},];
    checked:boolean=true; //有无标准类型代码
    disablestandcode:any=false;
    searchconditon:string;
    constructor(private metadatservice: MetadataService, private fb: FormBuilder,private confirmationService: ConfirmationService) {
      this.metadataclassForm=this.fb.group(
        {
          'typecode': new FormControl("", Validators.required),
          'typename': new FormControl('', Validators.required),
          'typelevel': new FormControl('', null),
          'id': new FormControl('', null),
          'memo': new FormControl('', null)}
      );

      this.metadataDetailForm=this.fb.group(
        {
          'metacode': new FormControl('', Validators.required),
          'metaname': new FormControl('', Validators.required),
          'symbolcode': new FormControl('', null),
          'dataformat': new FormControl('', null),
          'unitmeasurement': new FormControl('', null),
          'prec': new FormControl('', null),
          'maxrange': new FormControl('', null),
          'minrange': new FormControl('', null),
          'metadefine': new FormControl('', null),
          'datasource': new FormControl('', null),
          'id': new FormControl('', null),
          'standardcode': new FormControl('', null)}
      )
    }

    ngOnInit() {
      this.loadMetadataClassTree();
    }
    //点击加载元数据树子节点
    onNodeExpand(event){
      event.node.children = [];
      this.metadatservice.getChildrens(event.node.data).subscribe(response => {
        let result: Array<any> = response.json();
        for (let o of result) {
          event.node.children.push({
            label: o.typename,
            data: o.id,
            icon:"fa-file-word-o",
            leaf: true
          })
        }
      });
      this.selectedMetadataClass=null;
    }

    //点击加载详细表格
    onNodeSelect(event) {
      this.loadDetailTable();
    }
  //元数据对话框
  dialog(flag: boolean) {
    this.metadataparent=[];
    this.metadataclasstemp = new MetaDataClass();
    if (flag) {
      if(this.UnSelectTreeNodeTip()){
        return;
      }
      for (let o of this.metadatatree) {
        this.metadataparent.push({
          label: o.label,
          value: o.data
        })}
      this.header = '编辑';
      this.metadataclassForm.controls["typecode"].disable();
      this.metadatservice.get(this.selectedMetadataClass.data).subscribe(
        response => {
          this.metadataclasstemp.id=response.json().id;
          this.metadataclasstemp.typecode=response.json().typecode;
          this.metadataclasstemp.typename=response.json().typename;
          this.metadataclasstemp.memo=response.json().memo;
          this.metadataclasstemp.typeorder=response.json().typeorder;
          this.metadataclasstemp.parentid=response.json().parentid;
        }
      )
    } else {
        this.header="新增";
        for (let o of this.metadatatree) {
          this.metadataparent.push({
            label: o.label,
            value: o.data
          })}
        //如果选中则赋值给
        if (this.selectedMetadataClass != null) {
          if(!this.selectedMetadataClass.leaf){
            this.metadataclasstemp.parentid=this.selectedMetadataClass.data
          }else{
            this.metadatservice.get(this.selectedMetadataClass.data).subscribe(
              response => {
                  this.metadataclasstemp.parentid=response.json().parentid;
              })
          }
        }
      }
    this.displayDialog = true;
  }
  //对话框隐藏的时候
  onHide(event){
    this.metadataclassForm.controls["typecode"].enable();
    this.selectMetaDataDetails=[];
  }
  cancel() {
    this.displayDialog = false;
    this.displayDetailDialog=false;
  }
  // 保存元数据
  save() {
    if (this.header == "新增") {
      this.metadatservice.post(this.metadataclasstemp).subscribe(
        response => {
          if (response.status == 200) {
            this.displayDialog = false;
            this.msgs = [];
            this.msgs.push({severity: "success", summary: "提示", detail: "新增成功"});
            this.loadMetadataClassTree();
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
      this.metadatservice.put(this.metadataclasstemp).subscribe(
        response => {
          if (response.status == 200) {
            this.displayDialog = false;
            this.msgs = [];
            this.msgs.push({severity: "success", summary: "提示", detail: "修改成功"});
            this.loadMetadataClassTree();
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
        this.metadatservice.delete(this.selectedMetadataClass.data).subscribe(
          response => {
            if (response.status == 200) {
              this.msgs = [];
              this.msgs.push({severity: "success", summary: "提示", detail: "删除成功"});
              this.loadMetadataClassTree();
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
  loadMetadataClassTree(){
    this.metadatatree=[];
    this.metadatservice.getRoot().subscribe(response => {
      let result: Array<any> = response.json();
        for(let o of result){
        this.metadatatree.push({
          label: o.typename,
          data: o.id,
          expandedIcon: "fa-folder-open",
          collapsedIcon: "fa-folder",
          leaf: false
        })
      }
    });
    this.selectedMetadataClass=null;
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
      if(this.selectMetaDataDetails.length!=1){
        this.displayDetailDialog=false;
        this.msgs = [];
        this.msgs.push({severity: "info", summary: "提示", detail: "请选择一条数据"});
        return;
      }
      this.metadatadetailtemp=new MetaDataDetail();
      this.metadatadetailtemp = this.selectMetaDataDetails.pop();
      this.displayDetailDialog=true;
    } else{
      this.header="新增";
      if(this.UnSelectTreeNodeTip()){
        return;
      }
      //将class id填充到
      this.metadatadetailtemp = new MetaDataDetail();
      this.metadatadetailtemp.id=this.selectedMetadataClass.data;

      this.displayDetailDialog=true;
    }
  }

  saveDetail(){
    if (this.header == "新增") {
      this.metadatservice.postDetail(this.metadatadetailtemp).subscribe(
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
      this.metadatservice.putDetail(this.metadatadetailtemp).subscribe(
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
      this.selectMetaDataDetails=[];
      this.metadatservice.getDetails(this.selectedMetadataClass.data).subscribe(response => {
      this.metadatadetails=[];
      this.metadatadetails = response.json();
    })
  }

  deleteDetail() {
    this.confirmationService.confirm({
      message: '你确定要删除?',
      accept: () => {
        this.metadatservice.deleteDetail(this.selectMetaDataDetails).subscribe(
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
    if (this.selectedMetadataClass == null) {
      this.msgs = [];
      this.msgs.push({severity: "info", summary: "提示", detail: "请选择数据"});
      this.metadataclasstemp = new MetaDataClass();
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
        this.loadMetadataClassTree();
        return;
      }
    this.metadatservice.searchDataClassTree(this.searchconditon).subscribe(
      response => {
        if (response.status == 200) {
          let result = response.json();
          this.metadatatree=[];
          for (let o of result) {
            let child: TreeNode[] = [];
            for (let children of o.childrens) {
              child.push({
                label: children.typename,
                data: children.id,
                icon: "fa-file-word-o",
              });
            }
            this.metadatatree.push({
              label: o.typename,
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
