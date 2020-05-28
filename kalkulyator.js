catcherror=true;
check=true;

function CatchScriptErrors() {if (catcherror) {window.location.reload(); catcherror=true}}
//if (!netscape) window.onerror = CatchScriptErrors

//----------------------------
function punk (dosum) {
	um=""; lastletter=dosum.charAt(dosum.length-1); skoba1=skoba2=0;

	for (i=0; i<=dosum.length; i++) { // удаляем пробелы в сумме, заменяем зпт на тчк
		a=dosum.charAt(i);
		if (a==" ") um+="";
		else if (a=="," || a=="?") um+=".";
		else um+=a

		if (a=="(") skoba1++;    // определяем, сколько открытых и закрытых скоб
		else if (a==")") skoba2++
	}
	if (um=="") um=0

	if (/[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ]/.test(um) ) {
		var reg=/\D*(\d+)\D+(\d*)\D*/	// игнорируем руб., коп. и т.п.
		var abc=reg.exec(um)
		if (abc[2]!="") um=abc[1]+"."+abc[2];
		else um=abc[1]
	}

	if (lastletter=="+" || lastletter=="-") um+="0";
	else if (lastletter=="*" || lastletter=="/") um+="1";

	if (skoba1>skoba2) {
		for (i=0;i<(skoba1-skoba2);i++) {um+=")"}
	}
	if (skoba1<skoba2) {
		for (i=0;i<(skoba2-skoba1);i++) {um="("+um}
	}
	if (calcul==0) um=" " // ставим пробел, чтобы не обрезал последнее число
	for (i=0; i<=dosum.length; i++) {
		a=dosum.charAt(i);
		if (a=="(") skoba1++;    // определяем, сколько открытых и закрытых скоб еще раз
		else if (a==")") skoba2++
	}

	if (um.length==(skoba1+skoba2)) um=0
	if (um=="()") um=0

	check=false;
}
function okrugl(oraz) { // округление + к десяткам копеек добавляем ноль
	mult=Math.pow(10,2)
	var a=""+(Math.round(oraz*mult)/mult)
	if (a.indexOf(".")!=-1) {
		var b=a.substr(a.indexOf("."),a.length)
		if (b.length==2) a+="0"
	}
	return a	
}

function funk() {
	sum=document.getElementById('obsh').value
    document.getElementById('obsh2').value=""

//	if (check) punk(sum)

	if (sum.indexOf('+')!=-1 || sum.indexOf('-')!=-1 || sum.indexOf('/')!=-1 || sum.indexOf('*')!=-1) document.getElementById('obsh2').value=okrugl(eval(um))

//	sum=eval(um)

    var gosp1;
    var opis;
	if (sum<=20000) {
        gosp1=sum/100*4;
        if (gosp1<400) gosp1=400
		opis=1
    }
	if (sum>20000 && sum<=100000) {gosp1=(sum-20000)/100*3+800; opis=2}
	if (sum>100000 && sum<=200000) {gosp1=(sum-100000)/100*2+3200; opis=3}
	if (sum>200000 && sum<=1000000) {gosp1=(sum-200000)/100+5200; opis=4}
	if (sum>1000000) {gosp1=(sum-1000000)/200+13200; opis=5}
	if (gosp1>60000) gosp1=60000

	gosp1=okrugl(gosp1);

	document.getElementById('vivod').value=gosp1
	check=true

	pokaz="Согласно п.1 ч.1 ст.333.19 НК РФ при цене иска "
	var oraz="Соответственно, при цене иска "+sum+" руб. госпошлина составляет:\n"
	if (opis==1) {
        pokaz+="до 20000 руб. госпошлина составляет 4% от цены иска, но не менее 400 руб.\n"+oraz
		pokaz+="4% от "+sum+" = "+okrugl(sum/100*4)+" руб."
		if (sum/100*4<400) pokaz+=", но поскольку эта сумма меньше 400 руб., госпошлина = 400 руб."
		if (sum==0) pokaz="Сперва необходимо ввести цену иска"
	}
	if (opis==2) {
		pokaz+="от 20001 руб. до 100000 руб. госпошлина составляет 800 руб. плюс 3% суммы, превышающей 20000 руб.\n"+oraz
		pokaz+="800 + 3% от ("+sum+" - 20000) = 800 + "+okrugl((sum-20000)/100*3)+" = "+gosp1+" руб."
	}
	if (opis==3) {
		pokaz+="от 100001 руб. до 200000 руб. госпошлина составляет 3200 руб. плюс 2% суммы, превышающей 100000 руб.\n"+oraz
		pokaz+="3200 + 2% от ("+sum+" - 100000) =  3200 + "+okrugl((sum-100000)/100*2)+" = "+gosp1+" руб."
	}
	if (opis==4) {
		pokaz+="от 200001 руб. до 1000000 руб. госпошлина составляет 5200 руб. плюс 1% суммы, превышающей 200000 руб.\n"+oraz
		pokaz+="5200 + 1% от ("+sum+" - 200000) = 5200 + "+okrugl((sum-200000)/100)+" = "+gosp1+" руб." 
	}
	if (opis==5) {
		pokaz+="свыше 1000000 руб. госпошлина составляет 13200 руб. плюс 0.5% суммы, превышающей 1000000 руб., но не более 60000 руб.\n"+oraz
		pokaz+="13200 + 0.5% от ("+sum+" - 1000000) = 13200 + "+okrugl((sum-1000000)/200)+" = "+okrugl((sum-1000000)/200+13200)+" руб."
		if ((sum-1000000)/200+13200>60000) pokaz+=", но поскольку эта сумма превышает 60000 руб., госпошлина = 60000 руб."
	}
	document.getElementById('gppokazhi').value=pokaz

    var summ=document.getElementById('vivod').value
	if (summ.indexOf(".")==-1) summ+=".00"
	var reg=/(\d+).(\d+)/
	var rub=reg.exec(summ);
	document.getElementById('rrub').value=rub[1]
	document.getElementById('kkop').value=rub[2]
	sharelink()
}

