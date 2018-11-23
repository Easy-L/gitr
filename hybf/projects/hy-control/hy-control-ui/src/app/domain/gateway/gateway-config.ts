import {NodeTable} from "./node-table";
import {NodeDb} from "./node-db";

export class GatewayConfig {

  fromdb:NodeDb=new NodeDb();
  todb:NodeDb=new NodeDb();
  configname:string;
  selectnodetables:string[]=[];
  count:number;
}
