<template>
  <div class="login-wrapper">

    <div class="login-body">
      <div class="login-body_title">
        <h2>登录</h2>
      </div>
      <el-form ref="form" class="login-body_form" :model="form" status-icon :rules="rules">
        <template v-if="!loginType">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              type="text"
              placeholder="请输入姓名"
              autofocus
              resize="vertical"
              autocomplete="off"
              prefix-icon="font_family icon-denglu-yonghu"
              @keydown.native.enter="handleLogin"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              show-password
              autocomplete="off"
              prefix-icon="font_family icon-denglumima"
              @keydown.native.enter="handleLogin"
            />
          </el-form-item>
          <el-form-item prop="code">
            <el-row>
              <el-col :span="15">
                <el-input
                  v-model="form.code"
                  type="text"
                  placeholder="请输入验证码"
                  autocomplete="off"
                  prefix-icon="font_family icon-yanzhengma"
                  @keydown.native.enter="handleLogin"
                />
              </el-col>
              <el-col :span="8" :push="1" style="height:40px;border-radius: 5px;">
                <img :src="captchaUrl" alt="" width="100%" height="38" @click="handleImg">
              </el-col>
            </el-row>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item prop="phone">
            <el-input
              v-model="form.phone"
              type="text"
              placeholder="请输入手机号"
              autofocus
              resize="vertical"
              autocomplete="off"
              prefix-icon="font_family icon-denglu-yonghu"
              @keydown.native.enter="handleLogin"
            />
          </el-form-item>
          <el-form-item prop="smsCode">
            <el-row>
              <el-col :span="15">
                <el-input
                  v-model="form.smsCode"
                  type="text"
                  placeholder="请输入验证码"
                  autocomplete="off"
                  prefix-icon="font_family icon-yanzhengma"
                  @keydown.native.enter="handleLogin"
                />
              </el-col>
              <el-col :span="8" :push="1" style="height:40px;border-radius: 5px;">
                <el-button type="primary" plain style="width:100%;" @click="handleSms">发送验证码</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </template>
        <el-form-item class="login-type_cl" prop="rememberMe">
          <!-- <el-checkbox v-model="form.rememberMe">记住我</el-checkbox> -->
          <a @click="handleLoginType">{{ loginTypeText }}</a>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%" @click.native.prevent="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
      <el-divider>其他登录方式</el-divider>
      <div class="login-social">
        <template v-for="(item, index) in socialData">
          <el-tooltip :key="index" :content="item.title" placement="top-start">
            <svg-icon
              :key="index"
              :icon-class="item.type"
              :class-name="item.type"
              class="icon-social"
              @click="handleSocial(item.type)"
            />
          </el-tooltip>
        </template>

      </div>
    </div>
    <div class="login-footer" />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapActions } from 'vuex'
// eslint-disable-next-line no-unused-vars
import { setToken } from '@/utils/auth'
import { socials } from '@/utils/common'
import rules from './rules'

