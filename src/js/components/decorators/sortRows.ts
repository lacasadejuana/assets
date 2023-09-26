
export const sortRows = (rows, campo, dataParams) => {
    return rows.sort((a, b) => {
        if (campo.input_type === 'number') return Number(a[dataParams.sortName]) - Number(b[dataParams.sortName]);
        if (campo.isDateOrDatetimeField) {
            //@ts-ignore
            return new Date(a[dataParams.sortName]).getTime() - new Date(b[dataParams.sortName]).getTime();
        }
        return String(a[dataParams.sortName]).localeCompare(String(b[dataParams.sortName]));

    });
};
