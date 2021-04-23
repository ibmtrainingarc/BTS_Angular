import { PRIORITY } from "./PRIORITY";
import { SEVERITY } from "./SEVERITY";
import { STATUS } from "./STATUS";
import { TYPE } from "./TYPE";

export class Bug{
  id:String ='';
  name:String = '';
  status:STATUS=STATUS.NEW;
  priority:PRIORITY=PRIORITY.LOW;
  severity:SEVERITY=SEVERITY.LOW;
  type:TYPE=TYPE.FUNCTIONAL;
  submittedOn='';
  eta='';
  module:String='';
  projectId:String='';
  description:String='';
  synopsis:String='';
}
