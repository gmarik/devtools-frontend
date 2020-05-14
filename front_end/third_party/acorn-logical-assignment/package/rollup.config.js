export default {
	input: "src/index.js",
	output: [
		{
			file: "dist/acorn-logical-assignment.js",
			format: "cjs",
			sourcemap: true
		},
		{
			file: "dist/acorn-logical-assignment.mjs",
			format: "es",
			sourcemap: true
		}
	]
}
