Sistemos paskirtis

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

Sistemos architektūra

![image](https://user-images.githubusercontent.com/107630990/208941348-6b5fb121-5671-47ea-b825-9374853e659c.png)


Sistemos sudedamosios dalys:
•	Kliento pusė (ang. Front-End) – naudojant React.js; 
•	Serverio pusė (angl. Back-End) – naudojant .NET, duomenų bazė – MySQL.
Sistemos talpinimui yra naudojamas Azure cloud serveris. Visos sistemos dalys yra diegiamos tame pačiame serveryje. Internetinė aplikacija yra pasiekiama per HTTPS protokolą. Sistemos veikimui yra reikalingas GymLab API, kuris leidžia komunikuoti su MySql duomenų bazės serveriu, tam naudoja ORM sąsaja.

Naudotojo sąsajos projektas

Navigacija
| Wireframe  | Realizacija |
| ------------- | ------------- |
| ![image](https://user-images.githubusercontent.com/107630990/209137836-d7bbcdde-010f-4bfc-ae39-1a06485fe371.png) | ![image](https://user-images.githubusercontent.com/107630990/208947977-4fc93a6d-c2bd-4b8b-b41f-6bf66817117e.png) | 
![image](https://user-images.githubusercontent.com/107630990/209138011-f5c9019b-81b4-4eb8-b091-834ad76b2359.png) | ![image](https://user-images.githubusercontent.com/107630990/208949724-99bb3e86-d4ca-47cd-9750-621e1dc3a562.png) |
![image](https://user-images.githubusercontent.com/107630990/209138546-4c5497a8-47a5-4094-b129-1809f0a8b04c.png) | ![image](https://user-images.githubusercontent.com/107630990/208951042-8ed8a5d8-395c-4253-99ae-6f3f2c1e7f39.png) |
