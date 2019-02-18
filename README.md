# Benchmark generation for OpenLayers 5+

Use `npm run benchmarks` to run all benchmarks.

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

Know limitations:
* If using anything other that `127.0.0.1:3000` for the server, the tiles will not load


