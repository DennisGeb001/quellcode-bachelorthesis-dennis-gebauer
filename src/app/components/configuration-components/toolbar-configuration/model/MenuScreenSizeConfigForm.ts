import {FormControl} from "@angular/forms";
import {MenuConfigOption} from "../enum/MenuConfigOption";

export interface MenuScreenSizeConfigForm {
  compact: FormControl<MenuConfigOption>,
  medium: FormControl<MenuConfigOption>,
  expanded: FormControl<MenuConfigOption>,
  large: FormControl<MenuConfigOption>,
  extraLarge: FormControl<MenuConfigOption>,
}
