import {Page} from "../../common/page";
import {Medic} from "../medic";

export class MedicHospital extends Page{
  mediid:string;

  medicode:string;
  mediname:string;
  goodsname:string;
  approvenum:string;
  productenterprisename:string;
  productenterprisecode:string;
  discrepancy_remark:string;
  std:string;
  medipackingunit:string;

  medic:Medic;
  condition:string="notmatch";
}
