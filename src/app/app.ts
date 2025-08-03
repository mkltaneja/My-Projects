import { CommonModule } from '@angular/common';
import { Component, signal, OnInit } from '@angular/core';
import answersValue from './utils/answers.json'
import { One } from './one/one';
import { Two } from './two/two';
import { Three } from './three/three';

export interface AppValues {
  visiblePanel?: string;
  question?: string;
  mode?: boolean;
  answers?: string[];
  custom?: string[];
  answer?: string | null;
}

export interface Errors {
  show: boolean;
  message: string | null;
}

@Component({
  selector: 'app-root',
  imports: [One, Two, Three, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('decideapp');

  appValues: AppValues = {
    visiblePanel: 'one',
    question: '',
    mode: false,
    answers: answersValue.answers,
    custom: [],
    answer: null,
  };

  errors: Errors = {
    show: false,
    message: null,
  }

  ngOnInit() {
    console.log('answersValue:', answersValue.answers);
  }

  handleNext(event: AppValues) {
    this.appValues = event;
    console.log('App values updated:', this.appValues);
  }

  handleErrors(values: Errors) {
    const errorsCopy = this.errors;
    this.errors = {
      show: values.show,
      message: values.message
    };
    setTimeout(() => {
      this.errors = errorsCopy;
    }, 2000);
  }

  handleResetValues(reset: boolean) {
    if (reset) {
      let appValuesCopy = this.appValues;
      appValuesCopy = {
        ...this.appValues,
        visiblePanel: 'one',
        question: '',
        mode: false,
        custom: [],
        answer: null,
      }
      this.appValues = appValuesCopy;
      // this.next.emit(appValuesCopy);
      console.log('Starting over, reset appValues:', appValuesCopy);
    }
  }
}
