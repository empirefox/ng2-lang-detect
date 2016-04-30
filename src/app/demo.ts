import {Component, OnInit} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

import {LibWithLangComponent} from './components/lib-with-lang.component';
import {LangService} from './services/lang.service';

@Component({
  selector: 'app',
  template: require('./demo.html'),
  directives: [LibWithLangComponent],
  pipes: [TranslatePipe]
})
export class Demo implements OnInit {

  version: string = '1.0.0';
  languages: Array<string> = ['en', 'zh-CN'];

  constructor(
    private translate: TranslateService,
    private langService: LangService) { }

  ngOnInit() {
    this.langService.subscribe(this.translate, this.languages);
  }
}
