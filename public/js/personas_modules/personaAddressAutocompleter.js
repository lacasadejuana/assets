export const personaAddressAutocompleter = (targetObject) => {
    return {
        autocomplete: null,
        targetObject,
        value: null,
        label: null,
        name: null,
        type: null,
        required: null,
        id: null,
        input: null,
        get error_message() {
            if (!this.targetObject.direccion)
                return '';
            let map_link = encodeURI(`https://www.google.com/maps/search/?api=1&query=${this.targetObject.direccion}, ${this.targetObject['extra_attributes->comuna']}`);
            return `<a href="${map_link}" target="_blank">Ver en Google Maps</a>`;
        },
        get autocompleteOptions() {
            return {
                input: this.$refs.input_element,
                onPlaceChanged: ({ direccion, comuna, lat, lng }) => {
                    this.$store.persona.direccion = direccion;
                    this.targetObject.direccion = direccion;
                    this.targetObject['extra_attributes->comuna'] = comuna;
                    this.targetObject['extra_attributes->lat'] = lat;
                    this.targetObject['extra_attributes->lng'] = lng;
                    this.targetObject.propiedad_direccion = direccion;
                    this.targetObject.propiedad_comuna = comuna;
                    this.targetObject.propiedad_lat = lat;
                    this.targetObject.propiedad_lng = lng;
                    $('[name="propiedad_comuna"]').val(comuna);
                    $('[name="propiedad_comuna"]').trigger('change.select2');
                }
            };
        },
        init() {
            this.placeholder = this.$el.querySelector('placeholder');
            this.input = this.$el.querySelector('input');
            this.label = this.$el.getAttribute('label');
            this.name = this.$el.getAttribute('name');
            this.type = this.$el.getAttribute('type') || 'text';
            this.required = this.$el.getAttribute('required') || false;
            this.id = this.$el.getAttribute('id') || this.$el.getAttribute('name');
            this.targetObject[this.name] = this.targetObject[this.name] || '';
            globalThis.personaAddessAutocompleterInstance = this;
        }
    };
};
//# sourceMappingURL=personaAddressAutocompleter.js.map