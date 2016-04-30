import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/subject/ReplaySubject';
// For systemjs
// use map 'i18next-browser-languagedetector': 'node_modules/i18next-browser-languagedetector/index'
// and use: import LngDetector from 'i18next-browser-languagedetector';
let LngDetector = require('i18next-browser-languagedetector');

export interface LangLoaderConfig {
  prefix?: string;
  suffix?: string;
}

export interface UseFunc {
  (lang: string): Observable<any>;
  (lang: string): any;
}

export interface Translate {
  use: UseFunc;
  setDefaultLang?: (lang: string) => any;
}

@Injectable()
export class LangService {
  public lang$: ReplaySubject<string> = new ReplaySubject<string>(1);

  private lngDetector = new LngDetector({
    languageUtils: {
      formatLanguageCode: (x) => x,
      isWhitelisted: _ => 1
    }
  }, {
      fallbackLng: ['en-US']
    });

  constructor() {
    this.use(this.lngDetector.detect());
  }

  use(lang) {
    this.lngDetector.cacheUserLanguage(lang);
    this.lang$.next(lang);
  }

  langPart(lang: string): string {
    return lang.split('-')[0];
  }

  subscribe(translate: Translate, supportedLangs: string[]) {
    if ('setDefaultLang' in translate) {
      translate.setDefaultLang(supportedLangs[0]);
    }
    this.lang$.subscribe(lang => {
      if (!~supportedLangs.indexOf(lang)) {
        lang = this.langPart(lang);
      }
      if (!~supportedLangs.indexOf(lang)) {
        lang = supportedLangs[0];
      }
      translate.use(lang);
    });
  }
}
