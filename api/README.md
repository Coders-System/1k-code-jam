# Backend for the 1k Code jam website

Here are a list of routes currently available in the API

## User routes

Route prefix: `/users`

| Endpoint          | Method | Description                       |
| ----------------- | ------ | --------------------------------- |
| `/oauth/url`      | `GET`  | Returns the Oauth login URL       |
| `/oauth/callback` | `POST` | Callback handler for Oauth logins |
| `/logout`         | `POST` | Logs out the user                 |
| `/@me`            | `GET`  | Gets the currently logged in user |

## Submission routes

Route prefix: `/submissions`

| Endpoint  | Method | Description                                                 |
| --------- | ------ | ----------------------------------------------------------- |
| `/time`   | `GET`  | Returns the remaining milliseconds till submission deadline |
| `/submit` | `POST` | Submits the project of a participant                        |
