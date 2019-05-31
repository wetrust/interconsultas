<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

ini_set('session.cookie_httponly', 1);

return array(
    'URL' => 'http://' . $_SERVER['HTTP_HOST'] . str_replace('public', '', dirname($_SERVER['SCRIPT_NAME'])),
    'PATH_CONTROLLER' => realpath(dirname(__FILE__).'/../../') . '/application/controller/',
    'PATH_VIEW' => realpath(dirname(__FILE__).'/../../') . '/application/view/',
    'PATH_AVATARS' => realpath(dirname(__FILE__).'/../../') . '/public/avatars/',
    'PATH_AVATARS_PUBLIC' => 'avatars/',
    'DEFAULT_CONTROLLER' => 'Dashboard',
    'DEFAULT_ACTION' => 'index',
    'DB_TYPE' => 'mysql',
    'DB_HOST' => 'db',
    'DB_NAME' => 'administrador',
    'DB_USER' => 'root',
    'DB_PASS' => 'test',
    'DB_PORT' => '3306',
    'DB_CHARSET' => 'utf8',
    'CAPTCHA_WIDTH' => 359,
    'CAPTCHA_HEIGHT' => 100,
    'COOKIE_RUNTIME' => 1209600,
    'COOKIE_PATH' => '/',
    'COOKIE_DOMAIN' => "",
    'COOKIE_SECURE' => false,
    'COOKIE_HTTP' => true,
    'COOKIE_NAME' => "PHPSESSID",
    'SESSION_RUNTIME' => 604800,
    'USE_GRAVATAR' => false,
    'GRAVATAR_DEFAULT_IMAGESET' => 'mm',
    'GRAVATAR_RATING' => 'pg',
    'AVATAR_SIZE' => 44,
    'AVATAR_JPEG_QUALITY' => 85,
    'AVATAR_DEFAULT_IMAGE' => 'default.jpg',
    'ENCRYPTION_KEY' => '6#x0gÊìf^25cL1f$08&',
    'HMAC_SALT' => '8qk9c^4L6d#15tM8z7n0%',
    'EMAIL_USED_MAILER' => 'phpmailer',
    'EMAIL_USE_SMTP' => false,
    'EMAIL_SMTP_HOST' => 'yourhost',
    'EMAIL_SMTP_AUTH' => true,
    'EMAIL_SMTP_USERNAME' => 'yourusername',
    'EMAIL_SMTP_PASSWORD' => 'yourpassword',
    'EMAIL_SMTP_PORT' => 465,
    'EMAIL_SMTP_ENCRYPTION' => 'ssl',
    'EMAIL_PASSWORD_RESET_URL' => 'login/verifypasswordreset',
    'EMAIL_PASSWORD_RESET_FROM_EMAIL' => 'no-reply@example.com',
    'EMAIL_PASSWORD_RESET_FROM_NAME' => 'Sistema Inteconsulta',
    'EMAIL_PASSWORD_RESET_SUBJECT' => 'Cambio de contraseña Inteconsulta',
    'EMAIL_PASSWORD_RESET_CONTENT' => 'Por favor haga click en el siguiente link para cambiar la contraseña de su cuenta: ',
    'EMAIL_VERIFICATION_URL' => 'register/verify',
    'EMAIL_VERIFICATION_FROM_EMAIL' => 'no-reply@example.com',
    'EMAIL_VERIFICATION_FROM_NAME' => 'Sistema Interconsulta',
    'EMAIL_VERIFICATION_SUBJECT' => 'Activación de cuenta Inteconsulta',
    'EMAIL_VERIFICATION_CONTENT' => 'Por favor haga click en el siguiente link para verificar su correo: ',
);
