

// Set CORS to all /api responses
export const onRequest: PagesFunction = async ({ next, request }) => {


    const CF_IMAGES_ACCOUNT_ID = "50061ec5ddc39b9e7138df76668a36e1";
    const CF_IMAGES_API_KEY = "IMjruP-RgypZ3u2abRhxGnxcHnG3AmSG-FWMoB0C";
    const CF_IMAGES_HASH = "S6pA4mvETTAlFm99qJTv7g";

    const request2 = new Request(`https://api.cloudflare.com/client/v4/accounts/${CF_IMAGES_ACCOUNT_ID}/images/v1`, request)
    request2.headers.set("Authorization", `Bearer ${CF_IMAGES_API_KEY}`);
    return fetch(request2)
    return fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CF_IMAGES_ACCOUNT_ID}/images/v1`,
        {
            method: "POST",
            headers: { "Authorization": `Bearer ${CF_IMAGES_API_KEY}` },
            body: request.body,
        }
    );


}

function subir2() {

    return Promise.resolve(async () => {

        let responses = [];

        let input = document.querySelector("[name='file3']") ?? document.querySelector("[name='file']")
        if (!input) return Promise.all([])

        //@ts-ignore
        for (let file of input.files) {
            let formData = new FormData();
            formData.append('file', file)
            formData.append('id', file.name)
            console.log('sending file ' + file.name)
            let res = await fetch(
                `https://accion-dev.panal.house/SaveImage`,
                {
                    method: "POST",
                    body: formData
                }
            )
            console.log('response', res.statusText)
            responses.push(res)
        }

        return Promise.all(responses)

    })

}