1.	Sprendžiamo uždavinio aprašymas 

1.1.	Sistemos paskirtis

Projekto tikslas – sukurti platformą, kuri palengvintų tiek norintiems pradėti sportuoti, tiek patyrusiems sportininkams išsirinkti norimą sporto programą.
Veikimo principas  – kuriamą platformą sudaro dvi dalys: internetinė aplikacija, kuria naudosis vartotojai, administratorius bei aplikacijų programavimo sąsaja (angl. trump. API).
Neprisijungę vartotojai galės prisiregistruoti, peržiūrėti visas internetinėje svetainėje patalpintas sporto programas, jas filtruoti pagal norimus kriterijus, bei peržiūrėti komentarus ir įvertinimus.
Prisijungę vartotojai paveldi visas neprisijungusių vartotojų funkcijas, taip pat gali pasidalinti savo sporto programomis, peržiūrėti visas savo pasiūlytas programas, įvertinti bei komentuoti visas patalpintas programas svetainėje.
Administratorius gali patvirtinti arba atmesti vartotojų pasiūlytas programas, pašalinti nepageidaujamus komentarus, uždrausti prieigą prie svetainės nepageidaujamiems vartotojams.

1.2.	Funkciniai reikalavimai

Svečias galės: 
1.	Peržiūrėti platformos reprezentacinį puslapį
2.	Peržiūrėti visas puslapyje patalpinas sporto programas 
3.	Peržiūrėti sporto programų komentarus ir įvertinimus
4.	Filtruoti sporto program sąrašą pagal norimus kriterijus
5.	Užsiregistruoti prie internetinės svetainės
6.	Prisijungti prie internetinės svetainės.
Vartotojas galės: 
1.	Atlikti visas funckijas galimas svečiui (išskyrus registraciją)
2.	Pasidalinti savo sporto programomis
3.	Peržiūrėti visas savo pasiūlytas programas
4.	Įvertinti bei komentuoti visas patalpintas sporto programas svetainėje
Administratorius galės: 
1.	Patvirtinti arba atmesti vartotojų pasiųlytas programas
2.	Pašalinti nepageidaujamus komentarus
3.	Uždrausti lankytis svetainėje nepageidaujamiems vartotojams

2.	Sistemos architektūra

Sistemos sudedamosios dalys:
•	Kliento pusė (ang. Front-End) – naudojant React.js; 
•	Serverio pusė (angl. Back-End) – naudojant .NET, duomenų bazė – MySQL.
Sistemos talpinimui yra naudojamas Azure cloud serveris. Visos sistemos dalys yra diegiamos tame pačiame serveryje. Internetinė aplikacija yra pasiekiama per HTTPS protokolą. Sistemos veikimui yra reikalingas GymLab API, kuris leidžia komunikuoti su MySql duomenų bazės serveriu, tam naudoja ORM sąsaja.