function funk2() {
	sum=document.getElementById('arb').value
	document.getElementById('arb2').value=""

	if (check) punk(sum)

	if (sum.indexOf('+')!=-1 || sum.indexOf('-')!=-1 || sum.indexOf('/')!=-1 || sum.indexOf('*')!=-1) document.getElementById('arb2').value=okrugl(eval(um))

    var gosp2;
    var opis;
//    sum=eval(um)
	if (sum<=100000) {
		gosp2=sum/100*4;
		if (gosp2<2000) gosp2=2000
		opis=1
	}
	if (sum>100000 && sum<=200000) {gosp2=(sum-100000)/100*3+4000; opis=2}
	if (sum>200000 && sum<=1000000) {gosp2=(sum-200000)/100*2+7000; opis=3} // с 7 мая 41-ФЗ от 5 апреля
	if (sum>1000000 && sum<=2000000) {gosp2=(sum-1000000)/100+23000; opis=4}
	if (sum>2000000) {gosp2=(sum-2000000)/200+33000; opis=5}
	if (gosp2>200000) gosp2=200000

	gosp2=okrugl(gosp2)

	document.getElementById('vivod2').value=gosp2
	check=true

	pokaz="Согласно п.1 ч.1 ст.333.21 НК РФ при цене иска "
	var oraz="Соответственно, при цене иска "+sum+" руб. госпошлина составляет:\n"
	if (opis==1) {
                pokaz+="до 100000 руб. госпошлина составляет 4% цены иска, но не менее 2000 руб.\n"+oraz
		pokaz+="4% от "+sum+" = "+okrugl(sum/100*4)+" руб."
		if (sum/100*4<2000) pokaz+=", но поскольку эта сумма меньше 2000 руб., госпошлина = 2000 руб."
		if (sum==0) pokaz="Сперва необходимо ввести цену иска"
	}
	if (opis==2) {
        	pokaz+="от 100001 руб. до 200000 руб. госпошлина составляет 4000 руб. плюс 3% суммы, превышающей 100000 руб.\n"+oraz
		pokaz+="4000 + 3% от ("+sum+" - 100000) = 4000 + "+okrugl((sum-100000)/100*3)+" = "+gosp2+" руб."
	}
	if (opis==3) {
                pokaz+="от 200001 руб. до 1000000 руб. госпошлина составляет 7000 руб. плюс 2% суммы, превышающей 200000 руб.\n"+oraz
		pokaz+="7000 + 2% от ("+sum+" - 200000) = 7000 + "+okrugl((sum-200000)/100*2)+" = "+gosp2+" руб."
	}
	if (opis==4) {
                pokaz+="от 1000001 руб. до 2000000 руб. госпошлина составляет 23000 руб. плюс 1% суммы, превышающей 1000000 руб.\n"+oraz
		pokaz+="23000 + 1% от ("+sum+" - 1000000) = 23000 + "+okrugl((sum-1000000)/100)+" = "+gosp2+" руб."
	}
	if (opis==5) {
		pokaz+="свыше 2000000 руб. госпошлина составляет 33000 руб. плюс 0.5% суммы, превышающей 2000000 руб., но не более 200000 руб.\n"+oraz
		pokaz+="33000 + 0.5% от ("+sum+" - 2000000) = 33000 + "+okrugl((sum-2000000)/200)+" = "+okrugl((sum-2000000)/200+33000)+" руб."
		if ((sum-2000000)/200>200000) pokaz+=", но поскольку эта сумма превышает 200000 руб., госпошлина = 200000 руб."
	}
	document.getElementById('gppokazhi2').value=pokaz
}

function pastetoish(id) {
	document.getElementById(id).value=""; document.getElementById(id).focus(); document.selection.createRange().text = window.clipboardData.getData("Text"); document.selection.createRange().select(); document.getElementById(id).blur()
}
// ------------- квитанция
ssud='raj'

function printkvit() {
//mos-sud.ru/print_check.php?court=33&gp=5&summ=3666.66&name=1233&adress=							рай.суды
//mos360.ru/content/calc/print/index2.php?fio_print=&adres_print=&int_print=866&mod_print=66&printintval=2&muprint=5065 	мир.судьи

	var summ = document.getElementById('rrub').value+"."+document.getElementById('kkop').value
	var name = document.getElementById('myname').value;
	if (name=='') name='.'
	var adress = document.getElementById('myadress').value;
	if (adress=='') adress='.'
	if (ssud=='raj' || ssud=='mosgorsud' || ssud=='hz') {
		if (ssud=='raj') var court = document.getElementById('rsm').options[document.getElementById('rsm').selectedIndex].value;
		if (ssud=='mosgorsud') var court = 1000;
		if (ssud=='hz') var court = 999
		theLoc = "http://mos-sud.ru/print_check.php?court=" + court + "&gp=5&summ=" + summ + "&name=" + name + "&adress=" + adress;
	}
	if (ssud=='mir') {
		var court = document.getElementById('mirsud').options[document.getElementById('mirsud').selectedIndex].value;
		name=krakozyabra(name)
		adress=krakozyabra(adress)
		theLoc = "http://mos360.ru/content/calc/print/index2.php?fio_print=" + name + "&adres_print=" + adress + "&int_print=" + document.getElementById('rrub').value + "&mod_print=" + document.getElementById('kkop').value + "&printintval=2&muprint=" + court;
	}
	if (ssud=='dr' || ssud=='rajspb') {
                drsudd()
		if (name=='.') name='&nbsp;'
		if (adress=='.') adress='&nbsp;'
		theLoc = "" + selfmadekvit(ufk,kpp,innpol,rs,gders,bik,kbk,naznachenie,okato,name,adress,rub,kop)
		wLife=window.open()
		wLife.document.open()
		wLife.document.writeln(theLoc)
		wLife.document.close()
		wLife=0
	}
	if (ssud!='dr' && ssud!='rajspb') {
		if (summ==".") {alert('Сперва необходимо указать размер госпошлины'); return false;}
		openSmallWindow(theLoc,'kvitancia','scrollbars=no,resizable=yes','730','560','true')
	}
}

