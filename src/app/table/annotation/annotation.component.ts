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

  constructor(private rdfService: RdfService, public annotationService: AnnotationService, public http: Http) {
    this.annotationService.subjectsChange.subscribe(subjects => {
      this.subjectMarker = 'shade';
      subjects.forEach((value: String) => {
        if (value === this.colName) {
          this.subjectMarker = 'inverse';
        }
      });
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

    // Observable.from(this.annotationService.subjects).subscribe((subject: string[]) => {
    //   console.log(this.colName + ': colname');
    //   console.log(subject);
    //   if (subject.indexOf(this.colName) !== -1) {
    //     console.log('Trovato!!!!');
    //     this.subjectMarker = 'inverse';
    //     this.annotation.isSubject = true;
    //     this.annotationService.setAnnotation(this.colId, this.annotation);
    //   } else if (this.annotationService.getAnnotation(this.colId) &&
    //     this.annotationService.getAnnotation(this.colId).isSubject) {
    //     console.log('Era un soggetto, ora non più');
    //     this.subjectMarker = 'shade';
    //     this.annotation.isSubject = false;
    //     this.annotationService.setAnnotation(this.colId, this.annotation);
    //   }
    // });

    // Observable.from(this.annotationService.subjects).subscribe((subject: string[]) => {
    //   var i = 0;
    //   console.log(this.annotationService.subjects);
    //   console.log(subject);
    //   if(subject[0] != "empty") {
    //     if (!(subject == this.colName)) {
    //       console.log(i + "volte dentro l'Observable");
    //       this.objectMarker = "shade";
    //       this.annotation.isSubject = false;
    //       this.annotationService.setAnnotation(this.colId, this.annotation);
    //       i++;
    //     } else {
    //       console.log(i + "volte dentro l'Observable");
    //       this.objectMarker = "inverse";
    //       this.annotation.isSubject = true;
    //       this.annotationService.setAnnotation(this.colId, this.annotation);
    //       i++;
    //     }
    //   }
    //   else console.log("sono entrato");
    //   })

    // this.annotationService.subjects.subscribe((subject: string[] ) => {
    //   if (!(subject.some((x => x == this.colName)))) {
    //     this.objectMarker = "shade";
    //     this.annotation.isSubject = false;
    //     this.annotationService.setAnnotation(this.colId, this.annotation);
    //   }else{
    //     this.objectMarker = "inverse";
    //     this.annotation.isSubject = true;
    //     this.annotationService.setAnnotation(this.colId, this.annotation);
    //   }
    // })
    // console.log(this.annotation.columnTypeLabel);
    // this.isSubject = annotation.isSubject;
    // this.source = annotation.source;
    // this.sourceLabel = annotation.sourceLabel;
    // this.property = annotation.property;
    // this.propertyLabel = annotation.propertyLabel;
    // this.columnType = annotation.columnType;
    // this.columnTypeLabel = annotation.columnTypeLabel;
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

  saveChangesSmall(colId) {
    // // if(this.validation(this.getInputValue(colId, ".Source"),
    //     this.getInputValue(colId, ".Property"),
    //     this.getInputValue(colId, ".ColumnType"))) {
    this.annotation.index = colId;
    this.annotation.source = this.getInputValue(colId, '.Source');
    this.annotation.property = this.getInputValue(colId, '.Property');
    this.annotation.columnType = this.getInputValue(colId, '.ColumnType');

    if (this.annotation.source !== '' && this.annotation.property !== '' && this.annotation.columnType !== '') {
      this.objectMarker = 'inverse';
      console.log('OBJECT');
    }
    this.annotationService.setAnnotation(this.colId, this.annotation);
  }

  // validation(source, property, columnType){
  //   if(this.listOfSubjects.some((x=> x == source)))
  //     return true;
  //   return false;
  //
  // }

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
    if (dataType === 'URL') {
      this.annotation.columnDataType = dataType;
    } else {
      this.annotation.columnDataType = dataType;
    }
  }

  getInputValue(colId, selector) {
    const temp = (document.querySelectorAll('[data-value]'));
    let i = 0;
    const string = ''.concat(colId, selector);
    while ((<HTMLInputElement> temp[i]).getAttribute('data-value') !== string) {
      i++;
    }
    console.log((<HTMLInputElement> temp[i]).value);
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
}
