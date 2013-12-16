#Rapport laboration 2 

##Front end optimering

### Lyfta ur CSS
####Teori
Att separera CSS och HTML tillåter att hålla all HTML semantiskt korrekt och inte blanda in saker som inte hör till markup. Dessutom så behöver man bara skriva CSS på ett ställe och sedan ladda in den på flera sidor. I det här fallet blir det fler anrop men filstorleken på index-sidan minskar, så om css-filerna cachas bör svarstiden minskas. Kapitel 8 sida 76 High performance web sites.
####Index Före
*   Genomsnitt av 10 = 203ms
*   2 anrop
*   2.6kb
*   175B
####Index Efter
*   Genomsnitt av 10 = 153ms
*   3 anrop
*   1.8kb
*   174b
*   175b
####Reflektion
Ett extra anrop sker men jag tycker att det är värt det för ökad semantik samt möjligheten att cacha CSS-filen. Prestandavinst finns att hämta när CSSen har cachats. I detta fall ska dock laddningstiden inte ha påverkats positivt av förändringen utan det är snarare så att den minsakde laddningstiden beror på något helt annat.

### Lyfta ur css
####Teori
Att separera CSS och HTML tillåter att hålla all HTML semantiskt korrekt och inte blanda in saker som inte hör till markup. Dessutom så behöver man bara skriva CSS på ett enda ställe och sedan ladda in den på flera sidor. I det här fallet blir det fler anrop men filstorleken på mess.php-sidan minskar, så om css-filerna cachas bör svarstiden minskas. Kapitel 8 sida 76 High performance web sites.
####Mess.php Före
*   Genomsnitt av 10 = 6.22s
*   Mess.php = 9.2kb
####Mess.php Efter
*   Genomsnitt av 10 = 6.25s
*   Mess.php = 7.9kb
*   Style = 1.3kb
####Reflektion
Den ökade laddningstiden kan bero på den tillagda CSS-filen som ökade varje inläsning med cirka 20ms, dock så kan det ha varit instabila laddningstider som är orsaken också. Jag står dock fast vid att CSS inte bör finnas med i HTML-strukturen för ökad läsbarhet och semantik. Mitt resonemang för ökad prestanda bygger i detta fall på cachning och resultaten är baserad på inladdning utan någon cachning vilket inte direkt talar för minteori. 

### Lyfta ur javascript
####Teori
Att separera Javascript och HTML tillåter att hålla all HTML semantiskt korrekt och inte blanda in saker som inte hör till markup. Man kan på så vis skriva en separat javascript-fil som man i sin tur läser in på flera ställen. I det här fallet blir det fler anrop men filstorleken på mess.php-sidan minskar, så om javascript-filerna cachas bör svarstiden minskas. Kapitel 8 sida 76 High performance web sites.

####Mess.php Före
*   Genomsnitt av 10 = 6.25s
*   Mess.php = 7.9kb

####Mess.php Efter
*   Genomsnitt av 10 = 5.22s
*   mess.phpContainer.js = 7.9kb
*   Mess.php = 5.9kb
####Reflektion
Jag blev ganska förvånad över resultatet då laddningstiden sänktes mer än vad jag kunde tänka mig. Jag trodde inte den skulle sänkas något nämnvärt över huvud taget men nästan en hel sekund är en ganska stor förbättring. Det är svårt att avgöra om det utlyftet av javascripten som ligger till grund för förbättringen eller om det är något annat då de CSS-filer som läses in via CDN läses in snabbare än vad de innan javascripten blev externa.

### Ta bort 404 objekt
####Teori
Två javascript som laddades in gick inte att hitta och resulterade i onödiga anrop. Ju färre anrop man gör ju bättre är det oftast. http://developer.yahoo.com/performance/rules.html#num_http / http://developer.yahoo.com/performance/rules.html#no404
####Mess.php Före
*   Genomsnitt av 10 = 5.22s
*   Mess.php = 5.9kb
####Mess.php Efter
*   Genomsnitt av 10 = 5.22s
*   Mess.php = 4.9kb
####Reflektion
Resultatet är lite konstigt då det borde ha blivit någon slags prestandavinst, det är lite svårt att se egentligen då varje laddning skiljer sig så stort åt mellan varje gång även innan förändringen så kunde laddningstiden skilja sig 1-2 sekunder. De saknade javascript-filerna tog mellan 20-70ms att ladda. 

### Långsam CDN
####Teori
Kurslitteraturen förespråkar användandet av CDNs men jag tycker i detta fall att inladdningstiden för de CSS-filer som läses in via CDN är på tok för långa för att motivera att inte använda dem lokalt. Speciellt då deras storlek är så pass liten, att det inte kommer ha så stor inverkan på servern. Det är även ett läge att spara in 2 anrop genom att lägga ihop de två CSSerna till den nuvarande Style CSSen. http://developer.yahoo.com/performance/rules.html#cdn / http://developer.yahoo.com/performance/rules.html#num_http    En sidnot: Det var pga av detta CDN som laddningstiderna blev så 
####Mess.php Före
*   Genomsnitt av 10 = 5.22s
*   Mess.php = 4.9kb
*   Style 1.3kb
*   CDN totalt = 878b
####Mess.php Efter
*   Genomsnitt av 10 = 3.92s
*   Mess.php = 4.6kb
*   Style 1.8kb
####Reflektion
Som förväntat så sänktes laddningstiden ganska rejält, över 1 sekund snabbare att ladda sidan. Det CDN som tillhandahöll CSS var långsamt och instabilt, laddningstiderna varierade mycket men låg nästan alltid över 1½ sekund vilket inte känns så himla bra speciellt för den mängden CSS som faktiskt kom ut från CDNet.

