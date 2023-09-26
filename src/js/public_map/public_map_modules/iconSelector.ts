import { AlpineDataComponent } from "@lacasadejuana/types";


import { ILayerOptions } from "@lacasadejuana/types";
import TomSelect from "tom-select";
import { RecursivePartial, TomSettings } from "tom-select/dist/types/types";
import { IIconSelector, iconOptions } from "./iconOptions";


export const iconSelector = ({ slug_name, layer_options }: { slug_name: string, layer_options: ILayerOptions }) => ({
    tomselect: null as TomSelect,
    layer_options,
    slug_name,
    get options() {
        return iconOptions || [
            //{ className: 'icon-fire', text: '813' ,
            //{ className: 'icon-fire-1', text: '525' ,
            //{ className: 'icon-flag-empty', text: '11d' ,
            //{ className: 'icon-layers', text: '80d' ,
            //{ className: 'icon-layers-alt', text: '812' ,
            //{ className: 'icon-marquee', text: '847' ,
            //{ className: 'icon-progress', text: '80f' ,
            //{ className: 'icon-puzzle', text: '12e' ,
            //{ className: 'icon-spin', text: '839' ,
            //{ className: 'icon-spinner', text: '838' ,
            //{ className: 'icon-vector', text: '045' ,

        ].map((icon) => {
            return { ...icon, label: icon.className.replace('icon-', '') }
        })
    }
    ,
    initTomSelect($el) {
        const self = this;
        if (this.tomselect) this.tomSelect.destroy();
        const tsettings = {
            create: false,
            hidePlaceholder: true,
            items: [this.layer_options.className || 'icon-home'],
            labelField: 'label',
            valueField: 'className',
            maxItems: 1,
            options: this.options,

            onChange: (value) => {

                let { fontFamily, className, text } = this.options.find((o) => o.className == value)
                console.log({ value, fontFamily, className, text })
                this.layer_options = { ...this.layer_options, fontFamily, className, text }

            },



            render: {
                option: function (data) {
                    return `<div class='d-flex align-items-center'  style="font-size:1.2rem"  role='option' title="${data.label}">
                             <i class='${data.className}'><i>
                           
                            </span>
                        </div>`;
                },
                item: function (data) {
                    return `<div class='d-flex align-items-center' style="font-size:1.2rem"  role='option'>
                             <i class='${data.className}'><i>
                              </span>
                        </div>`;
                }
            }
        } as RecursivePartial<TomSettings>

        this.tomselect = new TomSelect($el, tsettings)
    },

} as AlpineDataComponent<IIconSelector>)

