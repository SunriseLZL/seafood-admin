<template>
    <div class="login-home">
        <div class="login-wrap">
            <div class="login-box">
                <p class="login-title">登录</p>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="ruleForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="ruleForm.name" @keyup.enter.native="handleLogin"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" @keyup.enter.native="handleLogin"
                                  v-model="ruleForm.password"></el-input>
                    </el-form-item>
                </el-form>
                <div class="login-bottom">
                    <el-button type="primary" @click="handleLogin">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {login} from '@/api/source.js';
  import {setToken} from '@/utils/kit.js';

  export default {
    name: 'Login',
    data() {
      return {
        ruleForm: {
          name: '',
          password: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
        }
      };
    },
    methods: {
      async handleLogin() {
        const res = await login({...this.ruleForm});
        if (!!res && res.code === 200) {
          console.log(res);
          setToken(res.data);
          localStorage.setItem('name', this.ruleForm.name);
          this.$message.success('登录成功！');
          this.$router.push({path: '/order'});
        }
      },
    },
    components: {}
  };
</script>

<style lang="scss">
    .login-home {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: lavender;
    }

    .login-box {
        width: 480px;
        height: 390px;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 5px 10px 0px rgba(35, 135, 230, 0.1);
        border-radius: 4px;
        position: relative;
        padding: 64px 40px 0 40px;
        .box-img {
            position: absolute;
            right: 40px;
            top: 24px;
            width: 180px;
            height: 100px;
        }
        .login-title {
            width: 100%;
            height: 18px;
            line-height: 18px;
            font-size: 22px;
            font-weight: bold;
            color: rgba(63, 63, 63, 1);
            text-align: center;
        }
    }

    .login-wrap {
        width: 480px;
        height: 496px;
        .login-logo {
            width: 100%;
            height: 30px;
        }
    }

    .ruleForm {
        margin-top: 50px;
        text-align: center;
    }

    .login-bottom {
        text-align: right;
        margin-top: 20px;
    }
</style>
