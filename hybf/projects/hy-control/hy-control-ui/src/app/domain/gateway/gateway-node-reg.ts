export class GatewayNodeReg {
  nodeId:string;       //节点ID
  name:string;       //节点名
  pid:string;       //上级节点
  address:string;       //节点地址
  ip:string;       //节点IP
  winUser:string;       //操作系统用户名
  winPass:string;       //操作系统密码
  regOper:string;       //注册人
  regDate:any;       //注册日期
  conName:string;       //联系人
  conPhone:string;       //联系人电话
  conEmail:string;       //联系人EMAIL
  conQq:string;       //联系人QQ
  installDriver:string;       //安装盘符
  jmsIp:string;       //JMS服务器IP
  jmsPort:number;       //JMS服务器端口
  jmsUsername:string;       //JMS用户名
  jmsPassword:string;       //JMS密码
  intallor:string;       //安装人
  installDate:any;       //安装日期
  versions:string;       //节点应用版本
  remark:string;       //备注
  creator:string;       //创建人
  createTime:any;       //创建日期
  modifor:string;       //最后修改人
  childrens:Array<GatewayNodeReg>;
  reportEmailList;   //
}
