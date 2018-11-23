import {Basedatainfo} from "./basedatainfo";
import {Metasettype} from "./metasettype";
import {Page} from "../common/page";

export class Basedatadescribe extends Page{
  id: string;
  appCode: string;
  basedataCode: string;
  basedataName: string;
  standardsystem: string;
  standardcode: string;
  updatetime?;
  describe: string;
  date:string;
  metaSetType: Metasettype;
  baseDataInfos: Array<Basedatainfo>;
}
