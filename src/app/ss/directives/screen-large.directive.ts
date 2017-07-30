import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { ScreenService } from '../services/screen.service';

@Directive({
    selector: '[screenLarge]' // [brackets] used since this will be called as a tag attribute.
})
export class ScreenLargeDirective implements OnDestroy {

    /** whether or not the calling element should exist on a large screen */
    private hasView = false;

    /** Reference to the screensize observable subscription (necessary so we can unsubscribe from the observable on destroy) */
    private screenSubscription: Subscription;

    constructor(
        private viewContainer: ViewContainerRef,
        private template: TemplateRef<Object>, // passed in by the * symbol when the directive is called
        private screenService: ScreenService
    ) {
        // Set the local component property to the subscription in order to keep a reference to the observable subscription so we can unsubscribe later (upon ngDestroy).  This prevents related memory leaks and performance problems.
        this.screenSubscription = screenService.resize$.subscribe(() => this.onResize()); // Fires onResize() as onNext() handler for when resize$ emits its next() trigger.
    }

    @Input()
    set screenLarge(condition) {
        // Ignore the passed condition (borrowed from ngIf source code) and set it based on screen size
        // Set condition to true (allowing tag to be displayed in template) only if the current screen is 'large'.
        condition = this.screenService.screenWidth >= this.screenService.largeBreakPoint;

        if (condition && !this.hasView) {
            // If large screen and the element does not have a view, then create the view by adding the calling element to the DOM.
            this.hasView = true;
            this.viewContainer.createEmbeddedView(this.template); // this.template refers to the element calling this *screenLarge directive.
        } else if (!condition && this.hasView) {
            // If not large screen (condition not met) and element already has a view, then remove the view by removing it from the DOM.
            this.hasView = false;
            this.viewContainer.clear();
        }
    }

    /** Unsubscribe from our screenService upon destroy.
     *  Very important to prevent memory leaks.
     */
    ngOnDestroy() {
        this.screenSubscription.unsubscribe();
    }

    /** Tiggers the setter for screenLarge @Input property */
    onResize() {
        // trigger the setter
        this.screenLarge = false; // false is ignored by the setter logic
    }
}
