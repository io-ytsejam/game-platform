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
* Jeżeli aplikacja nie zostanie zamknięta przez **zamknięcie karty przeglądarki**, bądź nie zostanie odświeżona, użytkownik 
nie zostanie usunięty z bazy aktywnych graczy  

### Instalacja i uruchomienie

* Po sklonowaniu repozytorium, należy w katalogu głównym aplikacji wydać polecenie `npm install`

* Aby uruchomić frontend, domyślnie na porcie 3000: `npm start`

* Backend uruchamiany jest za pomocą polecenia: `node bin/www`

* Serwer socket.io uruchomić przy pomocy `node socket.js`

#### Notka końcowa

Zdaje sobie sprawę z mocno wczesnego etapu rozwoju mojej aplikacji, aczkolwiek spowodowane jest to jedynie ograniczeniem 
czasowym, powstałym przez pewne okoliczności, które zmusiły mnie do aplikowania o pracę już teraz.

Aplikacja stworzona przez Marcina Skrzymowskiego
