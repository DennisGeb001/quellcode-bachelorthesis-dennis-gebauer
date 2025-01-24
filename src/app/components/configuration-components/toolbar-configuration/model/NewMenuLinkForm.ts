import {FormControl} from "@angular/forms";

export interface NewMenuLinkForm {
  name: FormControl<string>,
  link: FormControl<string>
}
