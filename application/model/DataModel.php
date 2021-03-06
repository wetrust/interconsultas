<?php

class DataModel
{

    public static function lcn(){
        $values = array(
            array('11' => 35.5,'12' => 46.8,'13' => 58.2,'14' => 69.8),
            array('11' => 46.4,'12' => 60.8,'13' => 75.7,'14' => 89.1)
        );
        return $values;
    }
    public static function pesoFetal()
    {     
        $values = array(
           array('16' => 121,'17' => 150,'18' => 185,'19' => 227,'20' => 275,'21' => 331,'22' => 398,'23' => 471,'24' => 556,'25' => 652,'26' => 758,'27' => 876,'28' => 1004,'29' => 1145,'30' => 1294,'31' => 1453,'32' => 1621,'33' => 1794,'34' => 1973,'35' => 2154,'36' => 2335,'37' => 2513,'38' => 2686,'39' => 2851,'40' => 2985),
           array('16' => 171,'17' => 212,'18' => 261,'19' => 319,'20' => 387,'21' => 467,'22' => 559,'23' => 665,'24' => 784,'25' => 918,'26' => 1068,'27' => 1234,'28' => 1416, '29' => 1613,'30' => 1824,'31' => 2049,'32' => 2285,'33' => 2530,'34' => 2781,'35' => 3036,'36' => 3291,'37' => 3543,'38' => 3786,'39' => 4019,'40' => 4234)
        );

        return $values;
    }

    public static function ccca()
    {
        $values = array(
            array('15' => 1.1,'16' => 1.09,'17' => 1.08,'18' => 1.07,'19' => 1.06,'20' => 1.06,'21' => 1.05,'22' => 1.04,'23' => 1.03,'24' => 1.02,'25' => 1.01,'26' => 1,'27' => 1,'28' => 0.99,'29' => 0.98,'30' => 0.97,'31' => 0.96,'32' => 0.95,'33' => 0.95,'34' => 0.94,'35' => 0.93,'36' => 0.92,'37' => 0.91,'38' => 0.9,'39' => 0.89,'40' => 0.89),
            array('15' => 1.29,'16' => 1.28,'17' => 1.27,'18' => 1.26,'19' => 1.25,'20' => 1.24,'21' => 1.24,'22' => 1.23,'23' => 1.22,'24' => 1.21,'25' => 1.2,'26' => 1.19,'27' => 1.18,'28' => 1.18,'29' => 1.17,'30' => 1.17,'31' => 1.16,'32' => 1.15,'33' => 1.14,'34' => 1.13,'35' => 1.12,'36' => 1.11,'37' => 1.1,'38' => 1.09,'39' => 1.08,'40' => 1.08)
        );

        return $values;
    }

    public static function uterinas()
    {
        $values = array(
            array('10' => 1.23,'11' => 1.18,'12' => 1.11,'13' => 1.05,'14' => 0.99,'15' => 0.94,'16' => 0.89,'17' => 0.85,'18' => 0.81,'19' => 0.78,'20' => 0.74,'21' => 0.71,'22' => 0.69,'23' => 0.66,'24' => 0.64,'25' => 0.62,'26' => 0.6,'27' => 0.58,'28' => 0.56,'29' => 0.55,'30' => 0.54,'31' => 0.52,'32' => 0.51,'33' => 0.51,'34' => 0.51,'35' => 0.49,'36' => 0.48,'37' => 0.48,'38' => 0.47,'39' => 0.47,'40' => 0.47),
            array('10' => 2.84,'11' => 2.71,'12' => 2.53,'13' => 2.38,'14' => 2.24,'15' => 2.11,'16' => 1.99,'17' => 1.88,'18' => 1.79,'19' => 1.71,'20' => 1.61,'21' => 1.54,'22' => 1.47,'23' => 1.41,'24' => 1.35,'25' => 1.3,'26' => 1.25,'27' => 1.21,'28' => 1.17,'29' => 1.13,'30' => 1.11,'31' => 1.06,'32' => 1.04,'33' => 1.01,'34' => 0.99,'35' => 0.97,'36' => 0.95,'37' => 0.94,'38' => 0.92,'39' => 0.91,'40' => 0.91)
        );
        
        return $values;
    }

