import {Component, OnInit} from '@angular/core';
import {ConfirmationService, Message, SelectItem, TreeNode} from "primeng/api";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MetaSetClassService} from "../../service/meta-set-class.service";
import {MetaSetDescribe} from "../../domain/meta-set-describe";
import {MetadataService} from "../../service/metadata.service";
import {MetaDataDetail} from "../../domain/metadatadetail";
import {MetaSetClass} from "../../domain/MetaSetClass";

@Component({
  selector: 'app-meta-set',
  templateUrl: './meta-set.component.html',
  styleUrls: ['./meta-set.component.css']
})
export class MetaSetComponent implements OnInit {

  msgs: Message[];

  items: SelectItem[];//数据集下拉框
  select:any;
  metaSetClassTree: TreeNode[] = [];
  selectedMetaSetClass: TreeNode;
  searchsettreeconditon:string;
  displaySetClassDialog:boolean=false;//显示数据集添加对话框
  metasetparent:SelectItem[]=[];//数据集树选中
  selectNode:string;
  metasetclasstemp:MetaSetClass=new MetaSetClass();//元数据修改表单模型,
  metasetclassForm: FormGroup;

  selectMetaSetDescribes: MetaSetDescribe[] =[];
  metaSetDescribes: Array<MetaSetDescribe>=[];//数据集详细

  metadatatree:TreeNode[];//元数据树
  selectedMetadataClass: TreeNode;//元数据树选中该节点
  searchconditon:string;

  displayMetaDataDetail:boolean=false;//元数据详细对话框
  header:string;
  metadatadetails:Array<MetaDataDetail>=[];//详细表格原始数据
  selectMetaDataDetails:MetaDataDetail[]=[];//详细选中行数据

  constructor(private metaSetClassService: MetaSetClassService,
              private fb: FormBuilder,
              private confirmationService: ConfirmationService,
              private metadatservice: MetadataService) {
    this.items = [
      {label: '健康档案', value: 'ehr'},
      {label: '电子病历', value: 'emr'},
      {label: '数据仓库', value: 'bi'},
      {label: '公共', value: 'pub'},
      {label: '其他', value: 'other'}
    ];
    this.metasetclassForm=this.fb.group(
      {
        'setcode': new FormControl('', Validators.required),
        'setname': new FormControl('',Validators.required),
        'settype': new FormControl('', Validators.required),
        'id': new FormControl('', null),
        'setuse': new FormControl('', null),
        'typecode': new FormControl('', null),
        'useflag': new FormControl('', null),
        'encrytype': new FormControl('', null),
        'tablename': new FormControl('', null),
        'parentid': new FormControl('', null),
        'memo': new FormControl('', null)}
    )
  }

  ngOnInit() {
    this.loadMetaSetClass();
    this.loadMetadataClassTree();
  }

  loadMetaSetClass(){
    this.metaSetClassTree=[];
    this.metaSetClassService.getRoot().subscribe(response => {
      let result: Array<any> = response.json();
      for (let o of result) {
        this.metaSetClassTree.push({
          label: o.setname,
          data: o.id,
          expandedIcon: "fa-folder-open",
          collapsedIcon: "fa-folder",
          leaf: false
        })
      }
    })
  }
  onNodeExpand(event) {
    event.node.children = [];
    this.metaSetClassService.getChildrens(event.node.data).subscribe(response => {
      let result: Array<any> = response.json();
      for (let o of result) {
        event.node.children.push({
          label: o.setname,
          data: o.id,
          icon: "fa-file-word-o",
          leaf: true
        })

      }
    });
  }

  onNodeSelect(event) {
    this.selectNode=event.node.data;
    this.metaSetClassService.getMetaSetDescribes(event.node.data).subscribe(response => {
      this.metaSetDescribes = response.json();
    });
  }

