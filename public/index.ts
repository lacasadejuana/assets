/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { CreateDescrypterrouter } from './laravelCrypt'
import { parse } from "cookie";

import {

  getSentryInstance, IEnvWithBindings, json, Router, TRequestWithParams, withParams, hashDecrypter
} from '@lcdj/workers-common';
//import { getImagesRouter } from '@lcdj/images-worker';

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

interface IEnvWithServices extends IEnvWithBindings {
  APP_KEY: string;
  IMAGES: Fetcher;
  R2: Fetcher;
  QR_CODE: Fetcher;
  GEO: Fetcher;
  PROJECT: Fetcher;
  WORKER_NAME: string;
  VENDE_CON_NOSOTROS: Fetcher;
}

const targetHost = 'lacasadejuana.cl',
  ventaPath = '/vende-tu-propiedad-con-nosotros/',
  arriendaPath = '/arrienda-tu-propiedad-con-nosotros/';

const redirectMap = new Map([
  ['landing.lacasadejuana.cl/vende-con-nosotros-la-casa-de-juana', { targetHost, targetPath: ventaPath }],
  ['landing.lacasadejuana.cl/arrienda-con-nosotros-la-casa-de-juana', { targetHost, targetPath: arriendaPath }],
  ['lacasadejuana.cl/vende-con-nosotros', { targetHost, targetPath: ventaPath }],
  ['lacasadejuana.cl/vende-con-nosotros/', { targetHost, targetPath: ventaPath }],
]);


export default {
  async fetch(
    request: TRequestWithParams,
    env: IEnvWithServices,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const sentry = getSentryInstance({ request, ctx, env });
    ctx.passThroughOnException()
    const encrypterRouter = CreateDescrypterrouter(env)
    const COOKIE_NAME = "lcdj_session";

    return Router<TRequestWithParams>({
      routes: [
        [
          'GET',
          /(?<pathname>(vende.*|recibimos.*|arrienda.*))$/,
          [
            async (request: TRequestWithParams): Promise<Response> => {
              return env.VENDE_CON_NOSOTROS.fetch(request);
            },
          ],
          ''],
        [
          'POST',
          /(?<pathname>(vende.*|arrienda.*))$/,
          [
            async (request: TRequestWithParams): Promise<Response> => {
              return env.VENDE_CON_NOSOTROS.fetch(request);
            },
          ],
          ''],
      ],
    })
      /*.all('*', async (request: TRequestWithParams) => {
        const cookie = parse(request.headers.get("Cookie") || "");
        if (cookie[COOKIE_NAME] != null) {
          return hashDecrypter(cookie[COOKIE_NAME], env.APP_KEY).then(decrypted => json({ decrypted })).catch(err => json({ err }))
          // Respond with the cookie value

        }
        return json({ "No cookie with name: ": COOKIE_NAME });


      })*/
      .all('*', withParams)
      .all('/decrypt/*', encrypterRouter.handle)
      .all('/images/*', (request: TRequestWithParams) => {
        console.log({ IMAGES: env.IMAGES });
        return env.IMAGES.fetch(request);
      })
      .all('/r2/*', (request: TRequestWithParams) => {
        console.log({ R2: env.R2 });
        return env.R2.fetch(request);
      })
      .all('/images/*', (request: TRequestWithParams) => {
        console.log({ IMAGES: env.IMAGES });
        return env.IMAGES.fetch(request);
      })
      .all('/qr/*', (request: TRequestWithParams) => {
        console.log({ QR_CODE: env.QR_CODE });
        return env.QR_CODE.fetch(request);
      })
      .all('/geo/*', (request: TRequestWithParams) => {
        console.log({ GEO: env.GEO });
        return env.GEO.fetch(request);
      })
      .all('/coords/*', (request: TRequestWithParams) => {

        return Response.redirect(request.url.replace('/coords', '/geo/coords'))
      })
      .all('/project/*', (request: TRequestWithParams) => {
        console.log({ PROJECT: env.PROJECT });
        return env.PROJECT.fetch(request);
      })
      .all('/codigo-interno/*', (request: TRequestWithParams) => {
        console.log({ PROJECT: env.PROJECT });
        return env.PROJECT.fetch(request);
      })
      .get('favicon.ico', (request: TRequestWithParams) => {
        return fetch('https://lacasadejuana.cl/favicon.ico', {
          headers: request.headers,
        });
      })
      .get('*', (request: TRequestWithParams) => {
        console.info('handled by gateway catch all');
        console.log(env);
        return json(
          {
            result: 'handled by gateway catch all',
            url: request.url,
            worker: env.WORKER_NAME,
            environment: env.WORKER_ENV,
            debug: env.DEBUG,
            release: env.RELEASE,
          },
          { headers: { 'Access-Control-Allow-Origin': '*' } },
        );
      })

      .handle(request, env)
      .catch((err: Error) => {
        sentry.captureException(err);
        console.error(err);
        return json({
          message: err.message,
          stack:
            env.WORKER_ENV === 'development'
              ? String(err.stack).split('\n')
              : [],
        });
      });
  },
};
