#Laboration 1

##1.
Jag valde att arbeta med de tekniker som togs upp i de exempelfilmer som var utlagda på kurshemsidan. Jag valde detta pga att jag aldrig förut gjort någon form av webbskrapning och har inte heller använt varken curl eller xpath förut. Så för min del var det rätt självklart att använda curl, xpath och php.

##2.
Jag kan tänka mig två problemområden när man pratar risker om automatiska skrapningar. Den första är den legala delen att det kanske inte alltid är så att man följer de regler som finns speciferade i användaravtalen och då kan man ju hamna i trubbel om det är så att man blir upptäckt. Det vore väldigt osannolikt att det är tillåtet att t.ex. skrapa all data från prisjakt och sedan presentera den på en egen sida.

Det andra området är den tekniska aspekten. Det är ofta så att sidor förändras, uppdateras eller förnyas på olika sätt och då kan kodenstrukturen förändras och då kanske våra script inte längre kan tolka den information som finns utan då koden är helt annorlunda. 

Sedan så om man är oförsiktig så kan det vara så att man lätt överbelastar den server som man gör anrop till. Som det nämndes på föreläsningen så ska man se upp med while loopar satta till true etc. Om man skulle göra något sådant på en stor site så skulle de antagligen inte göra så mycket då de har koll på hur man förhindrar sånt med t.ex. timeout eller liknande. Om man där emot skulle sitta och göra väldigt många anrop till någons privata, hemmahostade server så är det nog större risk att den blir överbelastad och hindrar övrig trafik att ta sig in.

##3.
Koden som kommer ut ur asp.net webforms är inte alltid den snyggaste och lättaste att läsa och det kan vara så att det är svårt att tolka den på ett bra sätt. Det är även så att webforms ofta har gömda fält för att avgöra vad som ska visas. Dessa försvårar processen att skrapa sidan eller till och med gör det omöjligt.

##4.
Jag har inte gjort något medvetet direkt ur den synpunkt att jag vill vara en god webbskrapare. Däremot har jag försökt hålla ner antalet anrop som krävs för att jag ska få ut den data jag är ute efter, jag har heller inte skrapat ner någon data utöver den data som jag var instruerad att plocka ner.

##5.
Jag har lärt mig arbeta med curl och xpath tillsammans med php, som nämndes i punkt 1. Då exempelfilmerna som finns på kurshemsidan var rätt straight forward var det ganska lätt att sätta igång och snabbt få ut något resultat som man sedan kunde arbeta vidare på. Denna laboration gav även tillfälle att testa på att arbeta mot en sqlite databas som var väldigt smidigt, speciellt med tanke på laborationens storlek.