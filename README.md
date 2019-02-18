# Automated performance benchmarks for OpenLayers 5+

OpenLayers is a submodule of this project, as such it is easy to change the currently used version.

Please note that the benchmarks will most likely not run if a version under 5.x is used.

Do not forget to initialize submodules with e.g. `git submodule update --init` or a recursive clone.

## Generate performance values for a range of commit

Use `npm start`. By default this runs benchmarks on all merge commits between the `v5.3.0` tag and the last commit on `master`.

Results are saved in a `benchmark-data.json` file. To visualize it, open `graph.html` in a browser. 


## Start benchmarks with the current version of OpenLayers

Use `npm run benchmarks` to manually run benchmarks.

For more control: `node benchmark.js --log-level debug --iterations 50`

Options:
```
Options:
  --host            The host for serving rendering cases   [défaut: "127.0.0.1"]
  --port            The port for serving rendering cases [nombre] [défaut: 3000]
  --timeout         The timeout for loading pages (in milliseconds)
                                                        [nombre] [défaut: 60000]
  --iterations      Iteration count                        [nombre] [défaut: 10]
  --interactive     Leaves the server running for debugging in a browser
                                                       [booléen] [défaut: false]
  --log-level       The level for logging
  [choix: "trace", "debug", "info", "warn", "error", "silent"] [défaut: "error"]
  --headless        Launch Puppeteer in headless mode   [booléen] [défaut: true]
  --puppeteer-args  Additional args for Puppeteer         [tableau] [défaut: []]
```

Known limitations:
* If using anything other that `127.0.0.1:3000` for the server, the tiles will not load


