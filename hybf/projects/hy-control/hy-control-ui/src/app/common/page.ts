export class Page {
  maxSize: number = 5;
  itemsPerPage: number = 10;
  totalItems: number;
  currentPage: number = 1;

  firstText: string = "首页";
  lastText: string = "尾页";
  previousText: string = "上一页";
  nextText: string = "下一页";
}
