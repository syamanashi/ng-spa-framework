export interface MenuItem {
    text: string;
    icon: string; // glyicon name
    route: string;
    submenu: Array<MenuItem>;
}
