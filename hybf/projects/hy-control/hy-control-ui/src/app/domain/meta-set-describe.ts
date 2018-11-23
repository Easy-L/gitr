import {MetaDataDetail} from "./metadatadetail";
import {MetaSetClass} from "./metasetclass";

export class MetaSetDescribe {
  id: string;
  setcode: string;
  metacode: string;
  metadatakey: string;
  dataverfify: string;
  updatetime?;
  vertionctrl: string;
  encrycode: string;
  columncode: string;
  columnname: string;
  metaDataDetail:MetaDataDetail;
  metaSetClass:MetaSetClass;
}
