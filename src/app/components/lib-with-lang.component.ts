import {Component, OnInit, provide} from '@angular/core';
import {TranslateService, TranslatePipe, TranslateLoader} from 'ng2-translate/ng2-translate';

import {LangService} from '../services/lang.service';
import {LibWithLangLoader} from '../services/lib-with-lang-loader.service';

@Component({
  selector: 'lib-with-lang',
  template: require('./lib-with-lang.html'),
  viewProviders: [
    provide(TranslateLoader, { useClass: LibWithLangLoader }),
    TranslateService
  ],
  pipes: [TranslatePipe]
})
export class LibWithLangComponent implements OnInit {

  private supportedLangs: string[] = ['en', 'zh-CN'];

  constructor(
    private translate: TranslateService,
    private langService: LangService) { }

  ngOnInit() {
    this.langService.subscribe(this.translate, this.supportedLangs);
  }

}
