import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dark-mode-switcher',
  templateUrl: './dark-mode-switcher.component.html'
})
export class DarkModeSwitcherComponent implements OnInit {

  isDarkActivated = false;

  constructor() {
    // Retrieve dark mode preference from localStorage on component initialization
    this.isDarkActivated = localStorage.getItem('darkMode') === 'true';
    this.setMode();
  }

  ngOnInit(): void {
    this.setMode();
  }

  setMode() {
    if (this.isDarkActivated) {
      window.document.body.classList.add('dark');
    } else {
      window.document.body.classList.remove('dark');
    }
  }

  toggleDarkMode() {
    // Toggle dark mode preference and update localStorage
    this.isDarkActivated = !this.isDarkActivated;
    localStorage.setItem('darkMode', this.isDarkActivated.toString());
    this.setMode();
  }
}
