import { Component, Input } from '@angular/core';
import { siteSettings } from 'src/settings/site.settings';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
})
export class LogoComponent {

  siteSettings: any = siteSettings;
  @Input() class?: string = "";
}
