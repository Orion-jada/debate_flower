export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","favicon_old.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.DRbKrkmv.js",app:"_app/immutable/entry/app.CC2vYJjk.js",imports:["_app/immutable/entry/start.DRbKrkmv.js","_app/immutable/chunks/BSm_UIM7.js","_app/immutable/chunks/CZSVg8Ib.js","_app/immutable/chunks/yyzts79b.js","_app/immutable/entry/app.CC2vYJjk.js","_app/immutable/chunks/CZSVg8Ib.js","_app/immutable/chunks/DGc244xU.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/app"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
