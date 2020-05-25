async function move(frame)//Функция перемещения мыши к случайным ссылкам в документе
    {
        let qsa = (s) => frame.document.querySelectorAll(s);

        var mouseMoveCount=rndInt(1,4);//Делаем от одного до четырех перемещений мыши без кликов к любым случайным ссылкам

        for(x=0;x<mouseMoveCount;x++)
        {
            var els=qsa('a');//Выбираем все ссылки в документе. если нужны какие-то определенные ссылки, то вводим сюда соответствующий css-селектор.
            var el=rnd(els);//Из выбранных ссылок выбираем случайную

            await clickAsync(el,{onlyMove: true});//Перемещаем мышь к случайно выбранной ссылке. В случае необходимости скроллим документ.
            var pause=rndInt(1000,2500);//Делаем случайную паузу от 1 до 2.5 секунд между перемещениями мыши
            await waitAsync(pause);
        }
    }



        await paramsAsync("mouse",1);//Включаем фактическое перемещение мыши. Чтобы это работало, галочка "Разрешить использование мыши" должна быть включена в настройках сайта. Если не нужно, просто удаляем эту строчку.

    let qsa = (s) => frame.document.querySelectorAll(s);

    var baseUrl="https://gardenerbusiness.blogspot.com?m=0"; //Первый URL, на который нужно перейти
    var referrerUrls=["https://google.com","https://yandex.ru","" ,"https://mail.ru"];//Список URL-адресов, один из которых будет передан в качестве реферера.
    var referrerUrl=rnd(referrerUrls);//URL, который будет передан в качестве реферера.

    var frame=await navigateAsync(baseUrl,referrerUrl,{onFrame: "DOMContentLoaded"}); //делаем переход на заданный baseUrl с передачей referrerUrl в качестве реферера, а также ждем перезагрузки страницы

    var pause=rndInt(2500,5000);//Делаем случайную паузу от 2.5 до 5 секунд при загрузке главной страницы
    await waitAsync(pause);

    await move(frame);//Вызываем функцию случайного перемещения мыши по документу (описана выше)

    var clickCount=rndInt(1,4);//Делаем от одного до трех случайных кликов по ссылкам, содержащим слово jetswap

    for(x=0;x<clickCount;x++)
    {

        var els=qsa('a[href*="gardenerbusiness"]');//Выбираем все ссылки, содержащие слово lawyers
        var el=rnd(els);//Из выбранных ссылок выбираем случайную

        await clickAsync(el,{frameReloadEvent: "DOMContentLoaded"});//Кликаем по случайно выбранной ссылке и ждем перезагрузку страницы
        var pause=rndInt(1000,4000);//Делаем случайную паузу от 1 до 4 секунд
        await waitAsync(pause);

        await move(frame);//Вызываем функцию случайного перемещения мыши по документу (описана выше)
    }

