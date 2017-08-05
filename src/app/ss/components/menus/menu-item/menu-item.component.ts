import {  Component, ElementRef, HostBinding, HostListener, Input, OnInit, trigger, style, transition, animate } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { MenuItem } from './menu-item.model';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'ss-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  animations: [
    trigger('visibilityChanged', [        // 'visibilityChanged' is just the arbitrary name we are applying to this animation.  Pass an array to trigger.
      transition(':enter', [              // Adds fade-in transition for when element is first added to the DOM. :enter is alias to 'void => *' which is when the element is first added to the DOM - which is when we want out fade in to occur. (void means the element does not exist yet in the DOM.  * means any possible state that is visible.)
        style({ opacity: 0 }),
        animate(350, style({ opacity: 1 }))  // Over course of 350 milliseconds, animate opacity from its prior state (0) to 1.
      ]),
      transition(':leave', [              // Adds fade-out transition for when element is removed from the DOM. :leave is alias to '* => void' - going from any visual state to being removed from the DOM
        animate(100, style({ opacity: 0 }))  // over course of 100 milliseconds, animates opacity from prior state (1) to 0.
      ])
    ])
  ],
})
export class MenuItemComponent implements OnInit {

  /** Input that recieves the item of menuService.items that this menu-item istantiates */
  @Input() item: MenuItem;

  /** Whether or not this menu-item is spawned by a popup menu-item.  Required for accurate absolute css positioning. */
  @HostBinding('class.parent-is-popup') // Use @HostBinding to add the css class 'parent-is-popup' when parentIsPopup is true.
  @Input() parentIsPopup = true;

  /** Whether or not this menu item is active so that the 'router-link-active' class gets added to the menu item. */s
  isActiveRoute = false;

  /** Whether or not the mouse over is (still) inside this menu item (that may spawn a sub-menu item popup to be displayed) */
  mouseInItem = false;

  /** Whether or not the mouse over is (still) inside a popup sub-menu item spawned by this menu item */
  mouseInPopup = false;

  /** Set as the css style.left.px absolute position/pixel coordinates for where the popup-menu should be placed if this item has a sub-menu  */
  popupLeft = 0; // Pixel coordinates (left) of where the popup should be placed.  When 0, a spawned popup menu will be placed at the same left pixel coordinate as this parent menu-item.

  /** Set as the css style.top.px absolute position/pixel coordinates for where the popup-menu should be placed if this item has a sub-menu  */
  popupTop = 34; // Pixel coordinates (top) of where the popup should be placed.  When 34, a spawned popup menu will be placed right underneath this parent menu-item.

  constructor(
    protected menuService: MenuService,
    private router: Router,
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    // Update this.isActiveRoute on load:
    this.checkActiveRoute(this.router.url);

    // Update this.isActiveRoute when route changes (and the routing event has completed):
    // Subscribe to the router.events observable and if routing has completed, update this.isActiveRoute using the checkActiveRoute helper function.
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // event instanceof NavigationEnd indicates that routing has completed: NavigationEnd represents an event triggered when a navigation ends successfully.
        this.checkActiveRoute(event.url);
        // console.log(event.url + ' ' + this.item.route + ' ' + this.isActiveRoute);
      }
    });
  }

  /** Sets isActiveRoute, called when this element/menu item gets created or when the route changes  */
  checkActiveRoute(route: string) {
    this.isActiveRoute = (route === '/' + this.item.route); // set true if route === "/" + this.item.route
  }

  /** Mouse handler for mouseenter of horizontal popup menu spawned by this menu-item. Sets mouseInPopup to true. We're only interested in the Horizontal menu in the title bar since the vertical menu is does not actually spawn a popup menu. */
  onPopupMouseEnter(event): void {
    if (!this.menuService.isVertical) {
      this.mouseInPopup = true;
    }
  }

  /** Mouse handler for mouseleave of horizontal popup menu spawned by this menu-item. Sets mouseInPopup to false. We're only interested in the Horizontal menu in the title bar since the vertical menu is does not actually spawn a popup menu. */
  onPopupMouseLeave(event): void {
    if (!this.menuService.isVertical) {
      this.mouseInPopup = false;
    }
  }

  /** Listener for the mouseenter DOM event of this menu-item ("host") which helps show the popup by setting mouseInItem to true.  Sets mouseInItem to true and updates absolute position of any children spawned menu if parent is also a popup if Horizontal menu. */
  @HostListener('mouseenter', ['$event']) // Use @HostListener to set up a specific DOM event listener.
  onMouseEnter(event): void {
    if (!this.menuService.isVertical) {
      if (this.item.submenu) {
        // If Horizontal menu AND this menu-item contains a submenu...
        this.mouseInItem = true;  // Shows nested popup to the right of parent popup menu item.  When the mouse is on top of a menu-item with a sub-menu, this tells us to show the popup.
        if (this.parentIsPopup) {
          // Update coordinates of popup sub-menu-item to be spawned by this menu-item.
          this.popupLeft = 160;   // popupLeft = 160 sets the child popup menu 160 pixels to the right of this menu-item's position.
          this.popupTop = 0;      // Aligns top pixels of this menu-item with spawned child menu.
        }
      }
    }
  }

  /** Listener for the mouseleave DOM event of this menu-item ("host") which helps hide the popup by setting mouseInItem to false.  Sets mouseInItem to false on mouseleave if Horizontal menu. */
  @HostListener('mouseleave', ['$event']) // Use @HostListener to set up a specific DOM event listener.
  onMouseLeave(event): void {
    if (!this.menuService.isVertical) {
      this.mouseInItem = false;
    }
  }

  /** Click handler for this entire menu-item component. Listens for click events in vertical menu to display popup.  (Horizontal menu display driven by mouseenver/mouseleave events) */
  // Use @HostListener to bind to the host element's click event
  @HostListener('click', ['$event']) // binds to the host element's click event and grabs the event argument
  onClick(event): void {

    event.stopPropagation(); // prevents click event from being sent up to any parent elements.

    // Every menu-item should have either a submenu or a route. A click on a menu-item that has a route navigates the user to the route.  In the vertical menu, a click will open a submenu if one exists. (We are ignoring horisontal menus here since their submenu is display on rollover-mouseenter events).
    if (this.item.submenu) {
      // if this menu item has sub-menu items...
      if (this.menuService.isVertical) {
        // if we are inside a vertical menu...
        this.mouseInPopup = !this.mouseInPopup; // Toggles the mouseInPopup property which tells us whether or not to display the (vertical) "popup" submenu items.
      }
    } else if (this.item.route) {
      // else if this item has no sub-menu item but has a route...
      //     Force horizontal menus to close by sending a mouseleave event
      const newEvent = new MouseEvent('mouseleave', { bubbles: true }); // Programatically creates a 'mouseleave' event who will bubble up the DOM tree (ensuring that all sub, sub-sub-menues, etc close since we might be in a deeply nested submenu item).
      this.elementRef.nativeElement.dispatchEvent(newEvent);            // Allows Angular work with the DOM for us by dispatching the newly created 'mouseleave' event that bubbles up the DOM tree - from this menu-item components DOM element.  Thus, any horizontal menus will close.
      this.router.navigate(['/' + this.item.route]);                    // Navigates user to this menu-item's route.
      this.menuService.showingLeftSideMenu = false;                     // Closes the mobile LeftSideMenu
      // TODO: ^ Add a config var to set whether or not we want the LeftSideMenu to be hidden/closed after mobile menu item clicks.  For now, it will be closed following route clicks.
    }

  }

}
