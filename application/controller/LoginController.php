<?php

class LoginController extends Controller
{

    public function __construct(){
        parent::__construct();
    }

    public function index(){

        if (LoginModel::isUserLoggedIn()) {
            Redirect::home();
        } else {
            $data = array('redirect' => Request::get('redirect') ? Request::get('redirect') : NULL);
            $this->View->render('login/index', $data);
        }
    }

    public function login(){

        if (!Csrf::isTokenValid()) {
            LoginModel::logout();
            Redirect::home();
            exit();
        }

        $login_successful = LoginModel::login(
            Request::post('user_name'), Request::post('user_password'), Request::post('set_remember_me_cookie')
        );

        if ($login_successful) {
            if (Session::get("user_account_type") == 7){
                Redirect::to('admin/index');
            }
            else{
                Redirect::Home();
            }
        } else {
            if (Request::post('redirect')) {
                Redirect::to('login?redirect=' . ltrim(urlencode(Request::post('redirect')), '/'));
            } else {
                Redirect::to('login/index');
            }
        }
    }

    public function logout(){
        LoginModel::logout();
        Redirect::home();
        exit();
    }

    public function loginWithCookie(){

         $login_successful = LoginModel::loginWithCookie(Request::cookie('remember_me'));

        if ($login_successful) {
            Redirect::to('dashboard/index');
        } else {
            LoginModel::deleteCookie();
            Redirect::to('login/index');
        }
    }

    public function requestPasswordReset(){
        $this->View->render('login/requestPasswordReset');
    }

    public function requestPasswordReset_action(){
        PasswordResetModel::requestPasswordReset(Request::post('user_name_or_email'), Request::post('captcha'));
        Redirect::to('login/index');
    }

    public function verifyPasswordReset($user_name, $verification_code){
        if (PasswordResetModel::verifyPasswordReset($user_name, $verification_code)) {
            $this->View->render('login/resetPassword', array(
                'user_name' => $user_name,
                'user_password_reset_hash' => $verification_code
            ));
        } else {
            Redirect::to('login/index');
        }
    }

    public function setNewPassword(){
        PasswordResetModel::setNewPassword(
            Request::post('user_name'), Request::post('user_password_reset_hash'),
            Request::post('user_password_new'), Request::post('user_password_repeat')
        );
        Redirect::to('login/index');
    }


    //para parto
    public function parto(){
        $respuesta = new stdClass();
        //if (!Csrf::isTokenValid()) {
        //    LoginModel::logout();
        //    $respuesta->response = false;
        //    $this->View->renderJSON($respuesta);
        //    exit();
        //}
        $login_successful = LoginModel::login(Request::post('user'), Request::post('pss'), 0);
        $respuesta->response = $login_successful;
        $session_id = session_id();
        $respuesta->session_id = $session_id;

        $this->View->renderJSON($respuesta);
    }

    public function partoVerify(){
        $respuesta = new stdClass();
        //if (!Csrf::isTokenValid()) {
        //    LoginModel::logout();
        //    $respuesta->response = false;
        //    $this->View->renderJSON($respuesta);
        //    exit();
        //}
        $login_successful = LoginModel::isUserLoggedInAngular(Request::post('login'));
        $respuesta->response = $login_successful;

        $this->View->renderJSON($respuesta);
    }
}
