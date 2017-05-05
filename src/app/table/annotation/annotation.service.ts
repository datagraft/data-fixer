import {Injectable} from "@angular/core";

@Injectable()
export class AnnotationService {

  public type : String;
  public typeLabel : String;
  public property : String;
  public propertyLabel : String;
  public dataType : String;
  public dataTypeLabel : String;
  public isSubject : boolean = true;
  public colId;

}
