<?php
require_once("php/header.php");
?>
<main id="main">

    <section class="banner">
        <div class="swiper">

            <div class="swiper-wrapper">
                <div class="swiper-slide slide-first">
                    <div class="slider-content-wrap">
                        <div class="text-slider-wrap">
                            <div class="slider row">
                                <div class="slider-text">
                                    <div class="slider-header">
                                        <p>Платите столько,<br>сколько можете</p>
                                    </div>
                                    <div class="slider-subtitle">
                                        <p>Мы принимаем платежи от 1500 рублей.</p>
                                        <p>Поможем подобрать сумму, которую сможете вносить в счёт погашения
                                            долга<br>без ущерба для
                                            бюджета.</p>
                                        <p>Подробности по бесплатному номеру
                                            <a href="tel:+7(804)333-41-33" class="corousel-number">
                                                <h4>8 804 333 41 33<h4>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div class="slider-img"><img src="img/main.svg" alt=""></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide slide-two">
                    <div class="slider-content-wrap">
                        <div class="text-slider-wrap">
                            <div class="slider row">
                                <div class="slider-text">
                                    <div class="slider-header">
                                        <p>Отзовем<br>исполнительное<br>производство</p>
                                    </div>
                                    <div class="slider-subtitle">
                                        <p>Мы готовы пойти вам на встречу. Приставы не спишут ваши средства<br>и не
                                            заблокируют
                                            банковские карты. Нужно только внести платёж.</p>
                                        <p>Подробности по бесплатному номеру
                                            <a href="tel:+7(804)333-41-33" class="corousel-number">
                                                <h4>8 804 333 41 33<h4>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div class="slider-img"><img src="img/main2.svg" alt=""></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"></div>

            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </section>
    <script type="text/javascript">const swiper = new Swiper('.swiper', {

            direction: 'horizontal',
            loop: true,

            initialSlide: 1,

            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            // Стрелки право-лево
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 7000,
                pauseOnMouseEnter: true,
            },
            speed: 1000,

        });
    </script>



    <section class="statistic-fluid">

        <div class="statistic">
            <div class="statistic-header">
                <span>с 2014</span>
                <div class="statistic-subtitel">
                    <p>года на рынке<br>взыскания</p>
                </div>
            </div>
            <div class="statistic-header">
                <span>100</span>
                <div class="statistic-subtitel">
                    <p>клиентов получают<br>рассрочку ежедневно</p>
                </div>
            </div>
            <div class="statistic-header">
                <span>100 тыс. </span>
                <div class="statistic-subtitel">
                    <p>клиентов исправили<br>кредитную историю</p>
                </div>
            </div>

            <div class="statistic-header">
                <span>с 2017</span>
                <div class="statistic-subtitel">
                    <p>года сертифицированы<br>ФССП</p>
                </div>
            </div>
        </div>
    </section>
  <!-- Модальное окно -->
  <div id="myModal" class="modal">
    <div class="modal-content">
      <button class="close-modal-btn" onclick="closeModal()">&times;</button> <!-- Кнопка закрытия -->

                    <div class="container-info-for-user">
                        <div class="block-text-for-user">
                            <table>
                                <tbody>
                                        <th colspan="2"><h2>Реквизиты</h2></th>
                                    
                                    <tr><td>Получатель: </td><td>ООО ФОРВАРД</td></tr>
                                    <tr><td>Счет получателя: </td><td>40702810212000116303</td></tr>
                                    <tr><td>БИК: </td><td>045004861</td></tr>
                                    <tr><td>Наименование банка: </td><td>АО «Экспобанк» в г. Новосибирске</td></tr>
									<tr><td>Корреспондентский счет: </td><td>30101810450040000861</td></tr>
									<tr><td>ИНН: </td><td>5406796664</td></tr>
									<tr><td>КПП: </td><td>540701001</td></tr>
									<tr><td>Назначение платежа: </td><td>укажите ФИО , номер КД</td></tr>


                                    
                                 </tbody>
                            </table>
                            </div>
                        <aside class="block-img-for-user">
							<span style="font-size: 16px;"> Оплата через приложение банка</span>
                            <img class=" lazyloaded" alt="тут была картинка" data-src="https://caforward.ru/img/forusers/QR-code_platiqr_6_Feb_2020_21-22-27.png" src="https://caforward.ru/img/forusers/QR-code_platiqr_6_Feb_2020_21-22-27.png">
                        </aside>
                    </div>
    </div>
  </div>

  <script>
    // Функция для открытия модального окна
    function openModal() {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
    }

    // Функция для закрытия модального окна
    function closeModal() {
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
    }
  </script>
