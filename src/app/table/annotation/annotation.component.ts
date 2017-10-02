import {
  Component, OnInit, ViewChild, Input, Output, EventEmitter,
  OnDestroy, AfterContentChecked, AfterViewChecked, ElementRef
} from '@angular/core';
import {ChartComponent} from '../../chart/chart.component';
import {RdfComponent} from '../rdf/rdf.component';
import {DetailModeComponent} from './detailMode.component';
import {Router, RouterModule} from '@angular/router';
import {Http, Response} from '@angular/http';
import {SharedTableService} from '../shared.service';
import {ProfilingService} from '../tabular/profiling.service';
import {TransformationsService} from '../tabular/transformations.service';
import {TabularComponent} from '../tabular/tabular.component';
import {Annotation, AnnotationService} from './annotation.service';
import {RdfService} from '../rdf/rdf.service';
import {forEach} from '@angular/router/src/utils/collection';
import {isUndefined} from 'util';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';


@Component({
  selector: 'annotation-form',
  templateUrl: './annotation.component.html',
  // styleUrls: ['./annotation.component.css'],
  providers: [ChartComponent, RdfComponent, SharedTableService, ProfilingService, TransformationsService, TabularComponent,
    RouterModule]
})

export class AnnotationForm implements OnInit, OnDestroy {

  @ViewChild(DetailModeComponent) detailMode: DetailModeComponent;

  @Input() colId: number;
  @Input() colContent: any[];
  @Input() header: any;

  objectMarker = 'shade';
  subjectMarker = 'shade';
  myData = 'primo';
  open = false;
  isSubject = false;

  public annotation: Annotation;
  // public source: String;
  // public sourceLabel: String;
  // public property: String;
  // public propertyLabel: String\;
  // public columnType: String;
  // public columnTypeLabel: String;
  // public isSubject: Boolean;
  public first = false;
  typeSuggestions = 'http://abstat.disco.unimib.it/api/v1/SolrSuggestions?query=:keyword,subj&rows=15&start=0';
  propertySuggestions = 'http://abstat.disco.unimib.it/api/v1/SolrSuggestions?query=:keyword,pred&rows=15&start=0';
  listOfSubjects: string[] = [];
  colName;
  private annotated : boolean = false;
  private hasSourcePropertyError: boolean = false;
  private sourcePropertyError: string = "Both property and source must be filled";
  private hasColumnTypeError: boolean = false;
  private columnTypeError: string = "Column type is required";
  private hasUrlLiteralError: boolean = false;
  private urlLiteralError: string = "A column values type must be chosen";
  private hasSubjectError: boolean = false;
  private subjectErrorBase : string = "Column values type must be an URL because is the source column of columns: ";
  private subjectError : string = "";
  private hasSourceError : boolean;
  private sourceError : string = "Insert a valid source column"

  urlREGEX = '(ftp|http|https):\/\/[^ "]+$';
  urlREGEX2 : RegExp =new RegExp( '/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/');



  constructor(private rdfService: RdfService, public annotationService: AnnotationService, public http: Http) {
    this.annotationService.subjectsChange.subscribe(subjects => {
      this.subjectMarker = 'shade';
      this.annotation.isSubject = false;
      let i = 0;
      let subjectsLabel = [];
      subjects.forEach((value: String) => {
        if (value === this.colName) {
          this.subjectMarker = 'inverse';
          this.annotation.isSubject = true;
          if(this.annotation.columnDataType !== "URL"){
            console.log(this.annotation.columnDataType);
            this.hasSubjectError = true;
            subjectsLabel.push(i);
          }
        }
        i++;
      });
      this.subjectError = this.subjectErrorBase + subjectsLabel.join(", ");
    });
  }

  ngOnInit() {
    this.annotation = new Annotation();
    this.colName = this.colId.toString().concat(': ', this.header);
    if (this.annotationService.isFull) {
      console.log('is full');
      this.annotation = this.annotationService.getAnnotation(this.colId);
    }
    this.getSubjects();
    console.log(this.annotation.columnDataType);
  }

