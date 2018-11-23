import {Component, OnInit} from '@angular/core';
import {LazyLoadEvent, Message} from "primeng/api";
import {Params} from "../../common/params";
import {ModifytableinfoexceptionService} from "../../service/modifytableinfoexception.service";
import {Modifytableinfoexception} from "../../domain/modifytableinfoexception";

@Component({
  selector: 'app-modifytableinfoexception',
  templateUrl: './modifytableinfoexception.component.html',
  styleUrls: ['./modifytableinfoexception.component.css']
})
export class ModifytableinfoexceptionComponent implements OnInit {
  msgs: Message[];
  params = new Params();
  searchconditonip:string;
  modifytableinfoexception: Modifytableinfoexception = new Modifytableinfoexception();
  modifytableinfoexceptions: Array<Modifytableinfoexception>;

  constructor(private service: ModifytableinfoexceptionService) {
  }

  ngOnInit() {
    // this.params.setPageSize(20);
  }

  searchlistbycondition(){
    this.loadLazy(null);
  }
  loadLazy(event: LazyLoadEvent): void {
    if(event){
      this.modifytableinfoexception.setPageSize(event.rows);
      this.modifytableinfoexception.setPageIndex((event.first + event.rows) / event.rows);
    }else{
      this.modifytableinfoexception.setPageSize(10);
      this.modifytableinfoexception.setPageIndex(1);
    }
    this.modifytableinfoexception.set("ip",this.searchconditonip);
    this.loadData();
  }

  loadData() {
    this.service.list(this.modifytableinfoexception).subscribe(
      response => {
        let result = response.json();
        this.params.totalRecords = result["totalElements"];
        this.modifytableinfoexceptions = result["content"];
      }
    );
  }

}
