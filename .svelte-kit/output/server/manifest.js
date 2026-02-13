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
		client: {start:"_app/immutable/entry/start.VXoBftFq.js",app:"_app/immutable/entry/app.Sx1zRrht.js",imports:["_app/immutable/entry/start.VXoBftFq.js","_app/immutable/chunks/DBhIMyIi.js","_app/immutable/chunks/DWRrKtVX.js","_app/immutable/chunks/B7C6BzLZ.js","_app/immutable/entry/app.Sx1zRrht.js","_app/immutable/chunks/DWRrKtVX.js","_app/immutable/chunks/Cvh-KGzI.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
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