  ngOnDestroy() {
    console.log('destroy annotation form');
    this.annotationService.setAnnotation(this.colId, this.annotation);
    this.annotationService.isFull = true;
    //   this.annotationService.isSubject[this.colId] = this.isSubject;
    //   this.annotationService.source[this.colId] = this.source;
    //   this.annotationService.sourceLabel[this.colId] = this.sourceLabel
    //   this.annotationService.property[this.colId] = this.property;
    //   this.annotationService.propertyLabel[this.colId] = this.propertyLabel;
    //   this.annotationService.columnType[this.colId] = this.columnType;
    //   this.annotationService.columnTypeLabel[this.colId] = this.columnTypeLabel;
    //
  }

  // dataTypeURL() {
  //   this.columnType = "URL";
  // }

  // dataTypeLiteral() {
  //   this.columnType = "Literal";
  // }

  validation(source, property, columnType) {
    this.hasColumnTypeError = false;
    this.hasSourcePropertyError = false;
    this.hasUrlLiteralError = false;
    if (columnType == "") {
      this.hasColumnTypeError = true;
    }
    if (this.annotation.columnDataType == "") {
      this.hasUrlLiteralError = true;

    }
    if ((source != "" && property == "") || (source == "" && property != "")) {
      this.hasSourcePropertyError = true;
    }
    return !this.hasUrlLiteralError && !this.hasSourcePropertyError && !this.hasColumnTypeError;
  }

  saveChangesSmall(colId) {
    let source = this.getInputValue(colId, ".Source");
    let property = this.getInputValue(colId, ".Property");
    let columnType = this.getInputValue(colId, ".ColumnType");
    if (this.validation(source, property, columnType)) {
      this.annotation.index = colId;
      this.annotation.source = source;
      this.annotation.property = property;
      this.annotation.columnType = columnType;

      if (this.annotation.source !== '' && this.annotation.property !== '' && this.annotation.columnType !== '') {
        this.objectMarker = 'inverse';
        console.log('OBJECT');
      }
      this.annotated = true;
      this.annotationService.setAnnotation(this.colId, this.annotation);
    }
  }


  goToDetailMode() {
    this.annotationService.colContent = this.colContent;
    this.annotationService.header = this.header;
    this.annotationService.colNum = this.colId;
  }

  subjectSelect(isSubject) {
    if (isSubject == 'O') {
      this.annotation.isSubject = false;
    } else {
      this.annotation.isSubject = true;
    }
  }

  dataTypeSelect(dataType) {
    this.annotation.columnDataType = dataType;
    this.annotated = false;
  }

  getInputValue(colId, selector) {
    const temp = (document.querySelectorAll('[data-value]'));
    let i = 0;
    const string = ''.concat(colId, selector);
    while ((<HTMLInputElement> temp[i]).getAttribute('data-value') !== string) {
      i++;
    }
    return (<HTMLInputElement> temp[i]).value;
  }

  // typeAutocomplete() {
  //   // console.log("dentro");
  //   let word = this.getInputValue(this.colId, ".ColumnType");
  //   console.log(word);
  //   let URL = "http://abstat.disco.unimib.it/api/v1/SolrSuggestions?query=".concat(word, ",subj&rows=100&start=0");
  //
  //   this.http.request(URL).subscribe((res: Response) => {
  //       this.typeSuggestions = res.json();
  //
  //       console.log("Api restituita");
  //       // console.log(this.typeSuggestions);
  //     },
  //     (err: any) => {
  //
  //     });
  //
  //   // this.typeSuggestions = this.annotationService.abstatAutofill(word, "subj", 100, 0);
  //   console.log(this.typeSuggestions);
  // }


  propertyAutocomplete() {
    // console.log("dentro");
    const word = this.getInputValue(this.colId, '.Property');

    this.annotationService.abstatAutofill(word, 'pred', 100, 0).subscribe();

    this.propertySuggestions = this.annotationService.suggestion;
    console.log(this.propertySuggestions);

  }

  getSubjects() {
    this.listOfSubjects = [];
    for (let i = 0; i < this.annotationService.colNames.length; i++) {
      if (this.annotationService.colNames[i] !== this.colName) {
        this.listOfSubjects.push(this.annotationService.colNames[i]);
      }
    }
  }

  subjectValidate(partialSubject){
    if(this.listOfSubjects.indexOf(partialSubject) > -1){
      console.log("false, " + this.listOfSubjects.indexOf(partialSubject));
      this.hasSourceError = false;
    }else{
      this.hasSourceError = true;
      console.log("true, " + this.listOfSubjects.indexOf(partialSubject));
    }
  }
}
