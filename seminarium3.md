#Seminarium 3
##Projektidé
###Snöar det här?
En web/mobil applikation som talar om för användaren om det snöar där den befinner sig just nu genom att hämta användarens position med geolocation och sedan hämta väderdata för den platsen och tiden. Om det nu snöar där man befinner sig så kommer ett föslag på en vinterjacka upp.
####API:n
*   Google maps
*   SMHI
*   Geolocation
*   Ebay

####Tankar
#####Ebay
Ebays api är väldigt utförligt med tutorials och guider på hur man kan komma igång med sina projekt. Det är väldigt mycket funktionalitet som är dokumenterad men den är väldigt bra sorterad och det är lätt att läsa sig till det man är ute efter att göra. Till exempel så finns det en tutorial exakt beskriver proceduren för att göra en sökning via deras API, från att skaffa en API nyckel till hur man skriver själva koden. Detta är mycket tacksamt och förenklar alltid arbetat så jag tycker att Ebays API verkar mycket trevligt och det skulle säkert vara roligt att arbeta med.
#####SMHI
Hos SMHI finns det en mängd öppen data, dock så finns det viss data som ej är tillgänglig offentligt. Den datan går dock att beställa mot en kostnad. Jag kan dock inte läsa mig till vilken data som är exkluderad ur den öppna datan. Den öppna datan verkar vara väldigt omfattande så jag kan inte föreställa mig att jag skulle behöva något som inte finns tillgängligt. SMHIs API verkar således vara väldigt lättförstått och enkelt att använda. Mata in latitud och longitud så får du ut data för 10 dagar framöver. Dokumentationen var tillräckligt utförlig för att kunna nytja det som finns tillgängligt men allt var inte helt glasklart.

#####Google maps
Googles dokumentation är väldigt stor och det finns otroligt mycket att läsa om, så jag har verkligen inte läst hela derass dokumentation för Google maps API:t. Däremot så är det jag har läst väldigt bra skrivet och lätt att förstå. Det finns i princip steg för steg instruktioner för hur man ska komma igång att arbeta med deras API. Samtidigt så är det så stort att får se sig för så man inte läser bort sig, men som sagt bör det inte vara några probmel då google har väldigt tydliga instruktioner.
####Dataformat
Från SMHI kommer det JSON medan man kan välja mellan både XML och JSON hos Google maps och från Ebay kommer det XML. 
####Krav, begränsningar och kostnader
####SMHI
SMHIs data är i stor del fri att använda hur som helst, dock så finns inte all den data dom tillhandahåller publikt. Det finns en tjänst att mot en kostnad beställa, de berättar dock inte vad det kan vara för data mer än "Beställ data, som du inte kan ladda ner via smhi.se, mot viss kostnad". Den öppna datan SMHI tillhandahåller ligger under licensvillkoren Creative commons Erkännande 2.5 SE denna licens innebär att man fritt får kopiera och distribuera deras äöppna data för både komersiella och icke komersiella verksamheter. Utöver detta så ska man inte lasta ner deras tjänster i onödan, de vill inte att man publicerar inaktuell data. SMHI vill alltså att man ska vara en god användare som inte missbrukar deras tjänster, om så vore fallet så är de beredda att stänga av enskilda IP-adresser.

####Google maps
Hos Google verkar den enda gränsen vara 25 000 "map loads" varje dag i 90 dagar. När man når den mängden map loads så måste man se till att antingen modifiera sin applikation så det blir färre än 25 000 map loads varje dag eller att man aktiverar en automatisk betalning för varje map load som hamnar över 25 000 och sist att man köper en Maps API företagslicens. Dock så kan Google göra ett avgörande om applikationen är i allmänhetens intresse lyfta denna begränsning. Sedan tillhandahåller Google en guide för att köpa större map loads kvot för den som är intresserad. Den högsta betalbara mängden  map loads varje dag är automatiskt 250 000 men det går att höja och sänka den som man vill, dock endast upp till 500 000 map loads varje dag. Är man ute efter ännu fler map loads så får man ta kontakt med Google så kan de höja begränsningarna ännu mer.

####Ebay
Hos Ebay kan man beroende på vilken typ av applikation man använder göra olika många anrop per dag. T.ex. så kan alla applikationer göra 5000 anrop till varje API varje dag medan en kompatibel applikation kan göra up till och med 1.5 miljoner anrop varje dag. Deras API är indelat i ett API för varje typ av operation, t.ex. så finns det ett sök API, ett produkt API ett byteshandels API etc.Det är mot varje sådan "del-API som applikationernas anropsgräns är satt.

####Risker
En risk med att hämta väderdata över huvud taget inte bara från SMHI är att den data som kommer ut kanske inte stämmer 100% överens med verkligheten. Det kan resultera i att fel resultat levereras till slutanvändaren. Samma sak gäller geolocation om man tar reda på användarens plats genom en IP-adress så kan det vara missvisande och kan på så sätt leverea fel resultat till användaren.

Om ett API förändras mycket så kan funktionalitet som finns just nu försvinna och då fungerar kanske inte ens applikation längre. SMHI anger att deras API kommer förändras under 2014 samt att fler APIn kommer läggas till. 

Google känns som ett väldigt stabilt API och kommer antagligen inte förändras på sådant sätt att den funktionaliteten jag är ute efter kommer försvinna eller förändras. 

Något som kan vara farligt med Ebay är att det finns så fruktansvärt många auktioner där så om man inte ser upp med hur man gör sina sökningar så kan man lätt få ohanterligt mycket data. På ebay kan man göra väldigt specifika sökningar så om man inte håller sig till rätt kategorier när man söker så är det lätt att man får med saker som är helt irrelevanta. Sedan kan det vara svårt att avgöra vad som är rätt saker att hämta ut, speciellt om man hämtar många poster. Något som kan vara svårt också är att avgöra om man vill ha ut någon könsbaserad produkt, t.ex. en tjejjacka eller en killjacka.

Jag tycker alla 3 API:er har bra dokumentation och de presenterar nyheter för vad som förändras och så länge man håller koll bör man kunna undvika att ens applikationer helt plötsligt inte fungerar längre.
##Fallstudie
###Exempel
http://www.musicnectar.com/

Musicnectar är en sida som använder sig av youtube och Last.fm för att bygga en helt ny sida som presenterar information om artister, album eller låtar och även spelar upp musik. Jag tycker att den här sidan är ett bra exempel på hur man genom att använda sig av API:er skapar en snygg ny lösning för hur man kan lyssna på musik och läsa om musik. Denna tjänst använder sig "bara" av 2 API:er men jag tycker att det inte har så stor betydelse om resultatet blir en snygg/användbar applikation.
###Kombinerat resultat
Det kombinerade resultatet av datakällorna blir en site som man både kan lyssna på musik och läsa om den. Det är inte direkt något revolutionerande men jag tycker att det är ett snyggt sätt att slå ihop två tjänster i en och presentera den på ett trevligt sätt. Det blir som en online musikspelare.