  dialog(flag: boolean) {
    this.metasetparent=[];
    this.metasetclasstemp = new MetaSetClass();
    if (flag) {
      this.header = "修改";
      if (this.selectedMetaSetClass == null){
        this.msgs = [];
        this.msgs.push({severity: "warn", summary: "提示", detail: "请选择一条数据进行修改"});
        return;
      }
      for (let o of this.metaSetClassTree) {
        this.metasetparent.push({
          label: o.label,
          value: o.data
        })
      }
      this.metasetclassForm.controls["setcode"].disable();
      this.metaSetClassService.getMetaSetClass(this.selectedMetaSetClass.data).subscribe(
        response => {
            // this.metasetclasstemp=response.json();
            this.metasetclasstemp.id=response.json().id;
            this.metasetclasstemp.setcode=response.json().setcode;
            this.metasetclasstemp.setname=response.json().setname;
            this.metasetclasstemp.settype=response.json().settype;
            this.metasetclasstemp.setuse=response.json().setuse;
            this.metasetclasstemp.memo=response.json().memo;
            this.metasetclasstemp.typecode=response.json().typecode;
            this.metasetclasstemp.useflag=response.json().useflag;
            this.metasetclasstemp.encrytype=response.json().encrytype;
            this.metasetclasstemp.tablename=response.json().tablename;
            this.metasetclasstemp.parentid=response.json().parentid;
        });
    } else {
      this.header = "新增";
      for (let o of this.metaSetClassTree) {
        this.metasetparent.push({
          label: o.label,
          value: o.data
        })
      }
      if (this.selectedMetaSetClass != null) {
        if (!this.selectedMetaSetClass.leaf) {
          this.metasetclasstemp.parentid = this.selectedMetaSetClass.data;
        } else {
          this.metaSetClassService.getMetaSetClass(this.selectedMetaSetClass.data).subscribe(
            response => {
                this.metasetclasstemp.parentid=response.json().parentid;
            })
        }
      }
    }
    this.displaySetClassDialog = true;
  }
  saveSetClass(){
    this.metaSetClassService.postMetaSetClass(this.metasetclasstemp).subscribe(
      response => {
        if (response.status == 200) {
          this.displaySetClassDialog = false;
          this.msgs = [];
          this.msgs.push({severity: "success", summary: "提示", detail: "修改成功"});
          //重新加载detail表格
          this.loadMetaSetClass();
        }
      },
      error => {
        let result = error.json();
        this.msgs = [];
        for (let prop in result.message) {
          this.msgs.push({severity: "error", summary: "提示", detail: result.message[prop]});
        }
        this.displaySetClassDialog = false;
      }
    );
  }

