import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { ScreenService } from '../services/screen.service';

@Directive({
    selector: '[screenBelowLarge]' // [brackets] used since this will be called as a tag attribute.
})
export class ScreenBelowLargeDirective implements OnDestroy {

    /** whether or not the calling element should exist on a below-large screen */
    private hasView = false;

    private screenSubscription: Subscription;

    constructor(
        private viewContainer: ViewContainerRef,
        private template: TemplateRef<Object>, // passed in by the * symbol when the directive is called
        private screenService: ScreenService
    ) {
        this.screenSubscription = screenService.resize$.subscribe(() => this.onResize()); // Fires onResize() as onNext() handler for when resize$ emits its next() trigger.
    }

    @Input()
    set screenBelowLarge(condition) {
        // Ignore the passed condition (borrowed from ngIf source code) and set it based on screen size
        // Set condition to true (allowing tag to be displayed in template) only if the current screen is NOT 'large'.
        condition = this.screenService.screenWidth < this.screenService.largeBreakPoint; // This is the only line of code that differs from scree-large.directive.

        if (condition && !this.hasView) {
            // If NOT large screen and the element does not have a view, then create the view by adding the calling element to the DOM.
            this.hasView = true;
            this.viewContainer.createEmbeddedView(this.template); // this.template refers to the element calling this *screenLarge directive.
        } else if (!condition && this.hasView) {
            // If large screen (condition not met) and element already has a view, then remove the view by removing it from the DOM.
            this.hasView = false;
            this.viewContainer.clear();
        }
    }

    ngOnDestroy() {
        this.screenSubscription.unsubscribe();
    }

    /** Tiggers the setter for screenLarge @Input property */
    onResize() {
        // trigger the setter
        this.screenBelowLarge = false; // false is ignored by the setter logic
    }
}

