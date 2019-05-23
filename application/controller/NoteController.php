<?php

class NoteController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        Auth::checkAuthentication();
    }

    public function index()
    {
        $this->View->render('note/index', array(
            'notes' => NoteModel::getAllNotes()
        ));
    }

    public function create()
    {
        NoteModel::createNote(Request::post('note_text'));
        Redirect::to('note');
    }

    public function edit($note_id)
    {
        $this->View->render('note/edit', array(
            'note' => NoteModel::getNote($note_id)
        ));
    }

    public function editSave()
    {
        NoteModel::updateNote(Request::post('note_id'), Request::post('note_text'));
        Redirect::to('note');
    }

    public function delete($note_id)
    {
        RespuestaModel::deleteNote($note_id);
        Redirect::to('note');
    }
}

//(Centro de mediación licitado Ministerio de Justicia)
//Comuna de loncoche, calle lord cochrane 
//153 of.3
//Pitrufquen
//teléfono +56 45 2 525 262

//https://www.google.com/maps/@-39.3698555,-72.633439,3a,75y,62.33h,59.78t/data=!3m6!1e1!3m4!1sVVc5ZJgX9x1d7zRbmkWtoQ!2e0!7i13312!8i6656
//https://www.facebook.com/Estudio-Juridico-Grilli-Abogados-Temuco-298735570272904/

//Manos y volcán

//-textos para la página web.
//-fotos de loncoche.
//-Averiguar quien administra el facebook
//-preguntas fecuentes
//-cambiar imágen de portada por manos más volcán

//Expon tu caso 1UF
//Consultas rápidas.