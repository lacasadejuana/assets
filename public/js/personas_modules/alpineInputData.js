export const alpineInputData = (targetObject) => {
    return {
        targetObject,
        value: null,
        label: null,
        placeholder: null,
        name: null,
        type: null,
        required: null,
        id: null,
        input: null,
        error_message: null,
        init() {
            this.input = this.$el.querySelector('input');
            this.label = this.$el.getAttribute('label');
            this.placeholder = this.$el.getAttribute('placeholder');
            this.name = this.$el.getAttribute('name');
            this.type = this.$el.getAttribute('type') || 'text';
            this.required = this.$el.getAttribute('required') || false;
            this.id = this.$el.getAttribute('id') || this.$el.getAttribute('name');
            this.targetObject[this.name] = this.targetObject[this.name] || '';
            this.targetObject[this.$refs.input_element.name] = this.targetObject[this.$refs.input_element.name] || '';
        }
    };
};
//# sourceMappingURL=alpineInputData.js.map