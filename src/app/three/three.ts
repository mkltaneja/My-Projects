import { Input, Output, EventEmitter } from '@angular/core';
import { AppValues } from '../app';
import { Component } from '@angular/core';

@Component({
  selector: 'app-three',
  imports: [],
  templateUrl: './three.html',
  styleUrl: './three.css'
})
export class Three {
  @Input() appValues: AppValues = {};
  @Output() next = new EventEmitter<AppValues>();
  @Output() resetValues = new EventEmitter<boolean>();

  ngOnInit() {
    console.log('Three component initialized with appValues:', this.appValues);
    this.showResults();
  }

  showResults(): void {
    const appValuesCopy = { ...this.appValues };
    const answersArray = this.appValues.answers || [];
    const customArray = this.appValues.custom || [];
    let result = '';

    if (this.appValues.mode) {
      result = customArray[Math.floor(Math.random() * customArray.length)] || 'No answers provided';
    } else {
      result = answersArray[Math.floor(Math.random() * answersArray.length)] || 'No answers provided';
    }
    appValuesCopy.answer = result;
    console.log('Randomly selected answer:', result);
    this.next.emit(appValuesCopy);
  }

  doItAgain() {
    this.showResults();
  }

  onStartOver() {
    this.resetValues.emit(true);
  }
}
