export async function waitFor(delay = 500, cb = () => { }) {
    return new Promise((res) => {
        setTimeout(() => res(cb), delay);
    });
}
//# sourceMappingURL=waitFor.js.map