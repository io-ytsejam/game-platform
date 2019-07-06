# Snake game platform
Ta oto nieduża aplikacja została stworzona przy pomocy technologii takich jak:
* JavaScript, CSS/SCSS, HTML
* Node.js
* Express
* MySQL
* React.js
* Webpack
* Socket.io
* p5.js
* Material Design Components

### Podstawowe funkcje aplikacji
Podstawową funkcją aplikacji jest platforma mini gier (jak na razie jedyną grą jest Snake) z możliwością tworzenia 
użytkowników w bazie danych opartej na MySQL, gdzie każdy ma swój unikalny kolor, nazwę, awatar a także zapis 
najwyższego wyniku gry.

Dodatkową funkcją jest czat, umożliwiający wymianę wiadomości tekstowych w czasie rzeczywistym, między dwoma 
użytkownikami 

W oparciu o technologię gniazd sieciowych działa również panel, pokazujący obecnie zalogowanych użytkowników, z poziomu 
którego, można wysłać innemu graczowi zaproszenie do czatu, a w przyszłości także do wspólnych gier.

W planach jest także dodanie trybu multiplayer

### Znane błędy
* Jeżeli aplikacja nie zostanie zamknięta przez zamknięcie karty przeglądarki, bądź nie zostanie odświeżona, użytkownik 
nie zostanie usunięty z bazy aktywnych graczy  
