import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http"

export class Annotation {
  set index(value: number) {
    this._index = value;
  }

  set type(value: String) {
    this._type = value;
  }

  set typeLabel(value: String) {
    this._typeLabel = value;
  }

  set property(value: String) {
    this._property = value;
  }

  set propertyLabel(value: String) {
    this._propertyLabel = value;
  }

  set dataType(value: String) {
    this._dataType = value;
  }

  set dataTypeLabel(value: String) {
    this._dataTypeLabel = value;
  }

  set isSubject(value: Boolean) {
    this._isSubject = value;
  }

  set header(value: String) {
    this._header = value;
  }
  get index(): number {
    return this._index;
  }

  get type(): String {
    return this._type;
  }

  get typeLabel(): String {
    return this._typeLabel;
  }

  get property(): String {
    return this._property;
  }

  get propertyLabel(): String {
    return this._propertyLabel;
  }

  get dataType(): String {
    return this._dataType;
  }

  get dataTypeLabel(): String {
    return this._dataTypeLabel;
  }

  get isSubject(): Boolean {
    return this._isSubject;
  }

  get header(): String {
    return this._header;
  }
  private _index : number;
  private _type : String;
  private _typeLabel : String;
  private _property : String;
  private _propertyLabel : String;
  private _dataType : String;
  private _dataTypeLabel : String;
  private _isSubject : Boolean;
  private _header : String;

  constructor(obj?: any) {
    this._index = obj != null && obj.index != null ? obj.index : -1;
    this._type = obj && obj.type || "";
    this._typeLabel = obj && obj.typeLabel || "";
    this._property = obj && obj.property || "";
    this._propertyLabel = obj && obj.propertyLabel || "";
    this._dataType = obj && obj.dataType || "";
    this._dataTypeLabel = obj && obj.dataTypeLabel || "";
    this._isSubject = false;
    this._header = obj && obj.header || "";
  }
}

@Injectable()
export class AnnotationService {



  private annotations

  public colContent;
  public header;
  public colNum;
  public data;

  public isFull = false;

  constructor(public http : Http) {

  };

  init(){
    this.annotations = new Array();
  }

  //call the remote service that try to annotate the table, after that map the results in the arrays into annotationService
  getRemoteResponse(){
    this.http.request('http://localhost:3000/response').subscribe((res :Response) => {
      let response = res.json();
      //get annotation from remote service
      //first get annotation of named entity columns
      //after get annotation of literal columns
      //in the end (it doesn't even matter) sort annotation through the id
      this.annotations = response.neCols.map((obj: Object) => { return new Annotation(obj)});
      let b = response.litCols.map((obj: Object) => { return new Annotation(obj)});

      this.annotations = this.annotations.concat(b);
        this.annotations.sort(function(a, b){
          if(a.index < b.index) return -1;
          if(a.index > b.index) return 1;
          return 0;
        });
      },
    (err : any) => {

    });
    this.isFull = true;
  }

  setAnnotation(colId, annotation : Annotation){
    this.annotations[colId] = annotation;
  }
  getAnnotation(colId): Annotation {
    return this.annotations[colId];
  }

  getHeader() {
    return this.header;
  }

  /*AbstatAutofill(word){
    let autofill = "";
    this.http.request('').subscribe((res :Response) => {
      this.autofill = res;
    });
    return autofill;
  }*/

  AbstatDomain(type,property,object){}

}