    public static function umbilical()
    {
        $values = array(
            array('20' => 0.97,'21' => 0.95,'22' => 0.94,'23' => 0.92,'24' => 0.9,'25' => 0.89,'26' => 0.87,'27' => 0.85,'28' => 0.82,'29' => 0.8,'30' => 0.78,'31' => 0.75,'32' => 0.73,'33' => 0.7,'34' => 0.67,'35' => 0.65,'36' => 0.62,'37' => 0.58,'38' => 0.55,'39' => 0.52,'40' => 0.49),
            array('20' => 1.6,'21' => 1.56,'22' => 1.53,'23' => 1.5,'24' => 1.46,'25' => 1.43,'26' => 1.4,'27' => 1.37,'28' => 1.35,'29' => 1.32,'30' => 1.29,'31' => 1.27,'32' => 1.25,'33' => 1.22,'34' => 1.2,'35' => 1.18,'36' => 1.16,'37' => 1.14,'38' => 1.13,'39' => 1.11,'40' => 1.09)
        );

        return $values;
    }
    
    public static function cerebralMedia()
    {
        $values = array(
            array('20' => 1.24,'21' => 1.29,'22' => 1.34,'23' => 1.37,'24' => 1.4,'25' => 1.43,'26' => 1.44,'27' => 1.45,'28' => 1.45,'29' => 1.44,'30' => 1.43,'31' => 1.41,'32' => 1.38,'33' => 1.34,'34' => 1.3,'35' => 1.25,'36' => 1.19,'37' => 1.13,'38' => 1.05,'39' => 0.98,'40' => 0.89),
            array('20' => 1.98,'21' => 2.12,'22' => 2.25,'23' => 2.36,'24' => 2.45,'25' => 2.53,'26' => 2.59,'27' => 2.63,'28' => 2.66,'29' => 2.67,'30' => 2.67,'31' => 2.65,'32' => 2.62,'33' => 2.56,'34' => 2.5,'35' => 2.41,'36' => 2.31,'37' => 2.2,'38' => 2.07,'39' => 1.92,'40' => 1.76)
        );

        return $values;
    }

    public static function cuocienteCerebroPlacentario()
    {
        $values = array(
            array('20' => 0.78,'21' => 0.87,'22' => 0.95,'23' => 1.02,'24' => 1.09,'25' => 1.15,'26' => 1.2,'27' => 1.24,'28' => 1.28,'29' => 1.31,'30' => 1.33,'31' => 1.35,'32' => 1.36,'33' => 1.36,'34' => 1.36,'35' => 1.34,'36' => 1.32,'37' => 1.3,'38' => 1.26,'39' => 1.22),
            array('20' => 1.68,'21' => 1.88,'22' => 2.06,'23' => 2.22,'24' => 2.36,'25' => 2.49,'26' => 2.6,'27' => 2.7,'28' => 2.78,'29' => 2.84,'30' => 2.89,'31' => 2.92,'32' => 2.93,'33' => 2.93,'34' => 2.91,'35' => 2.87,'36' => 2.82,'37' => 2.75,'38' => 2.67,'39' => 2.57)
        );

        return $values;
    }

    public static function cc()
    {
        $values = array(
            array('12' => 64,'13' => 74,'14' => 88,'15' => 100,'16' => 113,'17' => 126,'18' => 137,'19' => 149,'20' => 161,'21' => 172,'22' => 183,'23' => 194,'24' => 204,'25' => 214,'26' => 224,'27' => 233,'28' => 242,'29' => 250,'30' => 258,'31' => 267,'32' => 274,'33' => 280,'34' => 287,'35' => 293,'36' => 299,'37' => 303,'38' => 308,'39' => 311,'40' => 315),
            array('12' => 81,'13' => 94,'14' => 106,'15' => 120,'16' => 135,'17' => 150,'18' => 165,'19' => 179,'20' => 193,'21' => 206,'22' => 219,'23' => 232,'24' => 243,'25' => 256,'26' => 268,'27' => 279,'28' => 290,'29' => 300,'30' => 310,'31' => 319,'32' => 328,'33' => 336,'34' => 343,'35' => 351,'36' => 358,'37' => 363,'38' => 368,'39' => 373,'40' => 377)
        );

        return $values;
    }

    public static function ca()
    {
        $values = array(
            array('12' => 42,'13' => 52,'14' => 64,'15' => 75,'16' => 86,'17' => 97,'18' => 109,'19' => 119,'20' => 131,'21' => 141,'22' => 151,'23' => 161,'24' => 171,'25' => 181,'26' => 191,'27' => 200,'28' => 209,'29' => 218,'30' => 227,'31' => 236,'32' => 245,'33' => 253,'34' => 261,'35' => 269,'36' => 277,'37' => 285,'38' => 292,'39' => 299,'40' => 307),
            array('12' => 71,'13' => 79,'14' => 92,'15' => 102,'16' => 113,'17' => 127,'18' => 141,'19' => 155,'20' => 170,'21' => 183,'22' => 192,'23' => 209,'24' => 223,'25' => 235,'26' => 248,'27' => 260,'28' => 271,'29' => 284,'30' => 295,'31' => 306,'32' => 318,'33' => 329,'34' => 339,'35' => 349,'36' => 359,'37' => 370,'38' => 380,'39' => 389,'40' => 399)
        );

        return $values;
    }

