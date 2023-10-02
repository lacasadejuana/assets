import { ILayerOptions } from "@lacasadejuana/types";
import type TomSelect from "tom-select";
import { TomSettings } from "tom-select/dist/types/types";



export const iconOptions = [
    //{ fontFamily: 'FontAwesome5Free', className: 'fas fa-house-user', text: '0f9' ,
    //{ fontFamily: 'LineIcons', className: 'lni lni-apartment', text: 'e800' },
    //{ fontFamily: 'LineIcons', className: 'lni lni-home', text: 'e800' },
    { fontFamily: 'fontello', className: 'icon-home', text: 'e800' },
    { fontFamily: 'fontello', className: 'icon-home-1', text: 'e801' },
    { fontFamily: 'fontello', className: 'icon-home-outline', text: 'e802' },
    { fontFamily: 'fontello', className: 'icon-home-2', text: 'e803' },
    { fontFamily: 'fontello', className: 'icon-home-3', text: 'e804' },
    { fontFamily: 'fontello', className: 'icon-home-4', text: 'e805' },
    { fontFamily: 'fontello', className: 'icon-home-5', text: 'e806' },
    //{ fontFamily: 'fontello', className: 'icon-home-circled', text: 'e807' },
    //{ fontFamily: 'fontello', className: 'icon-iphone-home', text: 'e808' },
    //{ fontFamily: 'fontello', className: 'icon-tree', text: 'e809' },
    { fontFamily: 'fontello', className: 'icon-leaf', text: 'e80a' },
    { fontFamily: 'fontello', className: 'icon-belowground-rail', text: 'e80b' },
    //{ fontFamily: 'fontello', className: 'icon-bus-1', text: 'e80c' },
    //{ fontFamily: 'fontello', className: 'icon-basket', text: 'e80d' },
    //{ fontFamily: 'fontello', className: 'icon-basket-1', text: 'e80e' },
    { fontFamily: 'fontello', className: 'icon-commerical-building', text: 'e811' },
    { fontFamily: 'fontello', className: 'icon-industrial-building', text: 'e822' },
    { fontFamily: 'fontello', className: 'icon-school', text: 'e834' },
    //{ fontFamily: 'fontello', className: 'icon-tree-2', text: 'e83f' },
    { fontFamily: 'fontello', className: 'icon-warehouse', text: 'e840' },
    { fontFamily: 'fontello', className: 'icon-building', text: 'f0f7' },
    { fontFamily: 'fontello', className: 'icon-graduation-cap', text: 'f19d' },
    { fontFamily: 'fontello', className: 'icon-building-filled', text: 'f1ad' },
    //{ fontFamily: 'fontello', className: 'icon-bus', text: 'f207' },
    { fontFamily: 'fontello', className: 'icon-train', text: 'f238' },
    { fontFamily: 'fontello', className: 'icon-subway', text: 'f239' },
    //{ fontFamily: 'fontello', className: 'icon-shopping-basket', text: 'f291' },
    //{ fontFamily: 'fontello', className: 'icon-spread', text: 'f527' },
    //{ fontFamily: 'fontello', className: 'icon-graduation-cap-2', text: 'e812' },
    { fontFamily: 'fontello', className: 'icon-college', text: 'e813' },
    { fontFamily: 'fontello', className: 'icon-person', text: 'e814' },
    { fontFamily: 'fontello', className: 'icon-child', text: 'e815' },
    { fontFamily: 'fontello', className: 'icon-adult', text: 'e816' },
].map((icon) => {
    // @ts-ignore
    icon.label = `${icon.fontFamily} ${icon.className.replace('lni ', '').replace('fas ', '')}`;
    return icon;
});
export interface IIconSelector {
    tomselect: TomSelect;
    layer_options: ILayerOptions;
    slug_name: string;
    options: TomSettings['options'];

}
