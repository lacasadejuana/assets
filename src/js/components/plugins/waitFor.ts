export async function waitFor(delay = 500, cb = () => { }): Promise<unknown> {
    return new Promise((res) => {
        setTimeout(() => res(cb), delay)
    })
}
