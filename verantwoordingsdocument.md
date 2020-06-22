# Verantwoordingsdocument

Lucas Hijman

## Polymorfisme
Heb ik toegepast bij chicken en zombie - wat gameobjecten zijn- omdat je die elk frame moet updaten en het is efficiënter om ze beide in één keer aan te roepen.

## Singleton
Ik heb de game singleton gemaakt, omdat allerlei objecten, zoals het graan en de telefoon, bij de game moeten kunnen om daar dingen te updaten. De graankorrels
moeten de score updaten. De telefoon moet naar alle zombies een melding sturen

## Strategy
Ik heb strategy toegepast bij alle verschillende gedragingen van de zombies (facebook checken, jagen). Ik vond dit veel lijken op de huiswerkopdracht Jibby,
waar het Strategy pattern heel handig was, alleen hier heb je iets minder gedragsmogelijkheden.

## Observer
De zombies zijn observers van de gebeurtenis "kip pakt telefoon op". Ik heb dit gedaan, omdat het observer pattern heel handig is voor als je een bepaalde reeks
objecten iets wil laten doen bij een bepaald event.