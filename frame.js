var baseUrl="https://catcut.net/adv/public.php?a=17863&b=&c=aHR0cHM6Ly9sYXd5ZXJzLWFkdm9rYXQuYmxvZ3Nwb3QuY29tLw==&d=b66197562cdff79588d49bfc0b101e38&f=aHR0cHM6Ly9sYXd5ZXJzLWFkdm9rYXQuYmxvZ3Nwb3QuY29tLw==&g=&h=*"; //Первый URL, на который нужно перейти

    var referrerUrl="https://lawyers-advokat.blogspot.com";//URL, который будет передан в качестве реферера.

    await navigateAsync(baseUrl,referrerUrl); //делаем переход на заданный baseUrl с передачей referrerUrl в качестве реферера

    var pause=rndInt(20000,30000);//Делаем случайную паузу от 20 до 30 секунд при загрузке главной страницы
    await waitAsync(pause);


await mouseMoveAsync(frame, 0, 0, 105, 92); // Переводим мышь из позиции 0x0 в позицию 500x500

var pause=rndInt(5000,10000);//Делаем случайную паузу от 15 до 30 секунд
await waitAsync(pause);

	await mouseClickAsync(frame, 105, 92); // Делаем клик по координатам 100x500


