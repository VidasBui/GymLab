##  Sistemos paskirtis

Projekto tikslas – sukurti platformą, kuri palengvintų tiek norintiems pradėti sportuoti, tiek patyrusiems sportininkams išsirinkti norimą sporto programą.

Veikimo principas  – kuriamą platformą sudaro dvi dalys: internetinė aplikacija, kuria naudosis vartotojai, administratorius bei aplikacijų programavimo sąsaja (angl. trump. API).

## Funkciniai reikalavimai:

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

## Sistemos architektūra

![image](https://user-images.githubusercontent.com/107630990/208941348-6b5fb121-5671-47ea-b825-9374853e659c.png)


Sistemos sudedamosios dalys:
•	Kliento pusė (ang. Front-End) – naudojant React.js; 
•	Serverio pusė (angl. Back-End) – naudojant .NET, duomenų bazė – MySQL.
Sistemos talpinimui yra naudojamas Azure cloud serveris. Visos sistemos dalys yra diegiamos tame pačiame serveryje. Internetinė aplikacija yra pasiekiama per HTTPS protokolą. Sistemos veikimui yra reikalingas GymLab API, kuris leidžia komunikuoti su MySql duomenų bazės serveriu, tam naudoja ORM sąsaja.

## Naudotojo sąsajos projektas

### Navigacija
| Wireframe  | Realizacija |
| ------------- | ------------- |
| ![image](https://user-images.githubusercontent.com/107630990/209137836-d7bbcdde-010f-4bfc-ae39-1a06485fe371.png) | ![image](https://user-images.githubusercontent.com/107630990/208947977-4fc93a6d-c2bd-4b8b-b41f-6bf66817117e.png) | 
![image](https://user-images.githubusercontent.com/107630990/209138011-f5c9019b-81b4-4eb8-b091-834ad76b2359.png) | ![image](https://user-images.githubusercontent.com/107630990/208949724-99bb3e86-d4ca-47cd-9750-621e1dc3a562.png) |
![image](https://user-images.githubusercontent.com/107630990/209138546-4c5497a8-47a5-4094-b129-1809f0a8b04c.png) | ![image](https://user-images.githubusercontent.com/107630990/208951042-8ed8a5d8-395c-4253-99ae-6f3f2c1e7f39.png) |

### Registracija, prisijungimas
| Wireframe  | Realizacija |
| ------------- | ------------- |
| ![image](https://user-images.githubusercontent.com/107630990/209222263-f2a01625-285d-4e00-82b7-84ec0e4a2e4b.png) | ![image](https://user-images.githubusercontent.com/107630990/209222614-b1947518-3dce-45ab-9fdd-8a8cbefb0af2.png) |
| ![image](https://user-images.githubusercontent.com/107630990/209222346-914189ab-d344-47cc-8bb5-a6358bf562fc.png) | ![image](https://user-images.githubusercontent.com/107630990/209222563-85773b34-9351-49d9-a879-4163977bb7c1.png) |

### Kategorijų, sporto programų ir reitingų atvaizvavimas
| Wireframe  | Realizacija |
| ------------- | ------------- |
| ![image](https://user-images.githubusercontent.com/107630990/209225831-fca0c318-db99-47a9-8957-1dc41d11c6d1.png) | ![image](https://user-images.githubusercontent.com/107630990/209225917-83e36d3b-fc55-4c05-ba45-838513e71c41.png) |

### Kategorijų, sporto programų ir reitingų pridėjimo, keitimo, šalinimo modaliniai langai
| Wireframe  | Realizacija |
| ------------- | ------------- |
| ![image](https://user-images.githubusercontent.com/107630990/209227603-000805a8-ccc4-4948-b207-dbf20fb8f51f.png) | ![image](https://user-images.githubusercontent.com/107630990/209227706-edaee26d-02f1-4dcd-b334-72f4d59120b2.png) |

# API specifikacija

Reikalaujamos siuntimo antraštės:
| Antraštė  | Reikšmėa |
| ------------- | ------------- |
| Authorization | JWT access token |
| withCredentials | true |
| Content-Type | application/json |

## Categories panaudojimo pavyzdžiai

### GET užklausa: {domain}/api/categories

Galimi atsako kodai
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| 200 | Gražinamas sąrašas |

Atsako pavyzdys:
```
[
    {
        "name": "Gain muscle mass",
        "description": "Increased muscle mass can lead to less body fat, a stronger immune system, improved energy levels, and reduced stress."
    },
    {
        "name": "Get shredded",
        "description": "A shred workout is designed to make you lose body fat (and, in some cases, excess water weight), so your muscles are as defined as possible. It's different from bulking, in which you focus on building muscle."
    },
    {
        "name": "Lose weight",
        "description": "Weight loss program means a general program of instruction, with food, supplements, food products, or a food plan designed for clients from one or more healthy population groups, in order that such clients may achieve or maintain a healthy weight."
    }
]
```

### GET užklausa: {domain}/api/categories/{name}

Galimi atsako kodai
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| 200 | Gražinamas sąrašas |
| 404 | Nerastas |

200 Atsako pavyzdys:
```
[
    {
        "name": "Lose weight",
        "description": "Weight loss program means a general program of instruction, with food, supplements, food products, or a food plan designed for clients from one or more healthy population groups, in order that such clients may achieve or maintain a healthy weight."
    }
]
```

404 Atsako pavyzdys:
```
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
    "title": "Not Found",
    "status": 404,
    "traceId": "00-5526dc13356d2af271cc40d21e29df9a-fe69096967696a7e-00"
}
```

### POST užklausa: {domain}/api/categories/

Reikalaujamos siuntimo argumentai:
| Argumentas  | Reikšmėa |
| ------------- | ------------- |
| Name | kategorijos pavadinimas |
| Description | kategorijos aprašymas |

Galimi atsako kodai
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| 201 | Gražinamas sukurtas įrašas |
| 401 | Neautorizuotas |
| 400 | Blogi duomenys |

201 Atsako pavyzdys:
```
{
    "name": "Lose weight",
    "description": "Weight loss program means a general program of instruction, with food, supplements, food products, or a food plan designed for clients from one or more healthy population groups, in order that such clients may achieve or maintain a healthy weight."
}

```

400 Atsako pavyzdys:
```
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "Bad Request",
    "status": 400,
    "traceId": "00-8f90981c4e583dae5f47601990b157f9-4f0526eaca72988d-00"
}
```

### PUT užklausa: {domain}/api/categories/{name}

Reikalaujamos siuntimo argumentai:
| Argumentas  | Reikšmėa |
| ------------- | ------------- |
| Description | kategorijos aprašymas |

Galimi atsako kodai
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| 200 | Gražinamas sukurtas įrašas |
| 401 | Neautorizuotas |
| 404 | Nerastas |

200 Atsako pavyzdys:
```
{
    "name": "Lose weight",
    "description": "Weight loss program means a general program of instruction, with food, supplements, food products, or a food plan designed for clients from one or more healthy population groups, in order that such clients may achieve or maintain a healthy weight."
}
```

404 Atsako pavyzdys:
```
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
    "title": "Not Found",
    "status": 404,
    "traceId": "00-f8daaea7b3edbc4bac182310c63b2b0b-0850cbd64b9a5871-00"
}
```

### DELETE užklausa: {domain}/api/categories/{name}

Galimi atsako kodai
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| 204 | Sėkmingas ištrynimas |
| 401 | Neautorizuotas |
| 404 | Nerastas |


404 Atsako pavyzdys:
```
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
    "title": "Not Found",
    "status": 404,
    "traceId": "00-32fe7a58d0cf6c3ccd935e57e41825d0-2f9105ccd75d6c61-00"
}
```

## SportProrgams panaudojimo pavyzdžiai

### GET užklausa: {domain}/api/categories{categoryName}/sportPrograms

Galimi atsako kodai
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| 200 | Gražinamas sąrašas |

Atsako pavyzdys:
```
[
    {
        "id": 5,
        "type": 1,
        "duration": 1,
        "intensity": 1,
        "description": "desc1",
        "workout": "workout 1",
        "score": 0
    },
    {
        "id": 6,
        "type": 3,
        "duration": 1,
        "intensity": 3,
        "description": "30 minutes weight loss",
        "workout": "1 Chest and Triceps | Back and Biceps | Rest Day/Cardio | Shoulders and Forearms | Legs | Rest | Rest",
        "score": 0
    }
]
```

### GET užklausa: {domain}/api/categories{categoryName}/sportPrograms/{id}

Galimi atsako kodai
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| 200 | Gražinamas sąrašas |
| 404 | Nerastas |

200 Atsako pavyzdys:
```
{
    "resource": {
        "id": 5,
        "type": 1,
        "duration": 1,
        "intensity": 1,
        "description": "desc1",
        "workout": "workout 1",
        "score": 0
    }
}
```

404 Atsako pavyzdys:
```
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
    "title": "Not Found",
    "status": 404,
    "traceId": "00-a6e11c19e5e31bd58b0de373c9fc8866-78a89b843e3bed8a-00"
}
```

### POST užklausa: {domain}/api/categories/

Reikalaujamos siuntimo argumentai:
| Argumentas  | Reikšmėa |
| ------------- | ------------- |
| Type | sporto programos tipas |
| Duration | sporto programos trukmė |
| Intensity | sporto programos intensyvumas |
| Description | sporto programos aprašymas |
| Workout | sporto programa  |

Galimi atsako kodai
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| 201 | Gražinamas sukurtas įrašas |
| 401 | Neautorizuotas |
| 400 | Blogi duomenys |

201 Atsako pavyzdys:
```
{
    "id": 7,
    "type": 3,
    "duration": 1,
    "intensity": 3,
    "description": "30 minutes weight loss",
    "workout": "1 Chest and Triceps | Back and Biceps | Rest Day/Cardio | Shoulders and Forearms | Legs | Rest | Rest",
    "score": 0
}

```

400 Atsako pavyzdys:
```
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "traceId": "00-01e36cf26b46fc711c243249a19992d3-e623612d355b2e57-00",
    "errors": {
        "dto": [
            "The dto field is required."
        ],
        "$.Duration": [
            "The JSON value could not be converted to GymLab.Data.Dtos.SportProgramDto. Path: $.Duration | LineNumber: 2 | BytePositionInLine: 19."
        ]
    }
}
```

### PUT užklausa: {domain}/api/categories/{name}

Reikalaujamos siuntimo argumentai:
| Argumentas  | Reikšmėa |
| ------------- | ------------- |
| Description | kategorijos aprašymas |

Galimi atsako kodai
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| 200 | Gražinamas sukurtas įrašas |
| 401 | Neautorizuotas |
| 403 | Uždraustas |
| 404 | Nerastas |

200 Atsako pavyzdys:
```
{
    "id": 5,
    "type": 2,
    "duration": 4,
    "intensity": 2,
    "description": "THE 4-WEEK EXTREME FAT LOSS WORKOUT",
    "workout": "1 Cardio | Full body | Cardio | Full body | Rest | Full body | Cardio | 2 Cardio | Full body | Cardio | Full body | Cardio | Full body | Cardio 3 Cardio | Full body | Cardio | Full body | Rest | Full body | Cardio 4 Cardio | Full body | Cardio | Full body | Cardio | Full body | Cardio",
    "score": 0
}
```

404 Atsako pavyzdys:
```
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
    "title": "Not Found",
    "status": 404,
    "traceId": "00-b27ff046145cda1d17ead0803e313915-501ee350eecd6816-00"
}
```

### DELETE užklausa: {domain}/api/categories/{name}

Galimi atsako kodai
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| 204 | Sėkmingas ištrynimas |
| 401 | Neautorizuotas |
| 401 | Uždraustas |
| 404 | Nerastas |


404 Atsako pavyzdys:
```
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
    "title": "Not Found",
    "status": 404,
    "traceId": "00-32fe7a58d0cf6c3ccd935e57e41825d0-2f9105ccd75d6c61-00"
}
```
