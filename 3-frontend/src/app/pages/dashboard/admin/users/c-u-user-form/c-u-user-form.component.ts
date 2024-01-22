import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable, catchError, throwError } from 'rxjs';
import { UserRoleEnum } from 'src/app/constants/roles.enum';
import { PageResponse } from 'src/app/model/page.response.model';
import { Role } from 'src/app/model/role.model';
import { User } from 'src/app/model/user.model';
import { RoleFormatPipe } from 'src/app/pipes/role-format.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { areArraysSimilar } from 'src/app/utils/areArraysSimilar';

type Item = {
  item_id: number,
  item_text: string,
  display: string,
};


export type userPayloadCreateType = {
  name: string,
  email: string,
  password: string,
  roles: string[]
};

export type userPayloadUpdateType = {
  name?: string,
  email?: string,
  password?: string,
  roles?: string[]
} | undefined;


@Component({
  selector: 'app-c-u-user-form',
  templateUrl: './c-u-user-form.component.html'
})
export class CUUserFormComponent implements OnInit {
  @Input() roles: Item[] = [];
  @Input() errorMessage: string = '';

  userForm!: FormGroup;

  user = { name: '', email: '', password: '' };
  originalUser = { name: '', email: '', password: '', roles: [""] };

  submitted: boolean = false;


  selectedItems: Item[] = [];
  dropdownSettings: IDropdownSettings = {};

  pageRoles$!: Observable<PageResponse<Role>>;

  selectedRoles: string[] = [];


  userPayload: userPayloadCreateType | userPayloadUpdateType = {};

  hideRolesSection: boolean = false;



  @Input() dropdownList: Item[] = [];
  @Input() submitFormAction!: (userPayload: userPayloadCreateType, next: () => void) => void;
  @Input() action: "create" | "update" = "create"
  @Input() injectedUser!: User | undefined;


  constructor(private formBuilder: FormBuilder, private userService: UsersService, private _toastService: ToastService, private router: Router, private authService: AuthService) {
    console.log("constr=>", this.injectedUser);

  }

  nextFn = () => {
    this.user = { name: '', email: '', password: '' };

    this.selectedItems = [];
    this.submitted = false;
    this.router.navigate(['/dashboard/admin/users']).then(() => {
      this._toastService.success(`Success! User ${this.action}d successfully.`);
    });

  }

  ngOnInit(): void {
    this.initForm();

    const currentUserId: number | null = this.authService.getMetaDataFromLocalStorage("userId");

    if (this.injectedUser?.userId && currentUserId && this.injectedUser?.userId === currentUserId) {
      this.hideRolesSection = true
    }

    console.log("ngoniniot====>", this.injectedUser);


    this.pageRoles$ = this.userService.getRoles("", 0, 9999).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(() => new Error(err.message));
      })
    );

    this.pageRoles$.subscribe(response => {
      this.dropdownList = response._embedded['roles'].map((role: Role, index: number) => ({
        item_id: index,
        item_text: role.name,
        display: new RoleFormatPipe().transform(role.name)
      }));

      if (this.injectedUser !== undefined && this.injectedUser.email !== "") {
        console.log("initForm > injectedUser", this.injectedUser);

        const _roles: string[] = this.injectedUser.roles
        console.log("🚀 ~ file: c-u-user-form.component.ts:126 ~ initForm ~ _roles:", _roles)
        this.originalUser.roles = this.injectedUser.roles


        let _selectedItems: Item[] = []
        this.dropdownList.map(item => {

          if (_roles.includes(item.item_text)) {
            console.log("this will be added", item);

            _selectedItems.push(item)
          }

        });

        console.log("_selectedItems => ", _selectedItems);


        this.selectedItems = _selectedItems



      }

    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'display',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  private initForm(): void {
    let _name = ""
    let _email = ""
    let _password = ""

    if (this.injectedUser !== undefined && this.injectedUser.email !== "") {
      console.log("initForm > injectedUser", this.injectedUser);
      _name = this.injectedUser.name
      _email = this.injectedUser.email
      this.originalUser.name = this.injectedUser.name
      this.originalUser.email = this.injectedUser.email
    }

    this.userForm = this.formBuilder.group({
      name: [_name, Validators.required],
      email: [_email, [Validators.required, Validators.email]],
      password: [_password, _password === "" && this.action === "update" ? [] : [Validators.required, Validators.minLength(8)]],
    });
  }


  onItemSelect(item: any) {
    console.log(item);
    // this.selectedItems.push(item);
  }

  onDeSelect(itemToDeselect: any) {
    console.log("des:", itemToDeselect.item_id);
    console.log(this.selectedItems);

    const copiedArray: Item[] = Array.from(this.selectedItems);

    console.log("copiedArray", copiedArray);

    const newSelectedItems = copiedArray.filter(item => item.item_id !== itemToDeselect.item_id);
    console.log(newSelectedItems);

    this.selectedItems = newSelectedItems; // Update the selectedItems array
  }


  onSelectAll(items: any) {
    console.log(items);
    this.selectedItems = items
  }


  onDeSelectAll(items: any) {
    console.log(items);

    this.selectedItems = []


  }

  // preSubmit(userPayloadParam: userPayloadCreateType | userPayloadUpdateType, nextFnPayload: () => void) {
  preSubmit() {
    console.log("preSubmit called...");


    // Mark all form controls as dirty
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key)?.markAsDirty();
    });

    if (this.userForm.invalid) {
      console.log("invalid form");

      return;
    }

    this.submitted = true;

    this.selectedRoles = this.selectedItems.map(item => this.dropdownList.filter(el => el.item_id === item.item_id)[0].item_text)


    if (this.action === "create") {
      console.log("inside create...");

      const userPayload = {
        name: this.userForm.get('name')!.value,
        email: this.userForm.get('email')!.value,
        password: this.userForm.get('password')!.value,
        roles: this.selectedRoles,
      } as userPayloadCreateType;

      this.submitFormAction(userPayload, this.nextFn)
    } else {
      console.log("inside update...");

      let userPayload: any = {
        userId: this.injectedUser?.userId
      }

      // get only changed inputs
      console.log("this.originalUser.name=>", this.originalUser.name);
      console.log("this.userForm.get('name')!.value=>", this.userForm.get('name')!.value);

      if (this.originalUser.name !== this.userForm.get('name')!.value) {
        userPayload.name = this.userForm.get('name')!.value;
      }

      if (this.originalUser.email !== this.userForm.get('email')!.value) {
        userPayload.email = this.userForm.get('email')!.value;
      }

      if ("" !== this.userForm.get('password')!.value) {
        userPayload.password = this.userForm.get('password')!.value;
      }

      if (!areArraysSimilar(this.selectedRoles, this.originalUser.roles)) {
        userPayload.roles = this.selectedRoles;
      }




      if (Object.keys(userPayload).length === 1) {
        // The userPayload object hasn't changed (is empty)
        console.log("User payload hasn't changed.");
        this._toastService.warn("Nothing to update; you haven't changed anything.");
      } else {
        // The userPayload object has changes
        console.log("User payload has changes.", userPayload);

        this.submitFormAction(userPayload, this.nextFn)

      }




    }
  }
}
