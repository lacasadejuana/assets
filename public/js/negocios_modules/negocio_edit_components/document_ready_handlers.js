export async function requestAnimationPromise() {
    return new Promise((res) => {
        requestAnimationFrame(() => res(null));
    });
}
export function negocioEditOnAlpineInit() {
    Alpine.data('MainFormAccordionData', globalThis.MainFormAccordionData);
    const element = document.querySelector(location.hash ||
        '#accordionPanelsStayOpenExample');
    if (element) {
        const prevElement = element.previousElementSibling;
        if (prevElement) {
            const saveSection = prevElement.querySelector('.save_section');
            if (saveSection) {
                saveSection.scrollIntoView();
            }
        }
    }
}
export function cloneSection(section) {
    var className = ".section-item-" + section + ":last";
    var mdCopy = $(className).clone();
    // mdCopy.appendTo(".modal-body");
    const matched = $(className).find("input").attr('name').match(/\d/g);
    var beforeInputs = parseInt(matched[0], 10);
    console.log(beforeInputs);
    $.each($(mdCopy).find('input'), function () {
        var n = parseInt($(this).attr('name').match(/\d/g)[0], 10);
        console.log(n);
        var startString = $(this).attr('name').split("[")[0];
        var endString = $(this).attr('name').split("[")[2];
        //increment the number
        n++;
        //rebuild the string
        $(this).attr('name', startString + "[" + n + "][" +
            endString);
        $(this).attr('id', startString + "[" + n + "][" +
            endString);
        console.log($(this).attr('name'));
    });
    //md_Copy now has updated inputs
    // console.log(mdCopy);
    mdCopy.appendTo(".body-" + section).find("input").val('');
}
/*function sendToCommentInput(inputName) {
    var textValue = Alpine.store('theform').get(inputName);

    console.log({
        [inputName]: textValue
    });
    $('#comments_input').addClass(inputName);
    $('#comments_input').data('input', inputName);
    $('#comments_input').attr('name', inputName);

    $('.modal-header').find('.fs-075rem').text('campo: ' +
        inputName);
    var textareaModal = $('#comments_input').val(textValue);
};
$('#comments_input').change(function() {
    var inputName = $(this).data('input'),
        value = $(this).val();
    console.log({
        [inputName]: value
    });
    Alpine.store('theform').set(inputName, value)
    $(`[name="${inputName}"]`).data("comment", value);
    $('#comments_input').attr('name', 'comments_input');
    $('#comments_input').removeClass(inputName);
});*/
function ajaxGetUF(date, className) {
    $.getJSON('https://mindicador.cl/api/uf/' + date, function (data) {
        $('.' + className).val(data.serie[0].valor);
    });
}
;
export function removeFile(filePath, arrNum, folder, subFolder) {
    console.log(arrNum);
    var deleteFile = `<input type="hidden" name="file-delete[]" value="${filePath}">`;
    var deleteElement = `<input type="hidden" name="${folder}-files-delete[]" value="${arrNum}">`;
    return $(`.body-${folder}`).append(deleteFile).append(deleteElement);
}
export function removeRow(arrNum, slugName, idCampo) {
    var deleteElement = '<input type="hidden" name="' +
        slugName +
        '-delete[]" value="' + arrNum + '">';
    console.log($("#" + idCampo + "AttModal"));
    $("#" + idCampo + "AttModal").append(deleteElement);
}
export function negocioEditOnDocumentReady() {
    globalThis.checkIfHasComprador();
    // initialize select2:
    $('select.select2-bla').select2({
        // theme: 'bootstrap5',
        placeholder: 'Seleccione una opción',
        allowClear: true,
        width: '100%'
    });
    $('select.select2_multiple').select2({
        //@ts-ignore
        //@ts-ignore
        placeholder: function () {
            $(this).data('placeholder');
        },
        allowClear: true,
        width: '100%',
        multiple: true,
        theme: "bootstrap",
    });
    $(location.hash || '#accordionPanelsStayOpenExample')
        .find('.accordion-collapse').first().show();
    // setear valor de la UF al setear la fecha de inscripcion
    $('.negocio_attr-fecha-inscripcion-cbr').change(function () {
        if (this.value != '') {
            var date = new Date(this.value)
                .toLocaleDateString("es-CL");
            var content = "<input type='hidden' name='negocio_attr-uf-dia-de-inscripcion'class='negocio_attr-uf-dia-de-inscripcion'>";
            $(content).insertAfter(this);
            ajaxGetUF(date, 'negocio_attr-uf-dia-de-inscripcion');
        }
    });
    // setear valor de la UF al setear la fecha de firma de arriendo
    $('.negocio_attr-fecha-firma-contrato-arriendo').change(function () {
        if (this.value != '') {
            var date = new Date(this.value)
                .toLocaleDateString("es-CL");
            var content = "<input type='hidden' name='negocio_attr-uf-dia-de-inscripcion'class='negocio_attr-uf-dia-de-inscripcion'>";
            $(content).insertAfter(this);
            ajaxGetUF(date, 'negocio_attr-valor-uf-dia-firma-arriendo');
        }
    });
    // mostrar si el equipo-agua-caliente es caldera
    $('#propiedad_attr-equipo-agua-caliente').on('select2:select', function (e) {
        if (this.value == 'Caldera') {
            $('#propiedad_attr-tipo-caldera-div')
                .prop('hidden', false);
        }
        else {
            $('#propiedad_attr-tipo-caldera-div')
                .prop('hidden', true);
            $('#propiedad_attr-tipo-caldera').val('N/A')
                .change();
        }
    });
    $('.negocio-id_etapa_negocio').on('select2:select', function (e) {
        globalThis.cambio_etapa_check({
            id_etapa_negocio: this.value,
            id: $(this).data('negocio_id')
        });
    });
    // mostrar si tiene fibra optica
    $('#propiedad_attr-tv-e-internet').on('select2:select', function (e) {
        $('#propiedad_attr-fibra-optica-div').prop('hidden', false);
    });
    $('#propiedad_attr-tv-e-internet').on("select2:unselecting", function (e) {
        $('#propiedad_attr-fibra-optica-div').prop('hidden', true);
        $('#propiedad_attr-fibra-optica').val('N/A')
            .change();
    });
    requestAnimationPromise().then(async () => {
        const element = document.querySelector(location.hash ||
            '#accordionPanelsStayOpenExample');
        if (element) {
            const prevElement = element.previousElementSibling;
            if (prevElement) {
                const saveSection = prevElement.querySelector('.save_section');
                if (saveSection) {
                    //@ts-ignore
                    saveSection.scrollIntoViewIfNeeded({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        }
        const totalBefore = $('select.select2')
            .length, uninitializedBefore = $('select.select2:not(.select2-hidden-accessible)'), initializedBefore = $('select.select2.select2-hidden-accessible')
            .length;
        //@ts-ignore
        console.timerInfo({
            totalBefore,
            uninitializedBefore: uninitializedBefore
                .length,
            initializedBefore
        });
        uninitializedBefore.select2({
            //@ts-ignore
            //@ts-ignore
            placeholder: function () {
                $(this).data('placeholder');
            },
            allowClear: true,
            width: '100%',
            theme: "bootstrap",
            //@ts-ignore
        }).on('select2:select', function (e) {
            var data = e.params.data, 
            //@ts-ignore
            name = $(this).attr('name');
            console.log({
                name,
                data,
                event: 'select2:select'
            });
            //@ts-ignore
            $(this).trigger('change');
        }).on('select2:unselect', function (e) {
            var data = e.params.data, 
            //@ts-ignore
            name = $(this).attr('name');
            console.log({
                name,
                data,
                event: 'select2:select'
            });
            //@ts-ignore
            $(this).trigger('change');
        });
        return requestAnimationPromise()
            .then(() => {
            let uninitializedAfter = $('select.select2:not(.select2-hidden-accessible)').length, initializedAfter = $('select.select2.select2-hidden-accessible')
                .length;
            console.timerInfo({
                uninitializedAfter,
                initializedAfter
            });
        });
    });
}
//# sourceMappingURL=document_ready_handlers.js.map