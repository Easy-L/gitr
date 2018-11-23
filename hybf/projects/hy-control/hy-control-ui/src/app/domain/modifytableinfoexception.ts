import {Params} from "../common/params";

export class Modifytableinfoexception extends Params{
  id: string;
  ip: string;
  port: string;
  dbType: string;
  accessType: string;
  dbName: string;
  modifySql: string;
  exceptionDetail: string;
  createTime: string;
}
