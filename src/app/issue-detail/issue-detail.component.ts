import { Component, Input, Output,OnInit, EventEmitter } from '@angular/core';
import { Issue } from '../issue';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditIssueFrom, IssueForm } from '../issue-form';
import { IssuesService } from '../issues.service';


@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})

export class IssueDetailComponent implements OnInit {

  @Input() issue: Issue | undefined;
  @Output() formClose = new EventEmitter();

  editIssueForm : FormGroup<EditIssueFrom> | undefined;

  constructor(private builder: FormBuilder,private issueService:IssuesService){}

  ngOnInit(): void {
      if(this.issue){
        this.editIssueForm = this.builder.group<EditIssueFrom>({
          title: new FormControl(this.issue.title,{nonNullable:true,validators: Validators.required}),
          description: new FormControl(this.issue.description, {nonNullable:true}),
          priority : new FormControl(this.issue.priority,{nonNullable:true, validators:Validators.required})
        });
      }
  }
  updateForm(){
    if (this.issue) {
      this.issueService.updateIssue(this.issue.issueNo, this.editIssueForm?.getRawValue() as Issue);
      this.formClose.emit();
    }
  }
}
