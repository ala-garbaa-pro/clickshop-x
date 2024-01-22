import { Directive, Input, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core';

@Directive({
  selector: '[appDynamicIcon]'
})
export class DynamicIconDirective implements OnInit {
  @Input() appDynamicIcon: any;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    if (this.appDynamicIcon) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.appDynamicIcon);
      this.viewContainerRef.clear();
      const componentRef = this.viewContainerRef.createComponent(componentFactory);

      // Apply Tailwind CSS classes to the dynamically created icon component
      const iconElement = componentRef.location.nativeElement;
      iconElement.classList.add('w-5', 'h-5', 'me-2');
    }
  }
}
