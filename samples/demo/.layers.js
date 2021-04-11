const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
	"www"   : {
		"rootFolder": "src",
		"basedOn"   : "static",
		"vars"      : {
			"targetDir"   : "../../docs",
			"rootAlias"   : "App",
			"entryPoint"  : "./src",
			"production"  : true,
			"babelPreset" : {
				"targets": {
					"browsers": "> 0.25%, not dead, safari >= 7, ios_saf >= 7, chrome >= 52"
				},
				"loose"  : true
			},
			"webpackPatch": {
				"optimization": {
					//          "namedModules": true
				},
				plugins       : [
					new CopyPlugin({
						               patterns: [
							               { from: "../*/dist/static/**/*", to: "./samples/samples" }
						               ],
					               }),
				],
				"devtool"     : "source-map"
			}
		},
		"extend"    : [
			"lpack-react"
		]
	},
	"wwwDev": {
		"rootFolder": "src",
		"basedOn"   : "static",
		"vars"      : {
			"targetDir"   : "dist",
			"rootAlias"   : "App",
			"entryPoint"  : "./src",
			"babelPreset" : {
				"targets": {
					"browsers": "> 0.25%, not dead, safari >= 7, ios_saf >= 7, chrome >= 52"
				},
				"loose"  : true
			},
			"webpackPatch": {
				"optimization": {
					//          "namedModules": true
				},
				"devServer"   : {
					"disableHostCheck": true
				},
				//plugins       : [
				//	new CopyPlugin({
				//		               patterns: [
				//			               { from: "../*/dist/static/**/*", to: "./samples/samples" }
				//		               ],
				//	               }),
				//],
				"devtool": "source-map"
			}
		},
		"extend"    : [
			"lpack-react"
		]
	}
}