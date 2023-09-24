import TomSelect from "tom-select";
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
export const iconSelector = ({ slug_name, layer_options }) => ({
    tomselect: null,
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
            return { ...icon, label: icon.className.replace('icon-', '') };
        });
    },
    initTomSelect($el) {
        const self = this;
        if (this.tomselect)
            this.tomSelect.destroy();
        const tsettings = {
            create: false,
            hidePlaceholder: true,
            items: [this.layer_options.className || 'icon-home'],
            labelField: 'label',
            valueField: 'className',
            maxItems: 1,
            options: this.options,
            onChange: (value) => {
                let { fontFamily, className, text } = this.options.find((o) => o.className == value);
                console.log({ value, fontFamily, className, text });
                this.layer_options = { ...this.layer_options, fontFamily, className, text };
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
        };
        this.tomselect = new TomSelect($el, tsettings);
    },
});
//# sourceMappingURL=iconSelector.js.map