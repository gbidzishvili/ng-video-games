import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  public form = new FormGroup({
    'searh-input': new FormControl(''),
  });
  constructor(private router: Router) {}
  ngOnInit(): void {
    console.log(this.form.value['searh-input']);
  }
  onSubmit(form) {
    this.router.navigate(['search', form.value['search-input']]);
  }
}
