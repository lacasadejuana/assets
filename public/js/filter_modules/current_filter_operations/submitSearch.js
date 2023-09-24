import { ifDefined } from '../../components/plugins/ifDefined';
export async function applyFilter(state) {
    state.limit = 9100;
    state.name = String(state.name).trim();
    const negocioStore = Alpine.store('negocios');
    let endpoint = location.origin + '/api/negocios/apply_filter';
    //@ts-ignore
    if (Alpine.store('active_filter').searchUrl)
        endpoint = location.origin + Alpine.store('active_filter').searchUrl.replace(location.origin, '');
    //@ts-ignore
    Alpine.store('user').ongoingSearchOperation = true;
    //@ts-ignore
    return negocioStore.fetchFilteredRecords(endpoint, {
        method: 'post',
        state,
        page: 1
    })
        .then(async (result) => {
        //@ts-ignore
        setTimeout(() => Alpine.store('user').ongoingSearchOperation = false);
        ifDefined(globalThis.mapFrameData, (mapFrameData) => mapFrameData.reload());
        ifDefined(globalThis.bsTable, (bsTable) => bsTable.reload && bsTable.reload());
        setTimeout(() => negocioStore.total = negocioStore.properties.length, 1000);
        return result;
    })
        .catch(e => {
        //@ts-ignore
        Alpine.store('user').ongoingSearchOperation = false;
    });
}
//# sourceMappingURL=submitSearch.js.map