<?php

class UserController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        Auth::checkAuthentication();
    }

    public function index()
    {
        $this->View->render('user/index', array(
            'user_name' => Session::get('user_name'),
            'user_email' => Session::get('user_email'),
            'user_gravatar_image_url' => Session::get('user_gravatar_image_url'),
            'user_avatar_file' => Session::get('user_avatar_file'),
            'user_account_type' => Session::get('user_account_type')
        ));
    }

    public function editUsername()
    {
        $this->View->render('user/editUsername');
    }

    public function editUsername_action()
    {
        if (!Csrf::isTokenValid()) {
            LoginModel::logout();
            Redirect::home();
            exit();
        }

        UserModel::editUserName(Request::post('user_name'));
        Redirect::home();
    }

    public function editProfesion()
    {
        $this->View->render('user/editProfesion', array(
            'user' => UserModel::getPublicProfileOfUser(Session::get('user_id'))
        ));
    }

    public function editProfesion_action()
    {
        UserModel::saveProfesion(Session::get('user_id'),Request::post('user_profesion'));
        Redirect::home();
    }

    public function editUserEmail()
    {
        $this->View->render('user/editUserEmail');
    }

    public function editUserEmail_action()
    {
        UserModel::editUserEmail(Request::post('user_email'));
        Redirect::to('user/editUserEmail');
    }

    public function editAvatar()
    {
        $this->View->render('user/editAvatar', array(
            'avatar_file_path' => AvatarModel::getPublicUserAvatarFilePathByUserId(Session::get('user_id'))
        ));
    }

    public function uploadAvatar_action()
    {
        AvatarModel::createAvatar();
        Redirect::to('user/editAvatar');
    }

    public function deleteAvatar_action()
    {
        AvatarModel::deleteAvatar(Session::get("user_id"));
        Redirect::to('user/editAvatar');
    }

    public function changeUserRole()
    {
        $this->View->render('user/changeUserRole');
    }

    public function changeUserRole_action()
    {
        if (Request::post('user_account_upgrade')) {
            UserRoleModel::changeUserRole(2);
        }

        if (Request::post('user_account_downgrade')) {
            UserRoleModel::changeUserRole(1);
        }

        Redirect::to('user/changeUserRole');
    }

    public function changePassword()
    {
        $this->View->render('user/changePassword');
    }

    public function changePassword_action()
    {
        $result = PasswordResetModel::changePassword(
            Session::get('user_name'), Request::post('user_password_current'),
            Request::post('user_password_new'), Request::post('user_password_repeat')
        );

        if($result)
            Redirect::to('user/index');
        else
            Redirect::to('user/changePassword');
    }
}
