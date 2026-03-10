import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {
  @Input() appHighlight: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.applyHighlight(this.appHighlight);
  }

  private applyHighlight(status: string): void {
    // Remove previous classes
    this.renderer.removeClass(this.el.nativeElement, 'row-absent');
    this.renderer.removeClass(this.el.nativeElement, 'row-late');
    this.renderer.removeClass(this.el.nativeElement, 'row-present');
    this.renderer.removeClass(this.el.nativeElement, 'row-leave');

    switch (status) {
      case 'Absent':
        this.renderer.addClass(this.el.nativeElement, 'row-absent');
        break;
      case 'Late':
        this.renderer.addClass(this.el.nativeElement, 'row-late');
        break;
      case 'Present':
        this.renderer.addClass(this.el.nativeElement, 'row-present');
        break;
      case 'Leave':
        this.renderer.addClass(this.el.nativeElement, 'row-leave');
        break;
    }
  }
}
