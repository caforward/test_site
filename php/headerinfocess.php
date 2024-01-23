<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(95726509, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true,
        ecommerce:"dataLayer"
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/95726509" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
    <!-- Google verification -->
    <meta name="google-site-verification" content="NUDgp6byrrn4kVQTYj9FdC_p5HVuUv6PcbdW8BtsYgU" />
    <!-- Google verification -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
    <!-- Chrome, Firefox, Opera -->
    <meta name="msapplication-config" content="../browserconfig.xml"/>
    <meta name="theme-color" content="#33BEE5">
    <!-- Windows Phone -->
    <meta name="msapplication-navbutton-color" content="#33BEE5">
    <!-- iOS Safari -->
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <title>Форвард: Финансовая Компания</title>
    <link rel="shortcut icon" href="../img/favicon.png" type="image/x-icon" />
	<meta name="description" content="Форвард: Финансовая Компания предоставляет полный комплекс услуг по взысканию задолженностей">
    <meta name="keywords" content="долг, коллекторам, Коллекторы, Банк, продал, избавиться, коллекторов, долги, Форвард, звонков, кредитный, сколько, решения, передан, помощь, суда, перед, Подают ">
    <link rel="stylesheet" href="../libs/bootstrap-4.3.1-dist/css/bootstrap.min.css" as="style" onload="this.rel='stylesheet'">
    <link rel="stylesheet" href="../libs/fontawesome-free-5.12.0-web/css/all.min.css" as="font" onload="this.rel='stylesheet'" crossorigin>
    <link rel="stylesheet" type="text/css" href="../css/remodal.min.css">
    <link rel="stylesheet" type="text/css" href="../css/remodal-default-theme.min.css">
    <link rel="stylesheet" type="text/css" href="../css/styledoljniki.min.css" as="style" onload="this.rel='stylesheet'">
	<link rel="stylesheet" type="text/css" href="../css/konraktstyle.min.css" as="style" onload="this.rel='stylesheet'">
</head>
<body>
<div class="container-fluid">
    <header id="header">
        <section class="navigation-wrapper-container adaptive-grid-container">
            <div class="container-link-img-home-page adaptive-container-link-img-home-page">
                <a href="https://caforward.ru/" id="logo" rel="home" title="На главную страницу сайта. Форвард: Финансовая Компания" class="link-img-home-page">
                    <img class="lazyload" data-src="https://caforward.ru/img/logo.png" alt="Форвард: Финансовая Компания">
                </a>
            </div>
            <nav id="nav-header" class="nav-header adaptive-nav-header">
                <ul>
                    <li>
                        <a href="https://caforward.ru/" class="hvr-underline-from-center">Главная</a>
                    </li>
                    <li>
                        <a id="ourservice" href="#ourservicelink" class="hvr-underline-from-center">Услуги</a>
                    </li>
                    <li>
                        <a id="kompany" href="#linkkompany" class="hvr-underline-from-center">О&nbsp;Компании</a>
                    </li>
                    <li>
                        <a href="/pages/info.php" class="hvr-underline-from-center">Клиентам</a>
                    </li>
					<li>
                        <a href="##" class="hvr-underline-from-center">Договоры Цессии</a>
					</li>
					<li>
                        <a href="https://invest.caforward.ru/" class="hvr-underline-from-center">Инвесторам</a>
                    </li>
                    <li>
                        <a href="#linkcontact" class="hvr-underline-from-center">Контакты</a>
                    </li>
                </ul>
            </nav>
            <div class="container-main-btn adaptive-container-main-btn">
                <a class="btn btn-danger btn-lg main-btn" href="#modal">Связаться с&nbsp;нами</a>
				<a class="btn btn-danger btn-lg main-btn2" href="https://caforward.ru/pages/info.php" class="container-info-for-user">Оплатить &nbsp;долг</a>
            </div>
            <div class="contact adaptive-contact">
                <span class="phone-number-header-container"><a href="tel:+7(804)333-41-33" target="_blank" class="hvr-buzz-out"><i class="fas fa-mobile-alt"></i> +7&nbsp;(804)&nbsp;333&#8209;41&#8209;33</a></span>
                <p>Звонок бесплатный</p>
                <span class="mail-header-container"><a href="mailto:info@caforward.ru?subject=Вопрос с сайта&body=Здравствуйте, " target="_blank" class="hvr-pulse-grow"><i class="far fa-envelope"></i> info@caforward.ru</a></span>
            </div>
        </section>
        <!-- MODAL WINDOWS -->
        <div class="remodal" data-remodal-id="modal" data-remodal-options="closeOnOutsideClick: false" role="dialog" aria-labelledby="modal1Title" aria-describedby="modal1Desc">
            <div class="remodalBorder">
                <p><img class="lazyload" data-src="https://caforward.ru/img/footer-logo-white.png" alt="Форвард: Финансовая Компания"></p>
                <button data-remodal-action="close" class="remodal-close" aria-label="Close"></button>
                <form id="form" method="POST">
                    <h2 id="modal1Title">Оставьте Ваши контактные данные и наша служба поддержки свяжется с Вами</h2>
                    <input type="text" class="putName" name="name" placeholder="Ваше ФИО*" pattern="^[А-Яа-яЁё\s]+$" required>
                    <input id="phone" name="phone" type="tel" class="putPhone" placeholder="Ваш телефон*" required>
                    <input name="mail" type="email" class="mail" placeholder="Ваш Email*" pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"required>
                    <textarea name="textarea"  class="textarea" placeholder="Ваш вопрос*" required></textarea>
                    <div class="checkbox">
				<input type="checkbox" id="checkbox_1">
                <label for="checkbox_1">
                    Я даю свое согласие на обработку моих персональных данных,
                    с условиями <!-- Button trigger modal -->
                    <a type="button" data-toggle="modal" data-target="#exampleModalLong">
                        <b><u>пользательского соглашения</u></b>
                    </a>
                    <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Согласие на обработку персональных данных</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    Согласие на обработку персональных данных<br>
                                    Настоящим в соответствии с требованиями Федерального закона № 152-ФЗ «О персональных данных» от 27.07.2006 года свободно, своей волей и в своем интересе выражаю свое безусловное согласие на обработку в ООО «ФОРВАРД», зарегистрированном в соответствии с законодательством РФ по адресу: 630007, г. Новосибирск, ул. Максима Горького, д. 51, этаж 2, пом. 8, 9, 9/1, 10, ОГРН 1145476156055, ИНН 5406796664 (далее «Оператор»), моих персональных данных, представленных в настоящем обращении и относящихся к перечисленным ниже категориям персональных данных:<br>
                                    - Фамилия;<br>
                                    - Имя;<br>
                                    - Отчество;<br>									
                                    - Номер телефона;<br>
                                    - E-mail.<br>
                                    <br>
                                    Я даю согласие на обработку персональных данных с целью обработки настоящего электронного обращения и предоставления информации о результатах его рассмотрения посредством электронной почты, телефонных обращений, sms-сообщений, направления почтовой корреспонденции.<br>
                                    <br>
                                    Под обработкой персональных данных, на которую мной выражено согласие, следует понимать любое действие (операция) или совокупность действий (операций) в отношении моих персональных данных, необходимых для достижения указанной выше цели и совершаемых с использованием средств автоматизации и/или без использования таких средств, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), блокирование, удаление, уничтожение персональных данных.<br>
                                    <br>
                                    Настоящее согласие действует до момента достижения цели обработки персональных данных или в течение срока хранения персональных в соответствии с законодательством РФ.<br>
                                    <br>
                                    Настоящее согласие может быть отозвано в любой момент по моему письменному заявлению.<br>
                                </div>
                                <div class="modal-footer">
                                </div>
                            </div>
                        </div>
                    </div>
                    </a> ознакомлен
                </label>
            </div>
                    <input id="butdis" type="submit" name="submit" class="btn main-btn-remodal" value="ОТПРАВИТЬ" disabled>
                    <input name="formInfo" class="formInfo" type="hidden" value=""/>
                    <input type="hidden" name="formData" value="Заявка с сайта">
                </form>
            </div>
        </div>

         <!-- MODAL WINDOWS -->
        
        <div class="remodal" data-remodal-id="modal1" data-remodal-options="closeOnOutsideClick: false" role="dialog" aria-labelledby="modal1Title" aria-describedby="modal1Desc">
            <div class="remodalBorder">
                <p><img class="lazyload" data-src="https://caforward.ru/img/footer-logo-white.png" alt="Форвард: Финансовая Компания"></p>
                <button data-remodal-action="close" class="remodal-close" aria-label="Close"></button>
                <img src="/img/alfa_bank.png" alt="bank" class="modalBtn">
                <img src="/img/Bank-VTB.png" alt="bank" class="modalBtn">
                <img src="/img/alfa_bank.png" alt="bank" class="modalBtn">
                
            </div>
            <input name="formInfo" class="formInfo" type="hidden" value=""/>
            <input type="hidden" name="formData" value="Заявка с сайта">
        </div>
    </header>