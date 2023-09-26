


export enum VRenderType {
    renderNull = 'renderNull',
    renderSelect = 'renderSelect',
    renderSingleDate = 'renderSingleDate',
    renderDateRange = 'renderDateRange',
    renderNumber = 'renderNumber',
    renderContacto = 'renderContacto',
    renderButtonGroup = 'renderButtonGroup',
    renderText = 'renderText',
    renderNumericInterval = 'renderNumericInterval',
}

export type TRenderValue = keyof typeof VRenderType
