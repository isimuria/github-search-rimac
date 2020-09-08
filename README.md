POKRETANJE APLIKACIJE<BR>
npm install && npm start
<BR><BR>

BILJESKE <BR>
Koristio sam ovaj boilerplate https://react-boilerplate.github.io/react-boilerplate-cra-template/ koji je vec imao github search REST api pozive pomocu redux-saga i prikaz repos-a po imenu profila pa mi je bilo logicno koristiti ga kao temelj aplikacije. 

CSS se temelji na styled componentsima sa kojima sam vec upoznat iz trenutnog zaposlenja pa mi je bilo logicno ostatak layout-a napraviti na taj nacin. 

DJELOVI IZ ZADATKA i PDF-a
- Osnovni prikaz repo-a je vec bio dio ovog boilerplate-a. Izmjenio sam layout da ga prilagodim onim zahtjevima iz zadatka. Dodao sam ikone, opis svakog repo-a, poboljsao UI/UX.

- Za prikaz imena, emaila i korisnika sam isto nastavio koristiti styled komponents. 

- Zbog zahtjeva za emailom svakog korisnika morao se ukljuciti jos jedan poziv na api jer u repository listi nema emaila od korisnika.

- Za cache nisam htio komplicirati pa sam koristio localStorage i sasvim dobro funkcionira sve, rezultati se spreme u cache i ako je vec postojeci poziv na api rezultati se uzmu od cache-a i ustedi se poziv na api.

- Sortirao sam uz pomoc useState hooka.