function drsudd() {
	ufk = document.getElementById('ufk1').value
	kpp = "" + document.getElementById('kpp1').value
	innpol = "" + document.getElementById('innpol1').value
	rs = "" + document.getElementById('rs1').value
	gders = document.getElementById('gders1').value
	bik = "" + document.getElementById('bik1').value
	kbk = "" + document.getElementById('kbk1').value
	naznachenie = document.getElementById('naznachenie1').value
	okato = document.getElementById('okato1').value
	rub = document.getElementById('rrub').value
	kop = document.getElementById('kkop').value
}

function openSmallWindow(theLocation,windowName,winOptions, myWidth, myHeight, isCenter) {
	if(window.screen)if(isCenter)if(isCenter=="true"){
		var myLeft = (screen.width-myWidth)/2;
		var myTop = (screen.height-myHeight)/2;
		winOptions+=(winOptions!='')?',':'';
		winOptions+=',left='+myLeft+',top='+myTop;
	}
	window.open(theLocation,windowName,winOptions+((winOptions!='')?',':'')+'width='+myWidth+',height='+myHeight);
}

function viborsuda(a) {
	if (a==0) {
		ssud='hz';
		document.getElementById('rajormir').style.display='none';
		document.getElementById('rsm').style.display='none';
		document.getElementById('msm').style.display='none';
		document.getElementById('drsud').style.display='none';
		document.getElementById('rsspb2').style.display='none';
		document.getElementById('linkrajspb').style.display='none'
	}
	if (a==1) {
		ssud='mosgorsud';
		document.getElementById('rajormir').style.display='none';
		document.getElementById('rsm').style.display='none';
		document.getElementById('msm').style.display='none';
		document.getElementById('drsud').style.display='none';
		document.getElementById('rsspb2').style.display='none';
	}
	if (a==2) {
		ssud='raj';
		document.getElementById('rajormir').style.display='block';
		document.getElementById('rsm').style.display='block';
		document.getElementById('msm').style.display='none';
		document.getElementById('drsud').style.display='none';
		document.getElementById('rsspb2').style.display='none';
	}
	if (a==3) {
		ssud='mir';
		document.getElementById('rajormir').style.display='block';
		document.getElementById('rsm').style.display='none';
		document.getElementById('msm').style.display='block';
		document.getElementById('drsud').style.display='none';
		document.getElementById('rsspb2').style.display='none';
	}
	if (a==4) {
		ssud='dr';
		document.getElementById('rajormir').style.display='none';
		document.getElementById('rsm').style.display='none';
		document.getElementById('msm').style.display='none';
		document.getElementById('drsud').style.display='block';
		document.getElementById('rsspb2').style.display='none';

        	document.getElementById('ufk1').value=document.getElementById('innpol1').value=document.getElementById('kpp1').value=document.getElementById('rs1').value=document.getElementById('gders1').value=document.getElementById('bik1').value=document.getElementById('okato1').value=""
	}
	if (a==5) {
        	ssud='rajspb';
		document.getElementById('rajormir').style.display='block';
		document.getElementById('rsm').style.display='none';
		document.getElementById('msm').style.display='none';
		document.getElementById('drsud').style.display='block';
		document.getElementById('rsspb2').style.display='block';

		document.getElementById('ufk1').value=document.getElementById('innpol1').value=document.getElementById('kpp1').value=document.getElementById('okato1').value=""
        	document.getElementById('rs1').value = '40101810200000010001'
		document.getElementById('gders1').value = 'ГРКЦ ГУ Банка России по г.Санкт-Петербургу'
		document.getElementById('bik1').value = '044030001'
		document.getElementById('rsspb').value=""

	}
	if (a!=document.getElementById('rekvizit').value) document.getElementById('rekvizit').value=a 
}

dos="абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ" // а=%D0%B0
eng="f?dult??pb?rkvyjghcnea?wxio?sm??zF?DULT??PB?RKVYJGHCNEA?WXIO?SM??Z"
win="D0B0D0B1D0B2D0B3D0B4D0B5D191D0B6D0B7D0B8D0B9D0BAD0BBD0BCD0BDD0BED0BFD180D181D182D183D184D185D186D187D188D189D18AD18BD18CD18DD18ED18FD090D091D092D093D094D095D081D096D097D098D099D09AD09BD09CD09DD09ED09FD0A0D0A1D0A2D0A3D0A4D0A5D0A6D0A7D0A8D0A9D0AAD0ABD0ACD0ADD0AED0AF"

function krakozyabra(ishodnik) {
	var itog=''
	for (i=0; i<ishodnik.length; i++) {
		var s=ishodnik.charAt(i)
		var a=dos.indexOf(s)
		if (a!=-1) itog+="%"+win.charAt(a*4)+win.charAt(a*4+1)+"%"+win.charAt(a*4+2)+win.charAt(a*4+3);
		else if (s==" ") itog+="%20" 
		else itog+=s
	}
	return itog;
}

