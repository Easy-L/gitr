export class TableDataDetail {
  id:string;
  managerTabledataClassId:string;
  metaCode:string;//标识符
  fieldName:string;//
  metaName:string;//标识符名称
  symbolCode:string;//数据类型
  dataformat:string;//表示格式
  primaryKey:string;//是否主键
  required:string;//是否必填
  foreignKey:string;//是否外键
  foreignTableName:string;// 关联外键表
  foreignColumnName:string;//关联外键列
  selfDefinedRule:string;//自定义规则
  pym:string;//拼音码
  wbm:string;//五笔码
  standardCode:string;//标准编码
  dataSource:string;//数据来源说明
  updateTime?;//更新时间
}
