import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[tooltip]'
})
export class TooltipDirective {
  @Input('tooltip') tooltipTitle: string;

  tooltip: HTMLElement;
  viewPosition = 'top';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('document:keydown.escape', ['$event']) onKeypressEscape(): void {
    if (this.tooltip) {
      this.hide();
    }
  }

  @HostListener('document:keydown.enter', ['$event']) onKeypressEnter(): void {
    if (this.tooltip && (this.el.nativeElement as HTMLElement).firstChild !== event.target && (event.target) !== this.tooltip) {
      this.hide();
    } else if (!this.tooltip && (this.el.nativeElement as HTMLElement).firstChild === event.target) {
      this.show();
    }
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: Event): void {
    if (this.tooltip && (this.el.nativeElement as HTMLElement).firstChild !== event.target && (event.target) !== this.tooltip) {
      this.hide();
    } else if (!this.tooltip && (this.el.nativeElement as HTMLElement).firstChild === event.target) {
      this.show();
    }
  }

  @HostListener('window:scroll') doSomething(): void {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    if (this.tooltip) {
      const tooltipPos = this.tooltip.getBoundingClientRect();
      if ((hostPos.top - tooltipPos.height - this.tooltip.offsetHeight) <= 0) {
        this.viewPosition = 'bott';
        this.setPosition();
      } else {
        this.viewPosition = 'top';
        this.setPosition();
      }
    } else {
      if ((hostPos.top - 35) <= 0) {
        this.viewPosition = 'bott';
      } else {
        this.viewPosition = 'top';
      }
    }
  }

  show(): void {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
  }

  hide(): void {
    this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
    this.renderer.removeChild(document.body, this.tooltip);
    this.tooltip = null;
  }

  create(): void {

    this.tooltip = this.renderer.createElement('span');

    this.renderer.appendChild(
      this.tooltip,
      this.renderer.createText(this.tooltipTitle)
    );

    this.renderer.appendChild(document.body, this.tooltip);

    this.renderer.addClass(this.tooltip, 'ng-tooltip');
    this.renderer.addClass(this.tooltip, `ng-tooltip-${this.viewPosition}`);
  }

  setPosition(): void {
    const hostPos = this.el.nativeElement.getBoundingClientRect();

    const tooltipPos = this.tooltip.getBoundingClientRect();

    let top;
    let left;

    const scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (this.viewPosition === 'top') {
      top = hostPos.top - tooltipPos.height - this.tooltip.offsetHeight;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.viewPosition === 'bott') {
      top = hostPos.bottom + this.tooltip.offsetHeight;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }
    this.renderer.removeClass(this.tooltip, 'ng-tooltip-top');
    this.renderer.removeClass(this.tooltip, 'ng-tooltip-bott');
    this.renderer.addClass(this.tooltip, `ng-tooltip-${this.viewPosition}`);
    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }
}
