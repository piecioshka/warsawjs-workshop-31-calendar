# warsawjs-workshop-31-calendar

**WarsawJS Workshop #31 — Calendar**: Back-end dla aplikacji klienckiej — kalendarz — napisanej
przez [@G3F4](https://github.com/G3F4/warsawjs-workshop-31-calendar-client)

## Demo 🎉

TBA

## Step by step 👣

* [x] Stworzenie struktury aplikacji
* [x] Stworzenie web servera (`npm/express`)
* [x] Stworzenie pierwszego endpointa
* [x] Napisanie testu integracyjnego (`npm/nock` & `npm/jasmine` & `npm/supertest`)
* [x] Wydzielenie konfiguracji do zewnętrznego pliku (`npm/dotenv`)
* [x] Dodanie logowania (`npm/morgan`)
* [x] Dodanie middleware-a do odczytywania body z zapytania POST (`npm/body-parser`)
* [ ] Implementacja API dla [aplikacji](https://github.com/G3F4/warsawjs-workshop-31-calendar-client)
    + `GET: /api/calendar?month={YYYY-MM}`

        <details><summary>response body</summary>

        ```js
        {
            data: [
                date: string(format=YYYY-MM-DD),
                events: [
                    {
                        id: string(format=guid)
                        title: string
                    }
                ]
            ]
        }
        ```

        </details>

    + `GET: /api/day?date={YYYY-MM-DD}`

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

    + `POST: /api/event`

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

    + `PUT: /api/event/:id`

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

    + `DELETE: /api/event/:id`

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

* [ ] Napisać testy weryfikujące endpointy — wykorzystać schemy z katalogu
    `docs/schemas`. Schemy są wygenerowane za pomocą <https://www.jsonschema.net/>
* [ ] Podłączenie się od bazy danych (`npm/mongoose`)
* [ ] Bonus: Dodanie CORS (`npm/cors`)
* [ ] Bonus: Dodanie kompresji (`npm/compression`)
* [ ] Przepięcie credentiali z lokalnej bazy na współdzieloną

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2019