### Stora bilder
####Teori
Det är bättra att skala bilden manuellt istället för att skala den med CSS. Skalas bilden med CSS så behåller den sin ursprungliga storlek och tar lång tid att ladda, speciellt om det är en stor bild. Bäst är att ha två versioner av bilden en högupplöst och en thumbnail om man ändå vill kunna visa upp den stora bilden på något sätt. http://developer.yahoo.com/performance/rules.html#no_scale
####Mess.php Före
*   Genomsnitt av 10 = 3.92s
*   food.jpg = 2mb
####Mess.php Efter
*   Genomsnitt av 10 = 2.99s
*   food.jpg = 138kb
####Reflektion
Att laddningstiden sänktes är inte så förvånande bilden som lästes in var runt 2mb, vilket är ganska mycket speciellt när bilden på sidan endast var 220px hög. Så det var helt onödigt att läsa in en 2mb stor bild när den inte ens visas i sin fulla storlek. 

##Back end optimering

### Undvik onödiga redirects
####Teori
I det här fallet sker en redirect till en sida som gör en redirect till den inloggade sidan, med en delay på 2 sekunder. Kurs litteraturen förespråkar minimalt användande av redirects, det står inte riktigt varför men i det här fallet känns det logiskt att skippa den andra redirecten och redirecta direkt till den inloggade sidan vilket bör minska laddningstiden med åtminstone 2 sekunder. Det blir ett mindre anrop genom att göra detta. http://developer.yahoo.com/performance/rules.html#redirects / http://developer.yahoo.com/performance/rules.html#num_http
####Mess.php Efter
*   Genomsnitt av 10 = 2.99s
####Mess.php Efter
*   Genomsnitt av 10 = 685ms
####Reflektion
Laddningstiden sänktes med cirka 2 sekunder vilket den borde ha gjort. Jag kan dock inte tänka mig varför det var en sådan implementation från första början men jag misstänker att det är något lurt på gång. 


##Säkerhetsproblem
###Ordentlig utloggning
Den ursprungliga utloggningsfunktionen var endast en redirect till index sidan och den rensade ingen sessionsdata. 

Detta säkerhetshål kan utnyttjas på sådant sätt att om nu användaren använt en offentlig dator på t.ex. ett bibliotek eller liknande och varit inloggad på sidan och sen trott att denna loggat ut utan att ha blivit utloggad så kan nästa person som använder datorn komma åt inloggningen. 

På den här sidan kan det vara svårt att göra någon riktig skada, men det går ju alltid att spamma kommentarsfälten under någon annans namn eller skriva saker som den riktiga användern inte står för. 

Jag löste problemet genom att göra ett ajax anrop till functions.php med logout som GET parameter och i sin tur kördes en logoutfunktion som nollställer sessionen och returnerar index.php som javascriptet redirectar till. 


###Användaruppgifter i databasen
I databasen så sparas användaruppgifter i klartext, både användarnamn och lösenord rätt upp och ner.

Om databasenuppgifterna skulle läckas ut så finns det möjlighet att matcha dessa användarnamn och lösenord mot populära siter som t.ex. facebook.

Om någon nu kommer åt ett facebook konto så kan man fiska efter pengar hos människor som är nära besläktad med den personen vars konto man nu har kontroll över. 

Jag löste detta genom att lägga en hash på lösenordet och sedan spara det i databasen. Vid inloggning kollar jag om användarens namn matchar ett namn i databsen och sendan hämtas det hashade lösenordet och användarnamnet ut och kollar så det överensstämmer med de inmatade värdena.

###Sessionsstölder
Det är nu möjligt att stjäla någons session och logga in i en annan webläsare på en annan plats eller dator. 

Det går att nå någon annans konto genom att ta deras session och kopiera in den i en annan webläsare.

Om man är inne på någon annans konto är det möjligt att göra elaka poster.

Detta löser jag genom att spara undan den ursprungliga använderns user agent och remote address och sedan jämför mot dem vid laddning av sidan.

###Utomstående kommentarer
Det är möjligt att via en URL skicka in kommentarer för producenter utan att vara autentisierad som användare. 
Exempel: http://jocke.jmjldesign.se/webteknik2/labby/functions.php?function=add&name=TEST&message=TEST&pid=8

En elak användare kan spamma kommentarer.

Databasen kan snabbt fyllas med helt onödiga poster som tar tid att läsa in.

Detta korrigerades genom att endast låta inloggade användare göra kommentarer. 

###Parametriserade SQL-frågor 
När en insert görs i databasen så används inte parametriserade frågor. 

Detta möjliggör SQL-injection.

Om någon elak användare gör en SQL-injection så kan han droppa hela databasen.

Genom att använda parametriserade SQL-frågor och komma undan HTML så använder jag htmlentities och sedan exekveras frågan till databasen.