  deleteSetClass(){
    this.confirmationService.confirm({
      message: '你确定要删除?',
      accept: () => {
        this.metaSetClassService.deleteMetaSetClass(this.selectedMetaSetClass.data).subscribe(
          response => {
            if (response.status == 200) {
              this.msgs = [];
              this.msgs.push({severity: "success", summary: "提示", detail: "删除成功"});
              this.loadMetaSetClass()
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
  onHide(event){
    this.metasetclassForm.controls["setcode"].enable();
  }
  cancel(){
    this.displaySetClassDialog=false;
  }
 //--------------------------------------------------------------------------------------------------------------------
  saveMetaSetDescribes(){
    if (this.selectMetaSetDescribes.length==0){
      this.msgs = [];
      this.msgs.push({severity: "error", summary: "提示", detail: "请至少选择一条数据进行修改"});
      return;
    }
    let msc=new MetaSetClass();
    msc.id=this.selectNode;
    for (let mdds of this.selectMetaSetDescribes) {
      mdds.metaSetClass=msc;
    }
    console.log(this.selectMetaSetDescribes);
    this.metaSetClassService.postMetaSetDescribes(this.selectMetaSetDescribes).subscribe(
      response => {
        if (response.status == 200) {
          this.selectMetaSetDescribes=null;
          this.msgs = [];
          this.msgs.push({severity: "success", summary: "提示", detail: "修改成功"});
          //重新加载表格
          this.metaSetClassService.getMetaSetDescribes(this.selectNode).subscribe(response => {
            this.metaSetDescribes = response.json();
          });

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

  deleteMetaDetails(){
    if (this.selectMetaSetDescribes.length==0){
      this.msgs = [];
      this.msgs.push({severity: "error", summary: "提示", detail: "请至少选择一条数据进行删除"});
      return;
    }
    this.confirmationService.confirm({
      message: '你确定要删除?',
      accept: () => {
        this.metaSetClassService.deleteMetaSetDescribes(this.selectMetaSetDescribes).subscribe(
          response => {
            if (response.status == 200) {
              this.selectMetaSetDescribes=null;
              this.msgs = [];
              this.msgs.push({severity: "success", summary: "提示", detail: "删除成功"});
              //重新加载表格
              this.selectMetaSetDescribes=null;
              this.metaSetClassService.getMetaSetDescribes(this.selectNode).subscribe(response => {
                this.metaSetDescribes = response.json();
              });

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
  //--------------------------------------------------------------------------------------------------------------
  //加载元数据树父节点
  loadMetadataClassTree(){
    this.metadatatree=[];
    this.metadatservice.getRoot().subscribe(response => {
      let result: Array<any> = response.json();
      for (let o of result) {
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

  //点击加载元数据树子节点
  onNodeExpandMetaDataClass(event){
    event.node.children = [];
    this.metadatservice.getChildrens(event.node.data).subscribe(response => {
      let result: Array<any> = response.json();
      for (let o of result) {
        event.node.children.push({
          label: o.typename,
          data: o.id,
          expandedIcon: "fa-folder-open",
          collapsedIcon: "fa-file-word-o",
          leaf: true
        })
      }
    });
    this.selectedMetadataClass=null;
  }
  //选中元数据树子节点
  onNodeMetaDataClassSelect(event){
    if(!event.node.leaf){
      this.msgs = [];
      this.msgs.push({severity: "error", summary: "提示", detail: "请选择子节点"});
      return;
    }
    this.header="选择元数据";
    this.displayMetaDataDetail=true;
    this.loadDetailTable();

  }

  loadDetailTable() {
    this.selectMetaDataDetails=[];
    this.metadatadetails=[];
    this.metadatservice.getDetails(this.selectedMetadataClass.data).subscribe(response => {
    this.metadatadetails = response.json();
    })
  }

  postMetaDataDetail(){
    if (this.selectNode==null){
      this.msgs = [];
      this.msgs.push({severity: "error", summary: "提示", detail: "请选择数据集"});
      this.displayMetaDataDetail=false;
      return;
    }

    if (this.selectMetaDataDetails.length==0){
      this.msgs = [];
      this.msgs.push({severity: "error", summary: "提示", detail: "请至少选择一条数据进行提交"});
      return;
    }
    this.selectMetaSetDescribes=[];
    let msc=new MetaSetClass();
    msc.id=this.selectNode;
    for (let mdds of this.selectMetaDataDetails) {
      let msd=new MetaSetDescribe();
      msd.metaDataDetail=mdds;
      msd.metaSetClass=msc;
      this.selectMetaSetDescribes.push(msd);
    }
    this.metaSetClassService.postMetaSetDescribes(this.selectMetaSetDescribes).subscribe(
      response => {
        if (response.status == 200) {
          this.selectMetaSetDescribes=null;
          this.msgs = [];
          this.msgs.push({severity: "success", summary: "提示", detail: "修改成功"});
          //重新加载表格
          this.metaSetClassService.getMetaSetDescribes(this.selectNode).subscribe(response => {
            this.metaSetDescribes = response.json();
          });
          this.displayMetaDataDetail=false;
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

  onSetsearchconditon(){
    if(this.searchsettreeconditon==null||this.searchsettreeconditon==""||this.searchsettreeconditon==undefined ){
      this.loadMetaSetClass();
      return;
    }
    this.metaSetClassService.getSetTreeByCondition(this.searchsettreeconditon).subscribe(
      response => {
        if (response.status == 200) {
          let result = response.json();
          this.metaSetClassTree=[];
          for (let o of result) {
            let child: TreeNode[] = [];
            for (let children of o.childrens) {
              child.push({
                label: children.setname,
                data: children.id,
                icon: "fa-file-word-o",
              });
            }
            this.metaSetClassTree.push({
              label: o.setname,
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
