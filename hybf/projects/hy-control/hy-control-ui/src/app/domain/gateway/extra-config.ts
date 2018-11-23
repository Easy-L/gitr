export class ExtraConfig {

  id:string;
  configname:string;
  extraNumber:number=2000;
  descripe:string;
  configDate:any;
  fromdb:string;
  todb:string;
  fromdbid:string;
  todbid:string;
  childs:Array<any>=[];

  pageIndex:number=1;
  pageSize:number=20;
}
