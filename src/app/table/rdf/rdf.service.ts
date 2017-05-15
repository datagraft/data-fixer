import { Injectable } from '@angular/core';

@Injectable()
export class RdfService {

  public type : String[] = ["abc"];
  public typeLabel : String[];
  public property : String[];
  public propertyLabel : String[];
  public dataType : String[];
  public dataTypeLabel : String[];
  public isSubject : Boolean[];

  constructor() { }

}
