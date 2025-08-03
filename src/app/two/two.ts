import { NgFor } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppValues, Errors } from '../app';

@Component({
  selector: 'app-two',
  imports: [NgFor],
  templateUrl: './two.html',
  styleUrl: './two.css'
})
export class Two {
  @Input() appValues: AppValues = {};
  @Output() next = new EventEmitter<AppValues>();
  @Output() hasErrors = new EventEmitter<Errors>();

  ngOnInit() {
    console.log('Two component initialized with appValues:', this.appValues);
  }

  onAddAnswer(answerElement: HTMLInputElement) {
    const answer = answerElement.value;
    if (answer.trim() === '') {
      console.error('Answer cannot be empty.');
      this.hasErrors.emit({
        show: true,
        message: 'Answer cannot be empty.'
      })
      return;
    }
    const appValues = this.appValues;
    appValues.answers = [...(appValues.answers || []), answer];
    appValues.answer = answer;
    this.next.emit(appValues);
    answerElement.value = '';

    console.log('Answer added:', answer);
    console.log('Updated appValues:', appValues);
  }

  onSubmit() {
    if (!this.appValues.answers || this.appValues.answers.length === 0) {
      console.error('No answers provided.');
      this.hasErrors.emit({
        show: true,
        message: 'Please add at least one answer.'
      });
      return;
    }
    const appValues = this.appValues;
    appValues.visiblePanel = 'three';
    this.next.emit(appValues);
    console.log('Submitting answers:', this.appValues.answers);
    // Logic to handle submission can be added here
  }



  changeMode() {
    const appValuesCopy = { ...this.appValues };
    appValuesCopy.mode = true;
    this.next.emit(appValuesCopy);
    console.log('Mode changed:', this.appValues.mode);
  }

  getResults() {
    if (this.validateResults()) {
      const appValuesCopy = { ...this.appValues };
      appValuesCopy.visiblePanel = 'three';
      this.next.emit(appValuesCopy);
      console.log('Results are valid, proceeding to next panel:', appValuesCopy);
    } else {
      this.hasErrors.emit({
        show: true,
        message: 'Please add at least two custom answers.'
      });
      console.log('Custom mode validation failed:', this.appValues.custom);
    }
  }

  validateResults(): boolean {
    if (this.appValues.mode) {
      if ((this.appValues.custom?.length ?? 0) > 1) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  }

  addCustom(customAnswer: HTMLInputElement): void {
    if (customAnswer && customAnswer.value.trim() !== '') {
      const appValuesCopy = { ...this.appValues };
      appValuesCopy.custom = appValuesCopy.custom || [];
      appValuesCopy.custom.push(customAnswer.value.trim());
      customAnswer.value = ''; // Clear the input field after adding
      this.next.emit(appValuesCopy);
      console.log('Custom answer added:', appValuesCopy.custom);
    } else {
      this.hasErrors.emit({
        show: true,
        message: 'Custom answer cannot be empty.'
      });
    }
  }
}
