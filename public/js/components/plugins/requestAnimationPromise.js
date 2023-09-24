export async function requestAnimationPromise() {
    return new Promise((res) => {
        requestAnimationFrame(() => res);
    });
}
//# sourceMappingURL=requestAnimationPromise.js.map