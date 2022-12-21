1	Sistemos paskirtis

Projekto tikslas – sukurti platformą, kuri palengvintų tiek norintiems pradėti sportuoti, tiek patyrusiems sportininkams išsirinkti norimą sporto programą.

Veikimo principas  – kuriamą platformą sudaro dvi dalys: internetinė aplikacija, kuria naudosis vartotojai, administratorius bei aplikacijų programavimo sąsaja (angl. trump. API).

Funkciniai reikalavimai:

Neprisijungęs sistemos naudotojas (svečias) galės:

  1. Peržiūrėti visas internetinėje svetainėje patalpintus įrašus.
  2. Susikurti vartotojo paskyrą.
  3. Prisijungti prie sistemos.

Užsiregistravęs sistemos naudotojas galės:

  1. Peržiūrėti visas internetinėje svetainėje patalpintus įrašus.
  2. Sukurti naujas sporto programas.
  3. Įvertinti (reitinguoti) sporto programas.
  4. Redaguoti bei šalinti savo sukurtas sporto programas bei reitingus.
  5. Atsijungti nuo sistemos.
  6. Prisijugnti prie sistemos.
 
 Administratorius galės:
 
  1. Peržiūrėti visas internetinėje svetainėje patalpintus įrašus.
  2. Sukurti naujas sporto programas.
  3. Įvertinti (reitinguoti) sporto programas.
  4. Sukurti naujas sporto programų karegorijas.
  4. Redaguoti,  šalinti kategorijas, sporto programas bei reitingus nepriklausomai nuo to, koks vartotojas jas sukūrė.
  5. Atsijungti nuo sistemos.
  6. Prisijugnti prie sistemos.

2.	Sistemos architektūra

Sistemos sudedamosios dalys:
•	Kliento pusė (ang. Front-End) – naudojant React.js; 
•	Serverio pusė (angl. Back-End) – naudojant .NET, duomenų bazė – MySQL.
Sistemos talpinimui yra naudojamas Azure cloud serveris. Visos sistemos dalys yra diegiamos tame pačiame serveryje. Internetinė aplikacija yra pasiekiama per HTTPS protokolą. Sistemos veikimui yra reikalingas GymLab API, kuris leidžia komunikuoti su MySql duomenų bazės serveriu, tam naudoja ORM sąsaja.
