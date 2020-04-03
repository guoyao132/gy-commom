<template>
  <div class="msg">
    msg
  </div>
</template>

<script>

  export default {
    name: "msg",
    create() {

    },
    data() {
      return {}
    },
    methods: {},
    mounted() {

    },
  }
</script>

<style lang="less" scoped>
  .msg {

  }


  #login {
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
  margin: 0;
  padding: 0;
  height: 100%;
  background-size: cover !important;
  .el-dialog{
    height: 430px;
    .list-item{
      margin: 20px 0 ;
    }
  }

  .loginBox {
    width: 600px;
    height: 400px;
    right: -15%;
    left: auto;

    .title {
      font-size: 26px;
      font-weight: bold;
      letter-spacing: 2px;
    }

    .loginBoxBg {
      width: 50%;
      margin: 20px auto;
      height: 80%;
      overflow: hidden;

      .text_top {
        margin: 20px auto;
        font-size: 18px;
        letter-spacing: 1px;
      }

      .main {
        width: 80%;
        margin: 0 auto 20px auto;
        overflow: hidden;

        .list-item {
          width: 100%;
          margin-bottom: 20px;

          &.ver_code {
            width: 40%;
            float: left;
          }

          &.code_img {
            width: 30%;
            height: 36px;
            margin-top: 2px;
            margin-left: 18px;
            float: left;

            img {
              width: 100%;
              height: 100%;

            }
          }


          &.code_reset {
            width: 10%;
            height: 30px;
            margin-top: 8px;
            margin-left: 18px;
            float: left;

            img {
              width: 80%;
              height: 80%;
              margin: 5% auto;
              cursor: pointer;
            }
          }

          .login_btn {
            width: 100%;
            height: 40px;
            background-size: 100% 100%;
            cursor: pointer;

            &.light {
              background-size: 100% 100%;

            }
          }

          .el-input__inner {
            border: none !important;
            outline: none;
            background-color: transparent;
            background-size: 100% 100% !important;
            color: #fff;
          }
        }


      }


    }

  }

  }
  @media screen and (min-width: 1921px) and (max-width: 2561px){
    #login .loginBox {
      right: 5%;
      top: 33%;
      left: auto;
      transform: scale(1.5);
    }
  }
  @media screen and (min-width: 2561px){
    #login .loginBox {
      right: 9%;
      left: auto;
      transform: scale(1.5);
      top: 40%;
    }
  }

  /* 可视化登录界面样式 */
  #login.login-vis{
    background: url("../../src/assets/imgs/img1/login_vis_bg.png") center no-repeat;
    .login-vis-content{
      position: relative;
      width: 1650px;
      height: 100%;
      margin: 0 auto;
      .login-vis-bg{
        position: absolute;
        left: 0;
        bottom: 40px;
        background: url("../../src/assets/imgs/img1/login_vis_left.png") left no-repeat;
        width: 1059px;
        height: 703px;
      }
      .login-vis-form-header{
        position: absolute;
        z-index: 22;
        right: 0;
        bottom: 600px;
        width: 1053px;
        height: 177px;
        background: url("../../src/assets/imgs/img1/login_vis_form_header.png") left no-repeat;
      }
      .login-vis-form{
        position: absolute;
        z-index: 33;
        right: 200px;
        bottom: 200px;
        background: url("../../src/assets/imgs/img1/eaxmLogin_vis_form.png") left no-repeat;
        width: 401px;
        height: 463px;
        .login-vis-input-box{
          position: relative;
          width: 100%;
          height: 100%;
          .login-vis-input{
            padding: 110px 40px 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            .item{
              position: relative;
              margin-bottom: 30px;
              height: 50px;
              line-height: 50px;
              .zhxdIconfont{
                position: absolute;
                z-index: 10;
                left: 15px;
                top: 0;
                color: #3a4b9a;
                font-size: 22px;
                font-weight: bold;
              }
              .el-input .el-input__clear{
                color: #666;
              }
              input.text, .text .el-input__inner{
                padding-left: 45px;
                padding-right: 15px;
                height: 50px;
                width: 100%;
                font-size: 18px;
                background-color: #a5c0de;
                color: #3a4b9a;
                border: 2px solid #3a4b9a;
                outline: none;
                -webkit-border-radius: 6px;
                -moz-border-radius: 6px;
                border-radius: 6px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;

                &:focus{
                  background-color: #eaeff5;
                }
                &.code{
                  padding-left: 15px;
                  width: 50%;
                }

                &::-webkit-input-placeholder {
                  color:#3a4b9a;
                }
                &:-moz-placeholder {
                  color:#3a4b9a;
                }
                &::-moz-placeholder {
                  color:#3a4b9a;
                }
                &:-ms-input-placeholder {
                  color:#3a4b9a;
                }
              }
              .code-img{
                width: 50%;
                vertical-align: top;
                cursor: pointer;
              }
              .item-button{
                font-size: 18px;
                color: #ffffff;
                width: 100%;
                height: 100%;
                cursor: pointer;

                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;

                background: #44fff4;
                background: -moz-linear-gradient(top,  #44fff4 0%, #04acc9 100%);
                background: -webkit-linear-gradient(top,  #44fff4 0%,#04acc9 100%);
                background: linear-gradient(to bottom,  #44fff4 0%,#04acc9 100%);
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#44fff4', endColorstr='#04acc9',GradientType=0 );

                &.item-button-disabled{
                  cursor: not-allowed;
                  filter: alpha(opacity=80);
                  opacity: .8;
                }
              }
            }
            .item-link{
              margin-top: -20px;
              text-align: right;
              color: #ffffff;
              a{
                color: #ffffff;
              }
            }
          }
        }

      }
    }
  }

  @media screen and (max-width: 1650px){
    #login.login-vis{
      .login-vis-content{
        width: 1366px;
        .login-vis-bg{
          bottom: 120px;
          height: 560px;
          background-size: contain;
        }
        .login-vis-form-header{
          width: 800px;
          background-size: contain;
        }
        .login-vis-form{
          right: 200px;
          bottom: 220px;
          width: 340px;
          background-size: contain;
          .login-vis-input-box{
            .login-vis-input{
              padding: 130px 30px 0;
              .item{
                margin-bottom: 25px;
                height: 42px;
                line-height: 42px;
                .zhxdIconfont{
                  font-size: 18px;
                }
                input.text,  .text .el-input__inner{
                  height: 42px;
                  border: 1px solid #3a4b9a;
                  -webkit-border-radius: 3px;
                  -moz-border-radius: 3px;
                  border-radius: 3px;
                }
                .item-button{
                  -webkit-border-radius: 3px;
                  -moz-border-radius: 3px;
                  border-radius: 3px;
                }
              }
              .item-link{
                margin-top: -15px;
              }
            }
          }
        }
      }
    }
  }
</style>