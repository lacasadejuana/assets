const requestAnimationPromise = globalThis.requestAnimationPromise;
export function addEditableBehavior() {
    //@ts-ignore
    $.fn.editable.defaults.mode = 'inline';
    //@ts-ignore
    $.fn.editableform.template = `<form class="form-inline editableform">
        <div class="control-group">
            <div><div class="editable-input"></div><div class="editable-buttons"></div></div>
            <div class="editable-error-block"></div>
        </div>
    </form>`;
    //@ts-ignore
    $.fn.editableform.buttons = '<button type="submit" class="editable-submit btn btn-xs btn-success">Ok</button><button type="button" class="editable-cancel btn btn-xs btn-danger">Cancelar</button>';
    requestAnimationPromise().then(() => {
        //@ts-ignore
        $('td .update_record').editable({
            url: "/negocio/updateSingleField",
            emptytext: 'Sin datos',
            params: function (params) {
                params.attr = $(this).data('attr');
                return params;
            },
        });
    });
}
//# sourceMappingURL=addEditableBehavior.js.map