function shifr(ishodnik) {
	var itog=''
	for (i=0; i<ishodnik.length; i++) {
		var s=ishodnik.charAt(i)
		var a=dos.indexOf(s)
		var f=0
		if (a!=-1 && eng.charAt(a)!='?') {itog+=eng.charAt(a);f++}
		if (eng.charAt(a)=='?') {itog+=win.charAt(a*4)+win.charAt(a*4+1)+win.charAt(a*4+2)+win.charAt(a*4+3); f++}
		if (s==" ") {itog+="%20"; f++}
		if (s=="<") {itog+="&lt;"; f++}
		if (s=="&") {itog+="&amp;"; f++}
		if (s=="#") {itog+="%n"; f++}
		if (s=="№") {itog+="%N"; f++}
		if (f==0) itog+=s
	}
	return itog;
}

//йхъжэбюёЙХЪЖЭБЮЁ
// D0B9 D185 D18A D0B6 D18D D0B1 D18E D191 D099 D0A5 D0AA D096 D0AD D091 D0AE D081

mena1=new Array('%n','%N','&lt;','&amp;','%20','D0B9','D185','D18A','D0B6','D18D','D0B1','D18E','D191','D099','D0A5','D0AA','D096','D0AD','D091','D0AE','D081')
mena2=new Array('#','№','<','&',' ','й','х','ъ','ж','э','б','ю','ё','Й','Х','Ъ','Ж','Э','Б','Ю','Ё')

function unshifr(ishodnik) {
	var itog=''
	var oraz=ishodnik
	for (i=0; i<mena1.length;i++) {
        	oraz=oraz.replace(new RegExp (mena1[i], 'g'), mena2[i]);
	}
	for (i=0; i<oraz.length; i++) {
		var s=oraz.charAt(i)
		var a=eng.indexOf(s)
		if (a!=-1) itog+=dos.charAt(a)
		else itog+=s		
	}
	return itog;
}

function numbertocell(ish,wwidth) {
	var oraz=""
	for (i=0; i<ish.length; i++) {
		oraz+="<td class='cell' width='"+wwidth+"%' align='center'>"
		oraz+=ish.charAt(i)
		oraz+="</td>"	
	}
	return oraz;
}

