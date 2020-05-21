    await navigateAsync('https://lawyers-advokat.blogspot.com?m=0'); // Условно на данном сайте находится несколько фреймов.

    // Последовательно извлекаем необходимый фрейм. 
    // Сначала выбираем фрейм с индексом 0, затем вложенный в него фрейм, содержащий в URL текст ?query, затем вложенный в него фрейм с индексом 1
    let frame = await selectFrameAsync([0, 'https://catcut.net/aaa.php', 1]); 


    if(frame === null) {
        throw 'фрейм не был найден.';
    }
    else {
        // Выполняем следующие команды..
    }