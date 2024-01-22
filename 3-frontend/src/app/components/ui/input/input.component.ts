// input.component.ts
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input.component.html',
})



export class InputComponent {


  @Input() control: FormControl = new FormControl()

  @Input() _label?: string;
  @Input() _note?: string;
  @Input() _name?: string;
  @Input() _error?: string;
  @Input() _variant: 'normal' | 'solid' | 'outline' = 'normal';
  @Input() _dimension: 'small' | 'medium' | 'big' = 'medium';
  @Input() _shadow = false;
  @Input() _type = 'text';
  @Input() _inputClassName?: string;
  @Input() _disabled = false;
  @Input() _showLabel = true;

  @Input() _value?: string;

  classes = {
    root: 'px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
    normal:
      'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
    solid:
      'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
    outline: 'border border-border-base focus:border-accent',
    shadow: 'focus:shadow',
  };

  sizeClasses = {
    small: 'text-sm h-10',
    medium: 'h-12',
    big: 'h-14',
  };

  rootClassName = this.getRootClassName()

  numberDisable = this._type === 'number' && this._disabled ? 'number-disable' : '';



  // Update the class input binding to include 'has-error' class when there's an error
  @Input() class?: string =  ""
  
  allInputClasses = `${this.rootClassName} ${this._disabled
    ? `cursor-not-allowed border-[#D4D8DD] bg-[#EEF1F4] ${this.numberDisable} select-none`
    : ''
    } ${this._error ? 'border-red-500 border-1' : ''}`;




  getRootClassName(): string {
    let rootClasses = this.classes.root;

    if (this._variant === 'normal') {
      rootClasses += ' ' + this.classes.normal;
    } else if (this._variant === 'solid') {
      rootClasses += ' ' + this.classes.solid;
    } else if (this._variant === 'outline') {
      rootClasses += ' ' + this.classes.outline;
    }

    if (this._shadow) {
      rootClasses += ' ' + this.classes.shadow;
    }

    rootClasses += ' ' + this.sizeClasses[this._dimension];

    if (this._inputClassName) {
      rootClasses += ' ' + this._inputClassName;
    }

    return rootClasses;
  }

}