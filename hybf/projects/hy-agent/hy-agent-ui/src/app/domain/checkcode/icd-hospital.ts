import {Page} from "../../common/page";
import {Icd} from "../icd";

export class IcdHospital extends Page{

  id:string;
  icdcode:string;
  icdname:string;
  typecode:string;
  sexlimit:string;
  efficacylimit:string;  //1国际2中医

  icd:Icd;
  condition:string="notmatch";
}
