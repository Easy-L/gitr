export class NodeTable {

  /**
   * 记录ID
   */
  id:string;
  /**
   * 数据库节点ID
   */
  parent;
  /**
   * 表名
   */
  tablecode:string;
  /**
   * 表描述
   */
  tabledesc:string;
  /**
   * 备注
   */
  remark:string;
  /**
   * 创建人
   */
  creator:string;
  /**
   * 创建时间
   */
  createTime?:any;
  /**
   * 最后修改人
   */
  modifor:string;
  /**
   * 最后修改时间
   */
  modifyTime?:any;;
}
