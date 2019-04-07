# warsawjs-workshop-31-calendar

**WarsawJS Workshop #31 — Calendar**: Back-end dla aplikacji klienckiej — kalendarz — napisanej
przez [@G3F4](https://github.com/G3F4/warsawjs-workshop-31-calendar-client)

## Demo 🎉

TBA

## Step by step 👣

* :white_check_mark: Stworzenie struktury aplikacji
* :white_check_mark: Stworzenie web servera (`npm/express`)
* :white_check_mark: Stworzenie pierwszego endpointa
* :white_check_mark: Napisanie testu integracyjnego (`npm/nock` & `npm/jasmine` & `npm/supertest`)
* :white_check_mark: Wydzielenie konfiguracji do zewnętrznego pliku (`npm/dotenv`)
* :white_check_mark: Dodanie logowania (`npm/morgan`)
* :white_check_mark: Dodanie middleware-a do odczytywania body z zapytania POST (`npm/body-parser`)
* :white_check_mark: Napisać testy weryfikujące endpointy (`npm/ajv`).<br/>
    Wykorzystać schemy z katalogu `docs/schemas`.<br/>
    Schemy są wygenerowane za pomocą <https://www.jsonschema.net/>.
* :white_check_mark: Podłączenie się od bazy danych (`npm/mongoose`)
* :white_check_mark: Implementacja API na potrzeby części [klienckiej](https://github.com/G3F4/warsawjs-workshop-31-calendar-client) (`npm/dayjs`).

    + `GET: /api/calendar?month={YYYY-MM}` — zwracanie danych do budowy kalendarza

        <details><summary>response body</summary>

        ```js
        {
            data: [
                {
                    date: string(format=YYYY-MM-DD),
                    events: [
                        {
                            id: string(format=guid)
                            title: string
                        }
                    ]
                }
            ]
        }
        ```

        </details>

    + `GET: /api/day?date={YYYY-MM-DD}` — zwracanie danych do prezentowania
        wydarzeń z pojedynczego dnia

        <details><summary>response body</summary>

        ```js
        {
            data: [
                {
                    id: string(format=guid)
                    title: string
                    description: string
                    time: string(format=YYYY-MM-DDThh:mm)
                    notification: boolean
                }
            ]
        }
        ```

        </details>

    + `POST: /api/event` — dodanie nowego wydarzenia (konkretnego dnia)

        <details><summary>request body</summary>

        ```js
        {
            title: string
            description: string
            time: string(format=YYYY-MM-DDThh:mm)
            notification: boolean
        }
        ```

        </details>

        <details><summary>response body</summary>

        ```js
        {
            id: string
        }
        ```

        </details>

    + `PUT: /api/event/:id` — aktualizacja wydarzenia

        <details><summary>request body</summary>

        ```js
        {
            title: string
            description: string
            time: string(format=YYYY-MM-DDThh:mm)
            notification: boolean
        }
        ```

        </details>
        <details><summary>response body</summary>

        ```js
        {
            id: string
        }
        ```

        </details>

    + `DELETE: /api/event/:id` — usunięcie wydarzenia

        <details><summary>request body</summary>

        ```js
        {
            id: string
        }
        ```

        </details>
        <details><summary>response body</summary>

        ```js
        {
            id: string
        }
        ```

        </details>

    + `POST: /api/subscriptions`

        <details><summary>request body</summary>

        ```js
        {
            data: {
                endpoint: URL
                expirationTime: Date
                keys: {
                    p256dh: string
                    auth: string
                }
            }
        }
        ```

        </details>
        <details><summary>response body</summary>

        ```js
        {
            id: string
        }
        ```

        </details>

* :star2: Bonus: Uwierzytelnienie za pomocą GitHuba (`npm/passport`)
* :star2: Bonus: Dodanie CORS (`npm/cors`)
* :star2: Bonus: Dodanie kompresji (`npm/compression`)
* :star2: Przepięcie credentiali z lokalnej bazy na współdzieloną

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2019
