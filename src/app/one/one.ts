import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { AppValues, Errors } from '../app';

@Component({
  selector: 'app-one',
  imports: [],
  templateUrl: './one.html',
  styleUrl: './one.css'
})
export class One {
  @Input() appValues: AppValues = {};
  @Output() next = new EventEmitter<AppValues>();
  @Output() hasErrors = new EventEmitter<Errors>();

  onAddQuestion(question: string) {
    const appValues = this.appValues;
    if (question.trim() === '') {
      this.hasErrors.emit({
        show: true,
        message: 'Question cannot be empty.'
      });
      return;
    }
    appValues.question = question;
    appValues.visiblePanel = 'two';

    console.log('Question added:', question);
    console.log('Updated appValues:', appValues);

    this.next.emit(appValues);
  }
}
