import {URLSearchParams} from "@angular/http";

export class Params extends URLSearchParams {
  pageIndex: number = 1;
  pageSize: number = 10;
  totalRecords: number;

  constructor() {
    super();
    this.set("pageIndex", String(this.pageIndex));
    this.set("pageSize", String(this.pageSize));
  }

  setPageIndex(value: number) {
    this.pageIndex = value;
    this.set("pageIndex", String(this.pageIndex));
  }

  setPageSize(value: number) {
    this.pageSize = value;
    this.set("pageSize", String(this.pageSize));
  }

  reSetPageIndex() {
    this.pageIndex = 1;
    this.set("pageIndex", String(this.pageIndex));
  }

}
