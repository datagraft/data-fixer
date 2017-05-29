import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http"

export class Annotation {
  index : number;
  type : String;
  typeLabel : String;
  property : String;
  propertyLabel : String;
  dataType : String;
  dataTypeLabel : String;
  isSubject : Boolean;
  header : String;

  constructor(obj?: any) {
    this.index = obj != null && obj.index != null ? obj.index : -1;
    this.type = obj && obj.type || "";
    this.typeLabel = obj && obj.typeLabel || "";
    this.property = obj && obj.property || "";
    this.propertyLabel = obj && obj.propertyLabel || "";
    this.dataType = obj && obj.dataType || "";
    this.dataTypeLabel = obj && obj.dataTypeLabel || "";
    this.isSubject = false;
    this.header = obj && obj.header || "";
  }
}

@Injectable()
export class AnnotationService {



  public annotations : Annotation[];

  public col : any[];
  public header;
  public colNum;
  public data;

  constructor(public http : Http) { };

  //call the remote service that try to annotate the table, after that map the results in the arrays into annotationService
  getRemoteResponse(){
    this.http.request('http://localhost:3000/response').subscribe((res :Response) => {
      let response = res.json();
      let a = response.neCols.map((obj: Object) => { return new Annotation(obj)});
      let b = response.litCols.map((obj: Object) => { return new Annotation(obj)});

      a = a.concat(b);
        a.sort(function(a, b){
          if(a.index < b.index) return -1;
          if(a.index > b.index) return 1;
          return 0;
        });
        console.log(a);
      },
    (err : any) => {
      console.log(err);
    });
  }
}
