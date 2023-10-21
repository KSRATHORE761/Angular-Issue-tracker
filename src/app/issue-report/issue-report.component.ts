import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import{FormControl, FormGroup,Validators} from '@angular/forms';
import { IssueForm } from '../issue-form';
import { IssuesService } from '../issues.service';
import { Issue } from '../issue';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css']
})
export class IssueReportComponent implements OnInit {
  
  issueForm = new FormGroup<IssueForm>({
    title: new FormControl('',{nonNullable:true, validators: Validators.required}),
    description: new FormControl('',{nonNullable:true}),
    priority: new FormControl('',{nonNullable:true, validators: Validators.required}),
    type: new FormControl('',{nonNullable:true, validators: Validators.required})
  });

  @Output() formClose = new EventEmitter();

  suggestions:Issue[] = [];

  constructor(private issueService:IssuesService){}

  ngOnInit(): void {
      this.issueForm.controls.title.valueChanges.subscribe(
        title => {
          this.suggestions = this.issueService.getSuggestions(title);
        }
      );
  }

  addIssue(){
    if(this.issueForm && this.issueForm.invalid){
      this.issueForm.markAllAsTouched();
      return;
    }
    this.issueService.createIssue(this.issueForm.getRawValue() as Issue);
    this.formClose.emit();
  }

  
}