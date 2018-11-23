import {Basedatadescribe} from "./basedatadescribe";
import {Page} from "../common/page";

export class Basedatainfo extends Page{
  id: string;
  itemCode: string;
  itemName: string;
  itemPym: string;
  basedatadescribe:Basedatadescribe;
  updatetime?;

}
