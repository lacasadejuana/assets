/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import {
  IEnvWithBindings,
  TctxWithSentry,
  TRequestWithParams,
  Router,
  json,
  withParams,
  getSentryInstance,

} from '@lcdj/workers-common';
import { decryptHash } from '@lcdj/workers-common/src/decryptHash';
import { encryptMessage } from '@lcdj/workers-common/src/cryptUtils/encryptMessage';
import { string2buffer, getKey } from '@lcdj/workers-common/src/cryptUtils/string2buffer';
import { IRequest, RouterType, UniversalRoute } from 'itty-router';
import { buffer2string } from '@lcdj/workers-common/src/cryptUtils/buffer2string';
//import { getImagesRouter } from '@lcdj/images-worker';
type hashRequest = {
  hash: string
} & IRequest
export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}
export async function hashDecrypter(hash: string, app_key: string) {


  const encryptedParsed = JSON.parse(atob(hash)) as {
    iv: string;
    value: string;
    mac: string;
  };
  const keyEncoded = app_key;
  const keyDecoded = atob(keyEncoded);
  const buffer = string2buffer(keyDecoded);
  const key = await getKey(buffer);
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-CBC', iv: string2buffer(atob(encryptedParsed.iv)) },
    key,
    string2buffer(atob(encryptedParsed.value))
  );


  return buffer2string(decrypted)
}

export const CreateDescrypterrouter = (
  env: IEnvWithBindings & { APP_KEY: string },
) /*: RouterType<UniversalRoute<hashRequest>> =>*/ => {
  return Router<TRequestWithParams>()
    .all('*', withParams)

    .get('/encrypt/:id', async (request: TRequestWithParams) => {
      const keyEncoded = env.APP_KEY;
      const keyDecoded = atob(keyEncoded);
      const buffer = string2buffer(keyDecoded);
      console.log({ keyDecoded, keyEncoded, buffer });

      const key = await getKey(buffer);
      const message = request.params.id;
      const hash = btoa(await encryptMessage(message, key));
      return json({ hash });
    })
    .get('/decrypt/:hash', decryptHash(env));
};


