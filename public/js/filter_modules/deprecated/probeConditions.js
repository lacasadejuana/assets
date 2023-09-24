export async function probeConditions(ctx, options = { include_columns: false }) {
    //@ts-ignore
    return Alpine.store('active_filter').getEstimate(options);
}
//# sourceMappingURL=probeConditions.js.map