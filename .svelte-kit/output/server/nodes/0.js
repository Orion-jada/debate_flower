

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": true
};
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.BlHYCK0j.js","_app/immutable/chunks/DWRrKtVX.js","_app/immutable/chunks/Cvh-KGzI.js","_app/immutable/chunks/BNTT2V-8.js","_app/immutable/chunks/GZZfrk-c.js","_app/immutable/chunks/B7C6BzLZ.js"];
export const stylesheets = ["_app/immutable/assets/key.B1PHJlzR.css","_app/immutable/assets/autoSave.BP2g0tC6.css","_app/immutable/assets/0.D3obsJFF.css"];
export const fonts = ["_app/immutable/assets/merriweather-sans-vietnamese-300-normal.Lo9JIVPz.woff2","_app/immutable/assets/merriweather-sans-vietnamese-300-normal.B1ReVXA3.woff","_app/immutable/assets/merriweather-sans-latin-ext-300-normal.BfLbN2-O.woff2","_app/immutable/assets/merriweather-sans-latin-ext-300-normal.B3YjYEmu.woff","_app/immutable/assets/merriweather-sans-latin-300-normal.DU6Tv2Oa.woff2","_app/immutable/assets/merriweather-sans-latin-300-normal.Bhkn9rQo.woff","_app/immutable/assets/merriweather-sans-vietnamese-700-normal.C90QcUkg.woff2","_app/immutable/assets/merriweather-sans-vietnamese-700-normal.BBQHBIDv.woff","_app/immutable/assets/merriweather-sans-latin-ext-700-normal.aV_QeKIH.woff2","_app/immutable/assets/merriweather-sans-latin-ext-700-normal.DGwQlEWD.woff","_app/immutable/assets/merriweather-sans-latin-700-normal.D2ahPvNb.woff2","_app/immutable/assets/merriweather-sans-latin-700-normal.B0hN5pI_.woff"];