function selfmadekvit(ufk,kpp,innpol,rs,gders,bik,kbk,naznachenie,okato,fio,adres,rub,kop) {
	var a="<head><meta http-equiv='Content-Type' content='text/html; charset=windows-1251' /><title>Оплата госпошлины</title><style type='text/css'>@media screen {.myprim { display: block }} @media print {.myprim { display: none }} .nowr { white-space: nowrap; }td { padding: 0; border: 0;}table { border: none; }img { border: none; }form { margin: 0px; padding: 0px; }sup { font-size: 66%;line-height: .5; }li { list-style: square outside; padding: 0px; margin: 0px; }ul { list-style: square outside; padding: 0em 0em 0em 0em; margin: 0em 0em 0em 1.5em; }.fakelink { cursor: pointer; }.centered { margin-left: auto; margin-right: auto; }.zerosize { font-size: 1px; }.w100 { width: 100%; }.h100 { height: 100%; }.underlined { text-decoration: underline; }.bolded { font-weight: bold; }body { background-color: white; margin: 0px; }.ramka { border-top: black 1px dashed; border-bottom: black 1px dashed; border-left: black 1px dashed; border-right: black 1px dashed; margin: 4mm;  }.kassir { font-weight: bold; font-size: 10pt; font-family: 'Times New Roman', serif; padding: 7mm 0 7mm 0; text-align: center; }.cell { font-family: Arial, sans-serif; border-left: black 1px solid; border-bottom: black 1px solid; border-top: black 1px solid; font-weight: bold; font-size: 8pt; line-height: 1.1; height: 4mm; vertical-align: bottom; }.cells { border-right: black 1px solid; }.subscript { font-size: 6pt; font-family: 'Times New Roman', serif; line-height: 1; vertical-align: top; text-align: center; }.string, .dstring { font-weight: bold; font-size: 8pt; font-family: Arial, sans-serif; border-bottom: black 1px solid; text-align: center; vertical-align: bottom; }.dstring { font-size: 9pt; letter-spacing: 1pt; }.floor { vertical-align: bottom; padding-top: 0.5mm; }.stext { font-size: 8.5pt; font-family: 'Times New Roman', serif; vertical-align: bottom; }.stext7 { font-size: 7.5pt; font-family: 'Times New Roman', serif; vertical-align: bottom; }#d_clip_button {text-align:center; border:1px solid black; background-color:#ccc; margin:10px; padding:10px; }#d_clip_button.hover { background-color:#eee; }#d_clip_button.active { background-color:#aaa; }</style></head><body style='text-align: center;' onLoad='print(document)'><div  id='clip_text'><table class='ramka' cellspacing='0' cellpadding='0' style='width: 180mm;  margin-left: auto; margin-right: auto;'><tr><td style='width: 50mm; height: 65mm; border-bottom: black 1.5px solid;'><table style='width: 50mm; height: 100%;' cellpadding='0' cellspacing='0'><tr><td class='kassir' style='vertical-align: top; letter-spacing: 0.2em;'>Извещение</td></tr><tr><td class='kassir' style='vertical-align: bottom;'>Кассир</td></tr></table>  </td><td style='width: 130mm; height: 65mm; padding: 0mm 4mm 0mm 3mm; border-left: black 1.5px solid; border-bottom: black 1.5px solid;'>" 
	var b="<table cellpadding='0' cellspacing='0' align='center' style='width: 123mm; height: 100%'><tr><td><table style='width: 100%; height: 100%;'  cellspacing='0' cellpadding='0'><tr><td align='left' style='height: 5mm;'>&nbsp;</td><td class='stext7' style='text-align: right; vertical-align: middle;'><i>Форма &#8470; ПД-4</i></td></tr></table></td></tr><tr><td><table style='width: 100%; height: 100%;' cellpadding='0' cellspacing='0'><tr><td class='string'><span class='nowr'>"
	b+=ufk; //УФК по г. Москве  (ИФНС России № 8 по г.Москве )
	b+="</span></td><td class='string nowr' style='width: 1mm;'>&nbsp;КПП:&nbsp;"
	b+=kpp; //770801001
	b+="</td></tr></table></td></tr><tr><td class='subscript nowr'>(наименование получателя платежа)</td></tr><tr><td><table cellspacing='0' cellpadding=0 width='100%'><tr><td width='30%' class='floor'><table class='cells' cellspacing='0' cellpadding='0' width='100%'><tr>"
	b+=numbertocell(innpol,10) // ИНН получателя платежа
	b+="</tr></table></td><td width='10%' class='stext7'>&nbsp;</td><td width='60%' class='floor'><table class='cells' cellspacing='0' cellpadding='0' width='100%'><tr>"
	b+=numbertocell(rs,5) // номер счета получателя платежа
	b+="</tr></table></td></tr><tr><td class='subscript nowr'>(ИНН получателя платежа)</td><td class='subscript'>&nbsp;</td><td class='subscript nowr'>(номер счета получателя платежа)</td></tr></table></td></tr><tr><td><table cellspacing='0' cellpadding='0' width='100%'><tr><td width='2%' class='stext'>в</td><td width='64%' class='string'><span class='nowr'>"
	b+=gders; // наименование банка получателя платежа, например: Отделение 1 Московского ГТУ Банка России
	b+="</span></td><td width='7%' class='stext' align='right'>БИК&nbsp;</td><td width='27%' class='floor'><table class='cells' cellspacing='0' cellpadding='0' width='100%'><tr>"
	b+=numbertocell(bik,11) // БИК банка получателя платежа
	b+="</tr></table></td></tr><tr><td class='subscript'>&nbsp;</td><td class='subscript nowr'>(наименование банка получателя платежа)</td></tr></table></td></tr><tr><td><table cellspacing='0' cellpadding='0' width='100%'><tr><td class='stext7 nowr' width='40%' align='right'>КБК&nbsp;</td><td width='60%' class='floor'><table class='cells' cellspacing='0' cellpadding='0' width='100%'><tr>"
	b+=numbertocell(kbk,5) // КБК = '18210803010011000110'
	b+="</tr></table></td></tr></table></td></tr><tr><td><table cellspacing='0' cellpadding='0' width='100%'><tr><td class='string' width='55%'><span class='nowr'>"
	b+=naznachenie; // назначение платежа, например: Оплата госпошлины
	b+="</span></td><td class='stext7' width='5%'>&nbsp;</td><td class='string' width='40%'><span class='nowr'>"
	b+=okato; // ОКАТО, например: 45286565000
	b+="</span></td></tr><tr><td class='subscript nowr'>(наименование платежа)</td><td class='subscript'>&nbsp;</td><td class='subscript nowr'>(ОКАТО)</td></tr></table></td></tr><tr><td><table cellspacing='0' cellpadding='0' width='100%'><tr><td class='stext' width='1%'>Ф.И.О&nbsp;плательщика&nbsp;</td><td class='string'><span class='nowr'>"
	b+=fio // ФИО плательщика
	b+="</span></td></tr></table></td></tr><tr><td><table cellspacing='0' cellpadding='0' width='100%'><tr><td class='stext' width='1%'>Адрес&nbsp;плательщика&nbsp;</td><td class='string'>"
	b+=adres // адрес плательщика
	b+="</td></tr></table></td></tr><tr><td><table cellspacing='0' cellpadding='0' width='100%'><tr><td class='stext' width='1%'>Сумма&nbsp;платежа&nbsp;</td><td class='string' width='8%'>"
	b+=rub // рублей
	b+="</td><td class='stext' width='1%'>&nbsp;руб.&nbsp;</td><td class='string' width='8%'>"
	b+=kop // копеек
	b+="</td><td class='stext' width='1%'>&nbsp;коп.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Сумма&nbsp;платы&nbsp;за&nbsp;услуги&nbsp;</td><td class='string' width='8%'>00</td><td class='stext' width='1%'>&nbsp;руб.&nbsp;</td><td class='string' width='8%'>00</td><td class='stext' width='1%'>&nbsp;коп.</td></tr></table></td></tr><tr><td><table cellspacing='0' cellpadding='0' width='100%'><tr><td class='stext' width='5%'>Итого&nbsp;</td><td class='string' width='8%'>"
	b+=rub;
	b+="</td><td class='stext' width='5%'>&nbsp;руб.&nbsp;</td><td class='string' width='8%'>"
	b+=kop;
	b+="</td><td class='stext' width='5%'>&nbsp;коп.&nbsp;</td><td class='stext' width='20%' align='right'>&laquo;&nbsp;</td><td class='string' width='8%'>&nbsp;</td><td class='stext' width='1%'>&nbsp;&raquo;&nbsp;</td><td class='string' width='20%'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td class='stext' width='3%'>&nbsp;20&nbsp;</td><td class='string' width='5%'>&nbsp;</td><td class='stext' width='1%'>&nbsp;г.</td></tr></table></td></tr><tr><td class='stext7' style='text-align: justify'>С условиями приема указанной в платежном документе суммы, в т.ч. с суммой взимаемой платы за&nbsp;услуги банка,&nbsp;ознакомлен&nbsp;и&nbsp;согласен.</td></tr><tr><td style='padding-bottom: 0.5mm;'><table cellspacing='0' cellpadding='0' width='100%'><tr><td class='stext7' width='50%'>&nbsp;</td><td class='stext7' width='1%'><b>Подпись&nbsp;плательщика&nbsp;</b></td><td class='string' width='40%'>&nbsp;</td></tr></table></td></tr></table>"
	a+=b;
	a+="</td></tr><tr><td style='width: 50mm; height: 65mm;'><table style='width: 50mm; height: 100%;' cellpadding='0' cellspacing='0'><tr><td class='kassir' style='vertical-align: top; letter-spacing: 0.2em;'>Квитанция</td></tr><tr><td class='kassir' style='vertical-align: bottom;'>Кассир</td></tr></table></td><td style='width: 130mm; height: 65mm; padding: 4mm 4mm 0mm 3mm; border-left: black 1.5px solid;'>"
	a+=b;
	a+="</td></tr></table></div>"

	if (msie) a+="<div><a href=# onclick=document.execCommand('SaveAs','1',null) title='Сохранить квитанцию'>Сохранить</a></div>"
	if (!msie) a+="<div><span class=myprim><b>Сtrl</b>+<b>S</b> - Сохранить квитанцию</span></div>"
	a+="</body></html>"
	return a;
}

