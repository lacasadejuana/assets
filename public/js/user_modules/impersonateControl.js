import TomSelect from 'tom-select';
const moment = globalThis.moment;
export const impersonateControl = () => ({
    tomselect: null,
    async init() {
        //this.initTomSelect(this.$el)
        globalThis.impersonateControlInstance = this;
        if (!this.$store.user.is_impersonated) {
            let jsonRes = await this.fetchPersonas();
            this.initTomSelect(this.$refs.select_element, jsonRes.rows.sort((a, b) => a.nombre_completo.localeCompare(b.nombre_completo)));
        }
    },
    fetchPersonas() {
        let tokenValue = document.querySelector('[name="_token"]').value;
        return fetch('/api/personas?can_be_impersonated=1&limit=400', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': tokenValue,
                'expect': 'application/json',
                'accept': 'application/json'
            },
        }).then(async (res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            const jsonRes = (await res.json());
            console.log({ jsonRes });
            return jsonRes;
            /*return tap(jsonRes, async () => {
                this.filtroEnriquecido.options = jsonRes
                this.initTomSelect(this.$el)
            })*/
        });
    },
    computeTSettings(extra) {
        const tsettings = {
            valueField: 'user_id',
            maxItems: 1,
            create: false,
            labelField: 'nombre_completo',
            // options: this.filtroEnriquecido.options,
            placeholder: `Elija a quien desea representar`,
            hidePlaceholder: true,
            searchField: ['nombre_completo', 'email']
        };
        return { ...tsettings, ...extra };
    },
    loading: false,
    initTomSelect($el, rows) {
        if (this.tomselect)
            return;
        const self = this;
        const tsettings = this.computeTSettings({
            options: rows,
            onChange(value) {
                let url = new URL(window.location.href);
                url.pathname = `/impersonate/take/${value}`;
                self.loading = true;
                //@ts-ignore
                location.assign(url.toString());
            },
            render: {
                option: function (data) {
                    return `<div class='d-flex align-items-center'  role='option'>
                             <span class='flex-grow-1'>
                            ${data.nombre_completo}
                            <span class='label block text-gray-500 fs-08rem'>${data.email}</span>
                            </span>
                        </div>`;
                }
            }
        });
        this.tomselect = new TomSelect($el, tsettings);
    }
});
export default impersonateControl;
//# sourceMappingURL=impersonateControl.js.map