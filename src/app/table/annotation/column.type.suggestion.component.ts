import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AnnotationService} from "./annotation.service";


@Component({
  selector: 'columnTypeSuggestion',
  templateUrl: './column.type.suggestion.component.html',
  //styleUrls: ['./annotation.component.css'],
  providers: []
})

export class ColumnTypeSuggestion implements OnInit, OnDestroy {

  @Output() suggestionOutput: EventEmitter<string[]> = new EventEmitter<string[]>();
  public typeSuggestion = [];
  public columnType;

  constructor(private typeEl: ElementRef, private annotationService: AnnotationService) {
  }

  ngOnInit() {
    Observable.fromEvent(this.typeEl.nativeElement, 'keyup')
      .map((e: any) => e.target.value)
      .filter((text: string) => text.length > 1)
      .debounceTime(250)
      .map((query: string) => this.annotationService.abstatAutofill(query, 'subj', 100, 0))
      .do(() => console.log('qualcosa'))
      .switch().subscribe(
      (res: string[]) => {
        this.suggestionOutput.next(res);
        console.log(this.suggestionOutput);

      },
      (err: any) => {
        console.log(err);
      },
      () => {
        console.log('boh');
      }
    );

  }

  ngOnDestroy() {
  }


}
