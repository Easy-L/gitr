import {Component, OnInit} from '@angular/core';
import {LazyLoadEvent, Message, SelectItem} from "primeng/api";
import {Params} from "../../common/params";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Basedatadescribe} from "../../domain/basedatadescribe";
import {Basedatainfo} from "../../domain/basedatainfo";
import {BasedatadescribeService} from "../../service/basedatadescribe.service";
import {DataTable, DataTableModule} from "primeng/primeng";
import {doesIntersect} from "tslint";
import {forEach} from "@angular/router/src/utils/collection";
import {Metasettype} from "../../domain/metasettype";

@Component({
  selector: 'app-code',
  templateUrl: './basedatadescribe.component.html',
  styleUrls: ['./basedatadescribe.component.css']
})
export class BasedatadescribeComponent implements OnInit {

  msgs: Message[];

  items: SelectItem[];

  select: string = '';

  selectBasedatadescribe: Basedatadescribe;
  selectBasedatainfo: Basedatainfo;
  basedatadescribes: Array<Basedatadescribe>;
  basedatainfos: Array<Basedatainfo>;

  basedatadescribeTemp: Basedatadescribe = new Basedatadescribe();

  params = new Params();
  params2 = new Params();

  displayDialog = false;
  header = '新增';
  basedatadescribeForm: FormGroup;
  //
  infoDisplayDialog = false;
  //
  title = '新增';
  //
  basedataInfoForm: FormGroup;
  //
  basedataInfoTemp: Basedatainfo = new Basedatainfo();

  appCodeItems: SelectItem[];


  constructor(private service: BasedatadescribeService, private fb: FormBuilder,private dataTable:DataTableModule) {
    this.items = [
      {label: '全部', value: ''},
      {label: '测试1', value: '402883796275e21d016275e23b820000'},
      {label: '测试2', value: '402883796275e21d016275e23c350001'},
      {label: 'test', value: '402883796275e21d016275e23b820000'}
    ];
    this.appCodeItems = [{label: '请选择代码', value: ''}, {label: '管控中心', value: 'pc'}];
  }

  ngOnInit() {
    this.params.setPageSize(30);
    this.params2.setPageSize(10);
    this.basedatadescribeForm = this.fb.group({
      'id': new FormControl(),
      'appCode': new FormControl(),
      'basedataCode': new FormControl('', Validators.required),
      'basedataName': new FormControl('', Validators.required),
      'standardsystem': new FormControl(),
      'standardcode': new FormControl(),
      'describe': new FormControl()
    });

    this.basedataInfoForm = this.fb.group({
      'id': new FormControl(),
      'itemCode': new FormControl('', Validators.required),
      'itemName': new FormControl('', Validators.required),
      'itemPym': new FormControl()
    });
  }

  loadLazy(event: LazyLoadEvent): void {
    this.params.setPageIndex((event.first + this.params.pageSize) / this.params.pageSize);
    this.loadData();
  }

  onChange(event) {
    this.params.set("metaSetTypeId", this.select);
    this.loadData();
  }

  // onAppCodeChange(){
  //   this.basedatadescribeTemp.appCode=this.appCodeSelect;
  // }

  onRowSelect(event) {
    this.basedatainfos = this.selectBasedatadescribe.baseDataInfos;
  }

  onRowSelect2(event) {
  }

  loadData() {
    this.service.list(this.params).subscribe(
      response => {
        let result = response.json();
        this.params.totalRecords = result["page"].totalElements;
        this.basedatadescribes = result["page"]["content"];
      }
    );
  }

  dialog(flag: boolean) {
    if (flag) {
      if (this.selectBasedatadescribe == null) {
        this.msgs = [];
        this.msgs.push({severity: "error", summary: "提示", detail: "请选择数据"});
        return;
      }
      this.header = '编辑';
      this.basedatadescribeTemp = this.selectBasedatadescribe
      this.selectBasedatadescribe = null;
    } else {
      this.basedatadescribeTemp = new Basedatadescribe();
    }
    this.displayDialog = true;
  }

  cancel() {
    this.displayDialog = false
  }

  save() {
    console.log(this.basedatadescribeTemp);
    this.service.put(this.basedatadescribeTemp).subscribe(
      response => {
        if (response.status == 200) {
          this.msgs = [];
          this.msgs.push({severity: "success", summary: "提示", detail: "保存成功"});
          this.loadData();
          this.basedatainfos = null;
          this.displayDialog = false;
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

  delete() {
    this.service.delete(this.selectBasedatadescribe.id).subscribe(
      response => {
        if (response.status == 200) {
          this.msgs = [];
          this.msgs.push({severity: "success", summary: "提示", detail: "删除成功"});
          this.loadData();
          this.basedatainfos = null;
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

  //字典item 相关
  //字典条目 弹窗
  itemDialog(flag: boolean) {
    if (flag) {
      if (this.selectBasedatainfo == null) {
        this.msgs = [];
        this.msgs.push({severity: "error", summary: "提示", detail: "请选择编辑的条目"});
        return;
      }
      this.header = '编辑';
      this.basedataInfoTemp = this.selectBasedatainfo;
      this.selectBasedatainfo = null;
    } else {
      if (this.selectBasedatadescribe == null) {
        this.msgs.push({severity: "error", summary: "提示", detail: "请选择数据字典分类"});
        return;
      }
      this.basedataInfoTemp = new Basedatainfo();
    }
    this.infoDisplayDialog = true;
  }


  //删除条目
  deleteItem() {
    this.service.deleteItem(this.selectBasedatainfo.id).subscribe(
      response => {
        if (response.status != 200) return;
        //获取删除行索引

        let pIndex = this.basedatainfos.indexOf(this.selectBasedatainfo);
        //删除前台页面model记录

        this.basedatainfos.splice(pIndex, 1);

        let tempDataTable: Array<Basedatainfo>=new Array<Basedatainfo>();

        for(let i=0;i<this.basedatainfos.length;i++){
          tempDataTable.push(this.basedatainfos[i]);
        }

        this.basedatainfos=tempDataTable;

        this.msgs = [];
        this.msgs.push({severity: "success", summary: "提示", detail: "删除成功"});
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

  cancelInfo() {
    this.infoDisplayDialog = false
  }

  saveInfo() {
    this.selectBasedatadescribe.baseDataInfos[0] = this.basedataInfoTemp;

    this.service.put(this.selectBasedatadescribe).subscribe(
      response => {
        if (response.status == 200) {
          this.msgs = [];
          //this.selectBasedatadescribe.baseDataInfos.splice(0,1);
          this.loadData();
          this.msgs.push({severity: "success", summary: "提示", detail: "保存成功"});
          this.infoDisplayDialog = false;
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