    public static function lf()
    {
        $values = array(
            array('12' => 7,'13' => 9,'14' => 12,'15' => 15,'16' => 17,'17' => 21,'18' => 23,'19' => 26,'20' => 28,'21' => 30,'22' => 33,'23' => 35,'24' => 38,'25' => 40,'26' => 42,'27' => 44,'28' => 46,'29' => 48,'30' => 50,'31' => 52,'32' => 53,'33' => 55,'34' => 57,'35' => 59,'36' => 60,'37' => 62,'38' => 64,'39' => 65,'40' => 66),
            array('12' => 12,'13' => 14,'14' => 17,'15' => 20,'16' => 23,'17' => 27,'18' => 31,'19' => 34,'20' => 38,'21' => 40,'22' => 43,'23' => 47,'24' => 50,'25' => 52,'26' => 56,'27' => 58,'28' => 62,'29' => 64,'30' => 66,'31' => 68,'32' => 71,'33' => 73,'34' => 75,'35' => 78,'36' => 80,'37' => 82,'38' => 84,'39' => 86,'40' => 88)
        
        );

        return $values;
    }

    public static function lh()
    {
        $values = array(
            array('12' => 4.8,'13' => 7.6,'14' => 10.3,'15' => 13.1,'16' => 15.8,'17' => 18.5,'18' => 21.2,'19' => 23.8,'20' => 26.3,'21' => 28.8,'22' => 31.2,'23' => 33.5,'24' => 35.7,'25' => 37.9,'26' => 39.9,'27' => 41.9,'28' => 43.7,'29' => 45.5,'30' => 47.2,'31' => 48.9,'32' => 50.4,'33' => 52.1,'34' => 53.4,'35' => 54.8,'36' => 56.2,'37' => 57.6,'38' => 59.8,'39' => 60.4,'40' => 61.9),
            array('12' => 12.3,'13' => 15.1,'14' => 17.9,'15' => 20.7,'16' => 23.5,'17' => 26.3,'18' => 29.1,'19' => 31.6,'20' => 34.2,'21' => 36.7,'22' => 39.2,'23' => 41.6,'24' => 43.9,'25' => 46.1,'26' => 48.1,'27' => 50.1,'28' => 52.1,'29' => 53.9,'30' => 55.6,'31' => 57.3,'32' => 58.9,'33' => 60.5,'34' => 62.1,'35' => 63.5,'36' => 64.9,'37' => 66.4,'38' => 67.8,'39' => 69.3,'40' => 70.8)
        );

        return $values;
    }

    public static function cerebelo()
    {
        $values = array(
            array('15' => 12,'16' => 14,'17' => 15,'18' => 16,'19' => 17,'20' => 18,'21' => 19,'22' => 20,'23' => 21,'24' => 22,'25' => 24,'26' => 26,'27' => 27,'28' => 29,'29' => 30,'30' => 31,'31' => 33,'32' => 36,'33' => 37,'34' => 38,'35' => 40,'36' => 40,'37' => 40,'38' => 41,'39' => 42,'40' => 44),
            array('15' => 15,'16' => 16,'17' => 17,'18' => 18,'19' => 20,'20' => 20,'21' => 22,'22' => 23,'23' => 24,'24' => 26,'25' => 28,'26' => 30,'27' => 31,'28' => 33,'29' => 34,'30' => 37,'31' => 39,'32' => 41,'33' => 43,'34' => 46,'35' => 47,'36' => 49,'37' => 51,'38' => 51,'39' => 52,'40' => 52),
            array('15' => 18,'16' => 18,'17' => 19,'18' => 20,'19' => 22,'20' => 23,'21' => 25,'22' => 26,'23' => 27,'24' => 30,'25' => 32,'26' => 34,'27' => 34,'28' => 37,'29' => 38,'30' => 41,'31' => 43,'32' => 46,'33' => 48,'34' => 53,'35' => 56,'36' => 58,'37' => 60,'38' => 62,'39' => 62,'40' => 62)
        );

        return $values;
    }