</section>
<section class="our-service-wrapper">
<h1 class="our-service-title">Поможем каждому клиенту</h1>
</section>    
    <section>

        <div class="info-item_wrapper">
            <div class="cont-numb_container">
                <div class="cont-numb_title">Не знаете номер своего договора?<br>Свяжитесь с нами для его получения</div>
                <div class="cont-numb_btn"> <a href="#modal" onclick="activateRadio(1)">Узнать мой номер договора</a>
                </div>
            </div>
        </div>

        <div class="info-item_wrapper">
            <div class="unlock-score_container">
                <div class="unlock-score_title">Ваши счета заблокированы?<br>Мы поможем вам решить эту проблему</div>
                <div class="unlock-score_btn"> <a href="#modal" onclick="activateRadio(2)">Разблокировать мои счета</a>
                </div>
            </div>
        </div>
    </section>
        
    <section class="calculation" id="calculation">
        <div class="calculation_title">
            <p>Составить график погашений</p>
        </div>
        <div class="container">
            <div class="claculation_wrapper ">
                <div class="body_calc">
                    <div class="calc_container-wrapper">
                        <div class="calc_container">
                            <div class="calc_items calc_debt">                        
                                <div class="desr_wrapper">
                                    <p class="name">Сумма вашего долга</p>
                                    <input class="format_value debt" id="debtvalue"></input>
                                </div>
                                
                                <div class="rage_value">  
                                    <p class="min_r">от <span class="min_v">10&nbsp;000&nbsp;₽</span></p>
                                    <p class="max_r">до <span class="max_v">1&nbsp;000&nbsp;000&nbsp;₽</span></p>                            
                                </div>
                                <div class="debt-range-slider" id="debtSlider"></div>
                            </div>


     
                            <div class="calc_items calc_termin">                            
                                <div class="desr_wrapper">    
                                    <p class="name">Срок погашения</p>  
                                    <div class="input-wrap">
                                        <input class="format_value " id="formatvalue"></input>
                                        <p id="formatMonth"></p>   
                                    </div>                     
                                </div>
                                <div class="termin-range-slider" id="terminSlider">                                
                                </div>
                                <div class="rage_value">
                                    <p class="min_r">от <span class="min_v">1 месяца</span></p>
                                    <p class="max_r">до <span class="max_v">2 лет</span></p>                               
                                </div>
                            </div>   

                            <div class="calc_items calc_month">
                                <div class="desr_wrapper">
                                    <p class="name">Ежемесячный платеж</p>
                                    <div class="value_wrap"><p class="format_value " id="monthvalue"></p></div>
                                </div>
                            </div> 
      
                        </div>
                    </div>
                    <div class="personal_rebate_container">
                        <div class="title-rebate">Связаться с нами</div>
                        <div class="rebate_btn">
                            <button class="request" type="button" id="requestBtn" onclick="location.href='#modal'">Получить рассрочку</button>
                            <div class="CallNumber"><a href="num">
                                                <h4 style="font-size: 18px;">8 804 333 41 33<h4>
                            <figure>
                                <a href="mailto:dolg.info@caforward.ru?subject=Вопрос с сайта&body=Здравствуйте, " target="_blank" class="container-icon-contact">
                                    <i class="far fa-envelope"></i>
                                </a>
                                <figcaption>
                                <a href="mailto:dolg.info@caforward.ru?subject=Получить рассрочку&amp;body=Здравствуйте, " target="_blank" class="hvr-float-shadow" sty>dolg.info@caforward.ru</a>
                                </figcaption>
                            </figure>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </section>
    <section>
        <div class="info-item_wrapper item-sub">
            <div class="title-sub">
                <p>Связаться с нами</p>
            </div>
            <div class="cont-sub_container">
                <div class="cont-sub_title">Если у вас есть вопросы<br>Свяжитесь с нами</div>
                <div class="cont-sub_btn"> <a href="#modal" onclick="activateRadio(4)">Связаться с нами</a>
                </div>
            </div>
        </div>
    </section>
    <section id="ourservicelink" name="ourservice" class="our-services-container">
        <h1 name="our-service" class="our-service-title">
            Наши услуги
        </h1>
        <div class="our-service our-service-1">
            <div class="views-field-field-service-icon">
                <img class="lazyload" data-src="img/stok1.svg" alt="logo">
            </div>
            <div class="container-info-text">
                <h2 class="views-field-title">ПОКУПКА ЗАДОЛЖЕННОСТИ ПО КРЕДИТАМ ФИЗИЧЕСКИХ И ЮРИДИЧЕСКИХ ЛИЦ</h2>
                <p class="info-our-service">Основным направлением деятельности компании "Форвард" является приобретение
                    прав требований, возникающих из кредитных договоров, заключенных первоначальным кредитором
                    (продавцом) как с физическими, так и с юридическими лицами.</p>
            </div>
        </div>
        <div class="our-service our-service-2">
            <div class="views-field-field-service-icon">
                <img class="lazyload" data-src="img/stok2.svg" alt="logo">
            </div>
            <div class="container-info-text">
                <h2 class="views-field-title">ВЗЫСКАНИЕ ЗАДОЛЖЕННОСТИ ПО АГЕНТСКОЙ СХЕМЕ</h2>
                <p class="info-our-service">Взыскание задолженности по агентскому договору - это совокупность
                    досудебных, судебных и мер исполнительного производства по возврату (взысканию) дебиторской
                    задолженности по соглашению между агентом (одна сторона договора) и принципалом (другая сторона), по
                    которому агент за вознаграждение взял на себя обязанности по поручению принципала совершать любые
                    юридические и иные действия.</p>
            </div>
        </div>
        <div class="our-service our-service-3">
            <div class="views-field-field-service-icon">
                <img class="lazyload" data-src="img/stok3.svg" alt="logo">
            </div>
            <div class="container-info-text">
                <h2 class="views-field-title">ДОСУДЕБНОЕ ВЗЫСКАНИЕ</h2>
                <p class="info-our-service">Взыскание кредитной задолженности осуществляется в зависимости от
                    особенностей каждого случая. Наиболее простой и наименее затратный для должника метод взыскания
                    кредитной задолженности – досудебные переговоры, во время которых происходит урегулирование спорных
                    вопросов и закрепление порядка и сроков возврата долгов и выплат компенсаций.</p>
            </div>
        </div>
        <div class="our-service our-service-4">
            <div class="views-field-field-service-icon">
                <img class="lazyload" data-src="img/stok4.svg" alt="logo">
            </div>
            <div class="container-info-text">
                <h2 class="views-field-title">CУДЕБНОЕ ВЗЫСКАНИЕ</h2>
                <p class="info-our-service">Legal-collection - заключительная стадия работы с должником. Проводится
                    кредитором (его сотрудником или представителем) в рамках судопроизводства или исполнительного
                    производства. Как правило legal-collection осуществляется со 150-180-го дня с момента возникновения
                    просроченной задолженности и заканчивается вынесением судебного решения и его исполнением, либо
                    получением акта о невозможности взыскания и списанием задолженности.</p>
            </div>
        </div>
    </section>
    <section id="linkkompany" name="company" class="company-info">
        <h2>о компании</h2>
        <p>Компания "Форвард" создана в 2014 году в г. Новосибирске и предоставляет полный комплекс услуг по взысканию
            задолженности физических и юридических лиц. Основная специализация - покупка портфелей проблемных кредитов.
            Менеджеры компании имеют более чем 10-летний опыт работы на рынке взыскания задолженности и в крупных
            розничных банках.</p>
    </section>
    <section class="documents-container">
        <div class="documents-content">
            <figure>
                <a href="https://caforward.ru/documents/svo.pdf" target="_blank">
                    <img class="lazyload" data-src="https://caforward.ru/img/svo.jpg"
                        alt="Свидетельство о включении в Реестр юридических лиц, осуществляющих деятельность по возврату просроченной задолженности">
                </a>
                <a href="https://caforward.ru/documents/svo.pdf" class="title-docks" target="_blank">Свидетельство о
                    включении в Реестр юридических лиц, осуществляющих деятельность по возврату просроченной
                    задолженности
                </a>
            </figure>
            <figure>
                <a href="https://caforward.ru/documents/politicks.pdf" target="_blank">
                    <img class="lazyload" data-src="https://caforward.ru/img/politicks.png"
                        alt="Политика обработки персональных данных">
                </a>
                <a href="https://caforward.ru/documents/politicks.pdf" class="title-docks" target="_blank">Политика
                    обработки персональных данных</a>
            </figure>
        </div>
        <div class="documents-content">
            <figure>
                <a href="https://caforward.ru/documents/PPK.pdf" target="_blank">
                    <img class="lazyload" data-src="https://caforward.ru/img/PPK.png">
                </a>
                <a href="https://caforward.ru/documents/PPK.pdf" class="title-docks" target="_blank">Политика по
                    противодействию коррупции
                </a>
            </figure>
            <!-- <figure>
                     <a href="documents/politicks.pdf" target="_blank">
                         <img class=lazyload  alt=img"data-src="img/politicks.png">
                     </a>
                     <a href="documents/svo.pdf" class="title-docks" target="_blank">Политика персональных данных</a>
                 </figure>-->
        </div>
    </section>
</main>
<?php
require_once("php/footer.php");
?>
