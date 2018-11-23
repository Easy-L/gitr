import {Basedatainfo} from "./basedatainfo";
import {Metasettype} from "./metasettype";

export class Basedatadescribe {
  id: string;
  appCode: string;
  basedataCode: string;
  basedataName: string;
  standardsystem: string;
  standardcode: string;
  updatetime?;
  describe: string;
  metaSetType: Metasettype;
  baseDataInfos: Array<Basedatainfo>;
}