function sharelink() {
	drsudd()
	var a= "http://razvod-razvod.ru" + "#v=" + document.getElementById('rekvizit').options[document.getElementById('rekvizit').selectedIndex].value
	if (ssud=='raj') {
		var oraz=document.getElementById('rsm').value
		if (oraz!="" && oraz!="999") a+= "#rm=" + oraz	
	}
	if (ssud=='mir') {
		var oraz=document.getElementById('mirsud').value
		if (oraz!="")	a+= "#rm=" + oraz
	}
	if (ssud=='dr') {
        	if (ufk!="")	a+= "#u=" + shifr(ufk)
		if (innpol!="") a+= "#i=" + innpol
		if (kpp!="")	a+= "#k=" + kpp
		if (rs!="")	a+= "#r=" + rs
		if (gders!="")	a+= "#g=" + shifr(gders)
		if (bik!="")	a+= "#b=" + bik
		if (kbk!="18210803010011000110") a+= "#j=" + kbk
		if (okato!="")	a+= "#o=" + okato
		if (naznachenie!="Оплата госпошлины") a+= "#n=" + shifr(naznachenie)
	}
	if (ssud=='rajspb') {
		var b=document.getElementById('rsspb').value
		if (b!="") {
			a+= "#rm=" + b
			b=eval(b)
			oraz='УФК по СПб (' + spbraj[b][3] + ' по СПб)'
			if (ufk!=oraz)			a+= "#u=" + shifr(ufk)
			if (innpol!=spbraj[b][5])	a+= "#i=" + innpol
			if (kpp!=spbraj[b][4])		a+= "#k=" + kpp
			if (kbk!="18210803010011000110")a+= "#j=" + kbk
			if (okato!=spbraj[b][6])	a+= "#o=" + okato			
		}
		if (rs!='40101810200000010001')		a+= "#r=" + rs
		if (gders!='ГРКЦ ГУ Банка России по г.Санкт-Петербургу') a+= "#g=" + shifr(gders)
		if (bik!='044030001')			a+= "#b=" + bik
		if (naznachenie!="Оплата госпошлины")	a+= "#n=" + shifr(naznachenie)
	}
	var oraz = rub + "." + kop
	if (oraz!=".") a+= "#s=" + oraz
	if (document.getElementById('myname').value!="") a+= "#f=" + shifr(document.getElementById('myname').value)
	if (document.getElementById('myadress').value!="") a+= "#a=" + shifr(document.getElementById('myadress').value)
	document.getElementById('ssharelink').value=a;
	if (opera) document.getElementById('clck2').style.display='none'
}

function fillshablon(a) {
	if (a=="") {
		document.getElementById('linkrajspb').style.display='none';
		document.getElementById('ufk1').value=document.getElementById('kpp1').value=document.getElementById('innpol1').value=document.getElementById('okato1').value=''
	}
	else {
		a=eval(a)
		document.getElementById('linkrajspb').style.display='block';
		linktorekvizit="http://" + spbraj[a][1] + ".spb.sudrf.ru/modules.php?name=information&id=" + spbraj[a][2]
		if (a==23) linktorekvizit="http://" + spbraj[a][1] + ".spb.sudrf.ru/modules.php?name=information&rid=" + spbraj[a][2] // Смольнинский &rid= вместо &id=
		document.getElementById('ufk1').value = 'УФК по СПб (' + spbraj[a][3] + ' по СПб)'
		document.getElementById('kpp1').value = spbraj[a][4]
		document.getElementById('innpol1').value = spbraj[a][5]
		document.getElementById('okato1').value = spbraj[a][6]
	}
	document.getElementById('rs1').value = '40101810200000010001'
	document.getElementById('gders1').value = 'ГРКЦ ГУ Банка России по г.Санкт-Петербургу'
	document.getElementById('bik1').value = '044030001'
	document.getElementById('kbk1').value = '18210803010011000110'
	document.getElementById('naznachenie1').value = 'Оплата госпошлины'
}

