import {Component} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-analyzer',
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatStepper,
    MatStep,
    ReactiveFormsModule,
    MatStepLabel,
    MatFormField,
    MatInput,
    MatButton,
    MatStepperNext,
    MatStepperPrevious,
    MatLabel,
    CdkTextareaAutosize,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent
  ],
  templateUrl: './analyzer.component.html',
  styleUrl: './analyzer.component.scss'
})
export class AnalyzerComponent {
  sourcecodeInputForm = new FormGroup({
    htmlInput: new FormControl<string>('', Validators.required),
    cssInput: new FormControl<string>('', Validators.required)
  })
}
