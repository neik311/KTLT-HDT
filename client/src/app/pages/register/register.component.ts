import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService, AuthenticationService, CoreService, NotifyService } from '../../services'
import { FirebaseUpload } from '../../_helpers/firebaseUpload'
import { ACTION_REGISTER_CONTINUE, ACTION_REGISTER_SUCCESS, ERR_CONFIRM_PASSWORD, NOT_YET_EMAIL, NOT_YET_PASSWORD, NOT_YET_USERNAME } from 'src/app/core/constants'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class RegisterComponent implements OnInit {
  userRegister = {
    username: '',
    email: '',
    avatar: null as any,
    password: '',
    cfPassword: '',
  }
  fileImage: any = null
  code: any = null
  isConfirm = false
  constructor(
    private notifyService: NotifyService,
    private apiService: ApiService,
    private authService: AuthenticationService,
    private firebaseUpload: FirebaseUpload,
    private router: Router,
  ) {}

  ngOnInit() {}

  async onSubmit() {
    if (!this.userRegister.email) {
      this.notifyService.showWarning(NOT_YET_EMAIL)
      return
    }
    if (!this.userRegister.username) {
      this.notifyService.showWarning(NOT_YET_USERNAME)
      return
    }
    if (!this.userRegister.password) {
      this.notifyService.showWarning(NOT_YET_PASSWORD)
      return
    }
    if (this.userRegister.password !== this.userRegister.cfPassword) {
      this.notifyService.showWarning(ERR_CONFIRM_PASSWORD)
      return
    }
    this.notifyService.showloading()
    if (this.userRegister.avatar) this.userRegister.avatar = await this.firebaseUpload.uploadImageAvatar(this.fileImage, this.userRegister.username)
    this.apiService.post(this.apiService.AUTH.REGISTER, this.userRegister).then((res: any) => {
      this.isConfirm = true
      this.notifyService.showSuccess(ACTION_REGISTER_CONTINUE)
    })
  }

  async onConfirm() {
    this.notifyService.showloading()
    this.apiService.post(this.apiService.AUTH.VERIFY, { email: this.userRegister.email, code: this.code }).then((res: any) => {
      this.notifyService.showSuccess(ACTION_REGISTER_SUCCESS)
      this.router.navigate(['login'])
    })
  }

  onChangeFile(e: any) {
    this.fileImage = e.target.files[0]
    const files = e.target.files
    if (files.length === 0) return

    const mimeType = files[0].type
    if (mimeType.match(/image\/*/) == null) {
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = (_event) => {
      this.userRegister.avatar = reader.result
    }
  }
}