spbraj=new Array() //название,для сайта-2, уфк,			кпп,		инн,	окато 
spbraj[1]=new Array('Ленинский','lnn',49,'МИ ФНС России №8','783801001','7838000026','40262565000')
spbraj[2]=new Array('Октябрьский','oktibrsky',20,'Межрайонная ИФНС России №7','783801001','7838000019','40262563000')
spbraj[3]=new Array('Василеостровский','vos',20,'МИФНС России № 16','780101001','7801045990','40263562000')
spbraj[4]=new Array('Выборгский','vbr',20,'МИ ФНС России №17','780201001','7802036276','40265561000')
spbraj[5]=new Array('Кировский','krv',110,'МИФНС России № 19 по Кировскому р-ну','780501001','7805035070','40276565000')
spbraj[6]=new Array('Кронштадтский','krn',20,'МИ ФНС России №12','784301001','7843000014','40280501000')
spbraj[7]=new Array('Московский','msk',20,'ИФНС №23 по Московскому р-ну','781001001','7810000001','40284561000')
spbraj[8]=new Array('Ломоносовский','lmn',20,'МИФНС России № 3','781901001','7819022218','40290502000')
spbraj[9]=new Array('Невский','nvs',20,'МИФНС России 24','781101001','7811047958','40285561000')
spbraj[10]=new Array('Калининский','kln',60,'Межрайонная  ИФНС России № 18','780401001','7804045452','40273563000')
spbraj[11]=new Array('Колпинский','klp',20,'Межрайонная ИФНС России № 20','781701001','7817003690','40277501000')
spbraj[12]=new Array('Красногвардейский','kgv',86,'Межрайонная ИФНС России № 21','780601001','7806043316','40278562000')
spbraj[13]=new Array('Красносельский','ksl',45,'Межрайонная ИФНС России №22','780701001','7807019690','40279501000')
spbraj[14]=new Array('Зеленогорский','zgr',20,'МИ ФНС России №12','784301001','7843000014','40281509000')
spbraj[15]=new Array('Фрунзенский','frn',20,'Межрайонная ИФНС России №27','781601001','7816094165','40296561000')
spbraj[16]=new Array('Петроградский','pgr',20,'МИФНС №25','781301001','7813085660','40288561000')
spbraj[17]=new Array('Петродворцовый','pdv',48,'Межрайонная ИФНС России № 3','781901001','7819022218','40290501000')
spbraj[18]=new Array('Приморский','primorsky',1,'МИФНС России № 26','781401001','7814026829','40270562000')
spbraj[19]=new Array('Пушкинский','psh',20,'МИФНС России по Пушкинскому р-ну и г.Павловску №2','782001001','7820027250','40294501000')
spbraj[20]=new Array('Сестрорецкий','srt',20,'МИ ФНС России №12','784301001','7843000014','40281520000')
spbraj[21]=new Array('Дзержинский','dzr',20,'МИ ФНС России №10','784101001','7841000019','40298563000')
spbraj[22]=new Array('Куйбышевский','kbs',53,'МИ ФНС России № 10','784101001','7841000019','40298561000')
spbraj[23]=new Array('Смольнинский','smolninsky',19,'ИФНС №11','784201001','7842000011','40298564000') // исключение по веб-адресу!

//------------------------------- добавление в закладки

function bookmark(a) {
	var url = document.getElementById('ssharelink').value
	var title = 'Квитанция для оплаты госпошлины (шаблон)'
	if (msie) window.external.AddFavorite(url,title);
	else if (opera) {
		a.href = url;
		a.rel = "sidebar";
		a.title = title;
		return true;
	}
	else if (netscape || chrome) window.sidebar.addPanel(title,url,"");
	url=""; title=""; b=""; a=""
	return false;
}

// ------------- цена иска в адресе

/*
function getvariable(a) {
	var g=stroka.substr(stroka.indexOf(a)+a.length,stroka.length)
	if (g.indexOf("#")!=-1) {
		var oraz=g.substr(0,g.indexOf("#"))
		g=oraz
	}
	return eval(g)
}
*/

