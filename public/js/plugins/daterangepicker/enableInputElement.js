import { DtPckr } from "./DtPckr";
import { instanceSingleDatePicker } from './instanceSingleDatePicker';
export function enableInputElement(selector) {
    //@ts-ignore
    const $input = $(selector);
    //@ts-ignore
    $input.prop('readonly', false);
    //@ts-ignore
    if ($input[0] && !$input[0].parsed) {
        //
        //@ts-ignore
        $input[0].parsed || new DtPckr($input[0]);
        //@ts-ignore
        if (!$input[0].parsed.isPast) {
            return instanceSingleDatePicker($input, {});
        }
    }
}
export const enableDateInputs = (inputsHabilitables) => {
    inputsHabilitables.each(function () {
        //@ts-ignore
        const $this = $(this), $frm = $this.closest('form'), $input = $frm.find('.agendar_input');
        enableInputElement($input);
    });
    console.info({ inputsHabilitables });
};
//# sourceMappingURL=enableInputElement.js.map