<?php

class AdminController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        Auth::checkAdminAuthentication();
    }

    public function index()
    {
        $this->View->render('admin/index', array(
                'users' => UserModel::getPublicProfilesOfAllUsers())
        );
    }

    public function actionAccountSettings()
    {
        AdminModel::setAccountSuspensionAndDeletionStatus(
            Request::post('suspension'), Request::post('softDelete'), Request::post('user_id')
        );

        Redirect::to("admin");
    }

    public function delete($user_id){
        $this->View->render('admin/delete', array(
            'user_id' => $user_id)
        );
    }

    public function delete_action(){
        AdminModel::deleteUser(Request::post('user_id'));

        Redirect::to("admin");
    }
}
