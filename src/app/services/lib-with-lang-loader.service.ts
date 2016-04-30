import {Injectable, Inject, Optional, OpaqueToken} from 'angular2/core';
import {Http} from 'angular2/http';
import {TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {LangLoaderConfig} from './lang.service';

export let LIB_WITH_LANG_LOADER_CONFIG = new OpaqueToken('lib-with-lang.config');

const defaultConfig: LangLoaderConfig = {
  prefix: 'i18n/lib-with-lang',
  suffix: '.json'
};

@Injectable()
export class LibWithLangLoader extends TranslateStaticLoader {
  constructor(http: Http, @Optional() @Inject(LIB_WITH_LANG_LOADER_CONFIG) ops: LangLoaderConfig) {
    ops = ops || defaultConfig;
    super(http, ops.prefix, ops.suffix);
  }
}
