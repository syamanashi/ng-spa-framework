/**
 * Country view-model represents data usually coming over HTTP.
 * The view-model is implemented as an interface.  The data needs to conform to this interface.
 */
export interface Country {
    id: number;
    name: string;
    epiIndex: number; // EPI: environmental performance index
}
