export class MetaSetClass {
  id:string;
  setcode:string;//
  setname:string;//数据集分类名称
  settype:string;//数据集类型0内部数据集1公共数据集   setcode settype 联合唯一
  setuse:string;//数据集用途0存储,1交互,2存储与交互
  setorder:number;//序号
  setlevel:number;//数据集级别
  memo:string;     //
  vertionctrl:string;//受控状态 - 0-不受控 1-受控
  typecode:string;//数据集归属类别 ehr 健康档案 emr 电子病历 bi 数据仓库 pub 公共 other 其他
  useflag:string;//启用标志 0-停用 1-启用
  systemcode:string;//
  encrytype:number;//是否加密交换 0-不加密 1-加密
  tablename:string;//表名
  primarykey:string;//主键
  parentid:string;
}