export default {
    name: 'Login',
    data() {
        return {
            rules: rules(this),
            fits: 'fill',
            captcha: process.env.VUE_APP_BASE_API + this.$api.auth.captcha + '?requestId=',
            form: {
                username: 'admin',
                password: '123456',
                code: '',
                phone: '',
                smsCode: '',
                requestId: this.$common.uuid(),
                rememberMe: false
            },
            /**
             * false为账号登录
             * true为短信验证码登录
             */
            loginType: false,
            loginTypeText: '短信验证登录',
            loading: false,
            socialData: socials()
        }
    },
    computed: {
        captchaUrl() {
            return this.captcha + this.form.requestId
        }
    },
    methods: {
        doLogin() {
            // eslint-disable-next-line no-unused-vars
            let newForm = null
            // eslint-disable-next-line no-unused-vars
            let newApi = null
            if (!this.loginType) {
                newForm = {
                    username: this.form.username,
                    password: this.form.password,
                    grant_type: 'password',
                    requestId: this.form.requestId,
                    code: this.form.code,
                    rememberMe: this.form.rememberMe
                }
                newApi = this.$api.auth.login
            } else {
                newForm = {
                    phone: this.form.phone,
                    grant_type: 'sms',
                    requestId: this.form.requestId,
                    code: this.form.cmsCode,
                    rememberMe: this.form.rememberMe
                }
                newApi = this.$api.auth.loginSms
            }
            console.log(newForm)
            this.loading = true
            this.$ajax.postForm(newApi, newForm, true).then(result => {
                if (result.code !== '10000') {
                    this.$message({
                        message: result.msg,
                        type: 'error',
                        duration: 5 * 1000
                    })
                    this.$store.dispatch('user/cleanUser')
                    this.handleImg()
                    this.loading = false
                } else {
                    setToken(result.bean.access_token)
                    this.$store.commit('user/SET_TOKEN', result.bean.access_token)
                    this.$router.push({ path: '/' })
                    this.loading = false
                }

                // eslint-disable-next-line handle-callback-err
            }).catch(error => {
                this.handleImg()
                this.loading = false
            })
        },
        handleLoginType() {
            this.loginType = !this.loginType
            this.loginTypeText = this.loginType ? '用户名密码登录' : '短信验证登录'
            this.$refs.form.clearValidate()
        },
        handleSms() {
            this.$message({
                message: '拼命完善中...',
                type: 'warn',
                duration: 5 * 1000
            })
        },
        handleLogin() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.doLogin()
                } else {
                    return false
                }
            })
        },
        handleImg() {
            this.form.requestId = this.$common.uuid(32)
        },
        handleSocial(app) {
            this.loading = true
            // 重定向地址
            const redirect_uri = process.env.VUE_APP_BASE_API + '/sys/social/auth/login/' + app +
                                 '?domain=' + window.location.origin

            // 打开关闭窗口
            const newWindow = this.$common.openWindow(redirect_uri, app, 540, 540)
            const context = this
            const interval = setInterval(function() {
                if (newWindow != null && newWindow.closed) {
                    context.loading = false
                    clearInterval(interval)
                }
            }, 800)

            // 监听事件
            window.addEventListener('message', this.doSocial)
            window.removeEventListener('message', this.doSocial, true)
        },
        doSocial(e) {
            try {
                const data = JSON.parse(e.data)
                if (data.code !== '10000') {
                    this.$message({
                        message: '第三方授权登录失败',
                        type: 'error',
                        duration: 5 * 1000
                    })
                    this.loading = false
                    return
                }
                if (data.bean.auth === '0') {
                    this.$message({
                        message: '没有关联用户',
                        type: 'error',
                        duration: 5 * 1000
                    })
                } else {
                    const formSocial = {
                        openId: data.bean.openId,
                        app: data.bean.app,
                        grant_type: 'social'
                    }
                    this.$ajax.postForm(this.$api.auth.loginSocial, formSocial, true).then(result => {
                        if (result.code !== '10000') {
                            this.$message({
                                message: result.msg,
                                type: 'error',
                                duration: 5 * 1000
                            })
                            this.$store.dispatch('user/cleanUser')
                            this.loading = false
                        } else {
                            setToken(result.bean.access_token)
                            this.$store.commit('user/SET_TOKEN', result.bean.access_token)
                            this.$router.push({ path: '/' })
                            this.loading = false
                        }

                        // eslint-disable-next-line handle-callback-err
                    }).catch(error => {
                        this.loading = false
                    })
                }
            } catch (error) {
                // 什么也不做
                this.loading = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.login-wrapper{
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    @media (min-width: 700px) {
        .login-body {
            padding: 40px 0 24px 0;
        }
    }
    @media screen and (max-width: 576px) {
         .login-body {
            width: 95%!important;
        }
    }
    .login-body {
        flex: 1;
         padding-top: 100px;
        width: 384px;
        margin: 0 auto;
        .login-body_form{
            padding: 10px 0;
            .login-type_cl {
                a {
                    text-align:right;
                    float:right;
                    text-decoration: none;
                    cursor: pointer;
                    color: #005980
                }
                a:hover {
                    color: #009fda;
                    text-decoration: none;
                }
            }
        }
        .login-social {
            text-align: left;
            .icon-social {
                margin-left: 20px;
                width: 25px;
                height: 25px;
                cursor: pointer;
            }
        }
    }
}
</style>
