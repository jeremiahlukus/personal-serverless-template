/* eslint-disable */
import { SwaggerUIBundle } from 'swagger-ui-dist';
import '../node_modules/swagger-ui-dist/swagger-ui.css';

let json = {};
try {
  // eslint-disable-next-line import/no-unresolved
  json = require(`./${process.env.FILE_NAME}`);
  SwaggerUIBundle({
    spec: json,
    // eslint-disable-next-line @typescript-eslint/camelcase
    dom_id: '#swagger-ui',
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
  });
} catch {
  console.log('can not find Schema file');
}
