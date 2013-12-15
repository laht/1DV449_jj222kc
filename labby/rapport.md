#Rapport laboration 2 

##Front end optimering

1
### Lyfta ur CSS
#####Teori
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

2
### Lyfta ur css
#####Teori
Att separera CSS och HTML tillåter att hålla all HTML semantiskt korrekt och inte blanda in saker som inte hör till markup. Dessutom så behöver man bara skriva CSS på ett enda ställe och sedan ladda in den på flera sidor. I det här fallet blir det fler anrop men filstorleken på mess-sidan minskar, så om css-filerna cachas bör svarstiden minskas. Kapitel 8 sida 76 High performance web sites.
####Mess Före
*   Genomsnitt av 10 = 6.22s
*   Mess = 9.2kb
####Mess Efter
*   Genomsnitt av 10 = 6.25s
*   Mess = 7.9kb
*   Style = 1.3kb
####Reflektion
Den ökade laddningstiden kan bero på den tillagda CSS-filen som ökade varje inläsning med cirka 20ms, dock så kan det ha varit instabila laddningstider som är orsaken också. Jag står dock fast vid att CSS inte bör finnas med i HTML-strukturen för ökad läsbarhet och semantik. Mitt resonemang för ökad prestanda bygger i detta fall på cachning och resultaten är baserad på inladdning utan någon cachning vilket inte direkt talar för min teori. 

3
### Lyfta ur javascript
#####Teori
Att separera Javascript och HTML tillåter att hålla all HTML semantiskt korrekt och inte blanda in saker som inte hör till markup. Man kan på så vis skriva en separat javascript-fil som man i sin tur läser in på flera ställen. I det här fallet blir det fler anrop men filstorleken på mess-sidan minskar, så om javascript-filerna cachas bör svarstiden minskas. Kapitel 8 sida 76 High performance web sites.

####Mess Före
*   Genomsnitt av 10 = 6.25s
*   Mess = 7.9kb

####Mess Efter
*   Genomsnitt av 10 = 5.22s
*   messContainer.js = 7.9kb
*   Mess = 5.9kb
####Reflektion
Jag blev ganska förvånad över resultatet då laddningstiden sänktes mer än vad jag kunde tänka mig. Jag trodde inte den skulle sänkas något nämnvärt över huvud taget men nästan en hel sekund är en ganska stor förbättring. Det är svårt att avgöra om det utlyftet av javascripten som ligger till grund för förbättringen eller om det är något annat då de CSS-filer som läses in via CDN läses in snabbare än vad de innan javascripten blev externa.

4
### Ta bort 404 objekt
#####Teori
####Mess Före
*   Genomsnitt av 10 = 5.22s
*   Mess = 5.9kb





### Ta bort onödig backend
#####Teori
####Mess Före
*   Genomsnitt av 10 = 