    public static function bvm(){
        $values = array(
            array('16' => 23,'17' => 25,'18' => 27,'19' => 28,'20' => 29,'21' => 29,'22' => 30,'23' => 30,'24' => 30,'25' => 30,'26' => 30,'27' => 30,'28' => 30,'29' => 29,'30' => 29,'31' => 29,'32' => 29,'33' => 29,'34' => 28,'35' => 28,'36' => 27,'37' => 26,'38' => 24,'39' => 23,'40' => 21),
            array('16' => 59,'17' => 62,'18' => 64,'19' => 66,'20' => 67,'21' => 68,'22' => 68,'23' => 68,'24' => 68,'25' => 68,'26' => 68,'27' => 69,'28' => 69,'29' => 69,'30' => 69,'31' => 70,'32' => 71,'33' => 72,'34' => 72,'35' => 72,'36' => 71,'37' => 70,'38' => 68,'39' => 66,'40' => 62)
        );

        return $values;

        
    }

    public static function PesoNacionalRN()
    {
        $values = array(
            array('24' => 640, '25' => 666, '26' => 728, '27' => 822, '28' => 945, '29' => 1092, '30' => 1258, '31' => 1439, '32' => 1630, '33' => 1828, '34' => 2028, '35' => 2226, '36' => 2416, '37' => 2596, '38' => 2760, '39' => 2904, '40' => 3024, '41' => 3115, '42' => 3173),
            array('24' => 897, '25' => 963, '26' => 1070, '27' => 1214, '28' => 1390, '29' => 1592, '30' => 1815, '31' => 2053, '32' => 2303, '33' => 2558, '34' => 2813, '35' => 3064, '36' => 3304, '37' => 3529, '38' => 3734, '39' => 3913, '40' => 4061, '41' => 4173, '42' => 4243)
        );

        return $values;
    }

    public static function TallaNacionalRN()
    {
        $values = array(
            array('26' => 33.6,'27' => 34.7, '28' => 35.7, '29' => 36.5, '30' => 37.5, '31' => 38.6, '32' => 39.8, '33' => 41.1, '34' => 42.4, '35' => 43.6, '36' => 44.7, '37' => 45.8, '38' => 46.7, '39' => 47.5, '40' => 48.1, '41' => 48.2, '42' => 48.3),
            array('26' => 35.9,'27' => 37.1, '28' => 38.7, '29' => 40.3, '30' => 41.9, '31' => 43.5, '32' => 44.9, '33' => 46.4, '34' => 47.6, '35' => 48.8, '36' => 49.9, '37' => 50.8, '38' => 51.6, '39' => 52.2, '40' => 52.4, '41' => 52.5, '42' => 52.6)
        );

        return $values;
    }

    public static function IPNNacionalRN()
    {
        $values = array(
            array('24' => 1.79, '25' => 1.83, '26' => 1.87, '27' => 1.91, '28' => 1.95, '29' => 1.99, '30' => 2.04, '31' => 2.08, '32' => 2.12, '33' => 2.16, '34' => 2.2,  '35' => 2.25, '36' => 2.29, '37' => 2.33, '38' => 2.37, '39' => 2.41, '40' => 2.45, '41' => 2.5, '42' => 2.54),
            array('24' => 2.54, '25' => 2.57, '26' => 2.59, '27' => 2.62, '28' => 2.65, '29' => 2.68, '30' => 2.71, '31' => 2.74, '32' => 2.77, '33' => 2.8,  '34' => 2.83, '35' => 2.86, '36' => 2.89, '37' => 2.92, '38' => 2.95, '39' => 2.98, '40' => 3.01, '41' => 3.04, '42' => 3.07)
        );

        return $values;
    }

    public static function CraneoNacionalRN()
    {
        $values = array(
            array('24' => 207, '25' => 218, '26' => 229, '27' => 240, '28' => 250, '29' => 260, '30' => 269, '31' => 278, '32' => 287, '33' => 295, '34' => 302, '35' => 309, '36' => 315, '37' => 321, '38' => 326, '39' => 330, '40' => 334, '41' => 337, '42' => 340),
            array('24' => 234, '25' => 247, '26' => 260, '27' => 272, '28' => 284, '29' => 296, '30' => 306, '31' => 316, '32' => 325, '33' => 333, '34' => 340, '35' => 346, '36' => 352, '37' => 356, '38' => 360, '39' => 363, '40' => 365, '41' => 366, '42' => 367)
        );

        return $values;
    }
}