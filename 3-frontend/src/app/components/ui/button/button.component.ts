import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      [attr.aria-pressed]="active"
      [attr.data-variant]="variant"
      [ngClass]="classesName"
      [disabled]="disabled"
    >
      <ng-content  *ngIf="!loading"></ng-content>
      <span
        *ngIf="loading"
        class="h-4 w-4 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin"
        [ngStyle]="{ borderTopColor: variant === 'outline' ? 'currentColor' : '#ffffff' }"
      ></span>
    </button>
  `,
})
export class ButtonComponent {
  @Input() className?: string = "";
  @Input() variant: 'normal' | 'outline' | 'custom' = 'normal';
  @Input() size: 'big' | 'medium' | 'small' = 'medium';
  @Input() active?: boolean;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;



  get classesName(): string {
    let classes = 'w-full inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 ';

    if (this.disabled) {
      classes += 'cursor-not-allowed ';
    }

    if (this.variant === 'outline' && this.disabled) {
      classes += 'text-muted ';
    }


    classes += this.getClassForVariant() + ' ' + this.getClassForSize() + ' ' + (this.className || '');

    return classes.trim();
  }

  getClassForVariant(): string {
    switch (this.variant) {
      case 'normal':
        return 'bg-accent text-light border border-transparent hover:bg-accent-hover';
      case 'custom':
        return 'border border-transparent';
      case 'outline':
        return 'border border-border-400 bg-transparent text-body hover:text-light hover:bg-accent hover:border-accent';
      default:
        return '';
    }
  }

  getClassForSize(): string {
    switch (this.size) {
      case 'small':
        return 'px-3 py-0 h-9 text-sm h-10';
      case 'medium':
        return 'px-5 py-0 h-12';
      case 'big':
        return 'px-10 py-0 h-14';
      default:
        return '';
    }
  }
}
