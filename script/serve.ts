import * as esbuild from 'esbuild'
import { buildOptions } from "./build";

esbuild.serve(
  {
    servedir: './public',
    onRequest: (request) => {
      console.log(`Requested ${request.path}. Status ${request.status}`)
    }
  }, {
    ...buildOptions,
  }
)
  .then((serve) => console.log(`Serving on http://${serve.host}:${serve.port}`))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
