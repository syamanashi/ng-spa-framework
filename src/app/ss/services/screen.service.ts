import { HostListener, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * ScreenService is an injectable service that offers the resize$ observable that resets public screen dimension variables and emits next() with any window 'resize' event.
 * All consumers of this service will simply subscribe to resize$ (which is an observable).
 * This service also exposes an 'isLarge()' method to assist with our responsive UI.
 *
 * @export
 * @class ScreenService
 */
@Injectable()
export class ScreenService {
  private resizeSource = new Subject<null>(); // Subject is an Observable that can fire off it's own next() events to its subscribers.  We keep Subjects private while making their Observable behavior public with a public var set to the Subject.asObservable() method.
  resize$ = this.resizeSource.asObservable(); // Returns an Observable. somevar$ dollar-sign is convention that reminds us this is an Observable that can be $ubscribed to.  So, anyone injecting this ScreenService can subscribe to resize$ event.

  largeBreakPoint = 800; // Arbitrary pixel value where we might consider a screen to be 'large'. Consider making this app configurable.

  // Default screen dimension values:
  screenWidth = 1000;
  screenHeight = 800;

  constructor() {

    // Add try/catch so this code can run outside of a window someday (i.e. server-side) without throwing exceptions. (Possibly overkill)
    try {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      window.addEventListener('resize', (event) => this.onResize(event)); // 'resize' event fires whenever browser window is resized or a device is rotated.
    } catch (e) {
      // ...fail silently since we are running where no 'window' object exists.
      // Keep the default screen dimensions (with no event listener attached) since a UI/screen is not being used and 'window' object is therefore undefined.
    }

  }

  /**
   * isLarge helper function returns a boolean that's true if the screenWidth is larger than our (arbitrary) largeBreakPoint (pixel width).
   *
   * @returns {boolean}
   *
   * @memberof ScreenService
   */
  isLarge(): boolean {
    return this.screenWidth >= this.largeBreakPoint;
  }

  /**
   * Used by our window 'resize' event listener to set our storage of screen dimensions and emit a next() event for any subscribers to the public resize$ observable.
   *
   * @param {any} $event
   *
   * @memberof ScreenService
   */
  onResize($event): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.resizeSource.next(); // Notifies any subscribers to the public 'resize$' observable that the screen has been resized, triggering their onNext() handler so they can act accordingly.
  }
}
