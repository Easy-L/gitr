import {Page} from "../common/page";
import {IcdOper} from "./icd-oper";


export class IcdOperHospital extends Page{
  cmid: string;
  cmcode: string;
  cmname: string;
  lb: string;
  operationlevel: string;
  hosplevel: string;
  icdopermatingCondition: string;
  paramschosed: string;
  icdOper: IcdOper;
}
