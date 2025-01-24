import {FormControl, FormGroup} from "@angular/forms";
import {ThemeColorOption} from "../../../../model/enum/ThemeColorOption";
import {MenuConfigForm} from "./MenuConfigForm";
import {NavItem} from "./NavItem";

export interface ToolbarConfigForm {
  title: FormControl<string>,
  menuConfig: FormGroup<MenuConfigForm>,
  navItems: FormControl<NavItem[]>,
  showLoginButton: FormControl<boolean>,
  showProfileButton: FormControl<boolean>,
  color: FormControl<ThemeColorOption>
}