function checkadress() {
	stroka=location.hash

	if (stroka.indexOf("#v=")!=-1) {
		document.getElementById('printkvit').style.display='block';
		var v=eval(stroka.charAt(stroka.indexOf("#v=")+3))
		document.getElementById('rekvizit').value=v
		viborsuda(v)
		if (stroka.indexOf("#rm=")!=-1) {
			var rm=stroka.substr(stroka.indexOf("#rm=")+4,stroka.length)
			if (rm.indexOf("#")!=-1) {
				var oraz=rm.substr(0,rm.indexOf("#"))
				rm=oraz
			}
			rm=eval(rm)
			if (v==2) document.getElementById('rsm').value=rm
			if (v==3) document.getElementById('mirsud').value=rm
			if (v==5) {document.getElementById('rsspb').value=rm}
			else rm=""
		}
		if (v==5) fillshablon(rm)
		if (v==4 || v==5) {
			if (stroka.indexOf("#u=")!=-1) {
				var u=stroka.substr(stroka.indexOf("#u=")+3,stroka.length)
				if (u.indexOf("#")!=-1) {
					var oraz=u.substr(0,u.indexOf("#"))
					u=oraz
				}
				document.getElementById('ufk1').value=unshifr(u)
			}
			if (stroka.indexOf("#i=")!=-1) {
				var i=stroka.substr(stroka.indexOf("#i=")+3,stroka.length)
				if (i.indexOf("#")!=-1) {
					var oraz=i.substr(0,i.indexOf("#"))
					i=oraz
				}
				document.getElementById('innpol1').value=i
			}
			if (stroka.indexOf("#k=")!=-1) {
				var k=stroka.substr(stroka.indexOf("#k=")+3,stroka.length)
				if (k.indexOf("#")!=-1) {
					var oraz=k.substr(0,k.indexOf("#"))
					k=oraz
				}
				document.getElementById('kpp1').value=k
			}
			if (stroka.indexOf("#r=")!=-1) {
				var r=stroka.substr(stroka.indexOf("#r=")+3,stroka.length)
				if (r.indexOf("#")!=-1) {
					var oraz=r.substr(0,r.indexOf("#"))
					r=oraz
				}
				document.getElementById('rs1').value=r
			}
			if (stroka.indexOf("#g=")!=-1) {
				var g=stroka.substr(stroka.indexOf("#g=")+3,stroka.length)
				if (g.indexOf("#")!=-1) {
					var oraz=g.substr(0,g.indexOf("#"))
					g=oraz
				}
				document.getElementById('gders1').value=unshifr(g)
			}
			if (stroka.indexOf("#b=")!=-1) {
				var b=stroka.substr(stroka.indexOf("#b=")+3,stroka.length)
				if (b.indexOf("#")!=-1) {
					var oraz=b.substr(0,b.indexOf("#"))
					b=oraz
				}
				document.getElementById('bik1').value=b
			}
			if (stroka.indexOf("#j=")!=-1) {
				var j=stroka.substr(stroka.indexOf("#j=")+3,stroka.length)
				if (j.indexOf("#")!=-1) {
					var oraz=j.substr(0,j.indexOf("#"))
					j=oraz
				}
				document.getElementById('kbk1').value=j
			}
			if (stroka.indexOf("#o=")!=-1) {
				var o=stroka.substr(stroka.indexOf("#o=")+3,stroka.length)
				if (o.indexOf("#")!=-1) {
					var oraz=o.substr(0,o.indexOf("#"))
					o=oraz
				}
				document.getElementById('okato1').value=o
			}
			if (stroka.indexOf("#n=")!=-1) {
				var n=stroka.substr(stroka.indexOf("#n=")+3,stroka.length)
				if (n.indexOf("#")!=-1) {
					var oraz=n.substr(0,n.indexOf("#"))
					n=oraz
				}
				document.getElementById('naznachenie1').value=unshifr(n)
			}
		}
		if (stroka.indexOf("#s=")!=-1) {
			var s=stroka.substr(stroka.indexOf("#s=")+3,stroka.length)
			if (s.indexOf("#")!=-1) {
				var oraz=s.substr(0,s.indexOf("#"))
				s=oraz
			} 
			if (s.indexOf(".")==-1) s+=".00"
			reg=/(\d+).(\d+)/
			var rub=reg.exec(s)
			if (rub[2].length==1) rub[2]+="0"
			document.getElementById('rrub').value=rub[1]
			document.getElementById('kkop').value=rub[2]
		}
		if (stroka.indexOf("#f=")!=-1) {
			var f=stroka.substr(stroka.indexOf("#f=")+3,stroka.length)
			if (f.indexOf("#")!=-1) {
				var oraz=f.substr(0,f.indexOf("#"))
				f=oraz
			}
			document.getElementById('myname').value=unshifr(f)
		}
		if (stroka.indexOf("#a=")!=-1) {
			var a=stroka.substr(stroka.indexOf("#a=")+3,stroka.length)
			if (a.indexOf("#")!=-1) {
				var oraz=a.substr(0,a.indexOf("#"))
				a=oraz
			}
			document.getElementById('myadress').value=unshifr(a)
		}
		sharelink()
	}

	if (stroka.indexOf("#gpk=")!=-1) {
		gpkcena=stroka.substr(stroka.indexOf("#gpk=")+5,stroka.length)
		if (gpkcena.indexOf("#apk=")!=-1) {
			gpkcena=gpkcena.substr(0,gpkcena.indexOf("#apk="))
		}
		document.getElementById('obsh').value=gpkcena
		funk()
	}

	if (stroka.indexOf("#apk=")!=-1) {
		apkcena=stroka.substr(stroka.indexOf("#apk=")+5,stroka.length)
		if (apkcena.indexOf("#gpk=")!=-1) {
			apkcena=apkcena.substr(0,apkcena.indexOf("#gpk="))
		}
		document.getElementById('arb').value=apkcena
		funk2()
	}
}

function cleankvit() {
	document.getElementById('myname').value=document.getElementById('myadress').value=document.getElementById('rrub').value=document.getElementById('kkop').value=document.getElementById('mirsud').value=document.getElementById('ufk1').value=document.getElementById('innpol1').value=document.getElementById('kpp1').value=document.getElementById('rs1').value=document.getElementById('gders1').value=document.getElementById('bik1').value=document.getElementById('okato1').value=document.getElementById('ssharelink').value='';
	document.getElementById('rsm').value = '999';
	document.getElementById('naznachenie1').value = 'Оплата госпошлины';
	document.getElementById('kbk1').value = '18210803010011000110';
	document.getElementById('rsspb').value = ''
	viborsuda(0);
}

// -------------  кликер 
function getIframeDocument(iframeNode) {
	if (iframeNode.contentDocument) return iframeNode.contentDocument
	if (iframeNode.contentWindow) return iframeNode.contentWindow.document
	return iframeNode.document
}

function setIframeSrc(iframeNode, src) {
	getIframeDocument(iframeNode).location.replace(src)
}

function smallurl() {
	document.getElementById('clck2').style.display='block';
	var a='http://clck.ru/--?url='+encodeURIComponent(document.getElementById('ssharelink').value)
	setIframeSrc(document.getElementById('clck'), a)
//	clck.document.location.href=a
	return false;
}