import { Observable } from 'rxjs/Observable';

/**
 * UserApi abstract class crestes a contract that gets implemented by an's app UserService who consumes the fw.
 *          An abstract class is a class interface that behaves similarly to a TypeScript interface.
 *          Note: abstract class is an angular construct that lives in run time (not just compile time like TS interfaces)
 *
 *          For more information: https://angular.io/docs/ts/latest/cookbook/dependency-injection.html
 *
 */
export abstract class UserApi {

    /** signIn is a method that takes a username, password, and rememberMe as arguments,  Returns an Observable. */
    signIn: (username: string, password: string, rememberMe: boolean) => Observable<any>;

    /** signOut does not take any arguments and returns an observable (which we may or may not need because signing out could always be successful.) */
    signOut: () => Observable<any>;

    // Other methods we should consider adding:
    //      changePassword:
    //      getName
}
