import {enableProdMode, provide} from 'angular2/core';
import {COMMON_DIRECTIVES} from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {LangService} from './app/services/lang.service';

const ENV_PROVIDERS = [];
// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'prod') {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

/*
 * App Component
 * our top level component that holds all of our components
 */
import {Demo} from './app/demo';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
document.addEventListener('DOMContentLoaded', () => {
  return bootstrap(Demo, [
    ...ENV_PROVIDERS,
    ...COMMON_DIRECTIVES,
    ...HTTP_PROVIDERS,
    LangService,
    provide(TranslateLoader, {
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'i18n', '.json'),
      deps: [Http]
    }),
    TranslateService,
    TranslatePipe
  ])
    .catch(err => console.error(err));
});
