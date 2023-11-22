# Endpoints

- [Endpoints](#endpoints)
  - [Users:](#users)
    - [User Schema](#user-schema)
    - [REGISTER_USER](#register_user)
    - [LOGIN_USER](#login_user)
    - [UPDATE_USER](#update_user)
  - [Flights:](#flights)
    - [Flight Schema](#flight-schema)
    - [GET\_ALL\_FLIGHT\_DATA](#get_all_flight_data)
    - [GET\_FLIGHT\_DATA](#get_flight_data)
    - [GET\_ALL\_SEAT\_DATA](#get_all_seat_data)
    - [CREATE\_FLIGHT](#create_flight)
    - [UPDATE\_FLIGHT](#update_flight)
    - [DELETE\_FLIGHT](#delete_flight)
  - [Seats](#seats)
    - [Seat Schema](#seat-schema)
    - [GET\_ALL\_SEAT\_DATA](#get_all_seat_data-1)
    - [UPDATE\_SEAT](#update_seat)
  - [Transactions](#transactions)
    - [Transaction Schema](#transaction-schema)
    - [GET\_ALL\_TRANSACTIONS](#get_all_transactions)
    - [GET\_TRANSACTIONS\_BY\_USER](#get_transactions_by_user)
    - [CREATE\_TRANSACTION](#create_transaction)
  - [Logs](#logs)
    - [Log Schema](#log-schema)
    - [GET\_ALL\_LOGS](#get_all_logs)


# Users:

## User Schema 
```ts
    {
        id: Number,             
        username: String,
        password: String,
        email: String,
        gender: String,
        birthdate: Date,
        profile_pic: String,
    },
```

## REGISTER_USER
> `POST /user/`

Registers a user. 

Body: User Object

Returns: User Object if successful and error message otherwise


## LOGIN_USER 
> `POST /user/login`

Logs in a user, checking if the user exists and if the password matches. Clears messages under the user. Creates log object for logging login attempts.

Body:
```ts
    {
        username: String,
        password: String,
    }
```

Returns: User Object if successful, error message otherwise

## UPDATE_USER 
> `PATCH /user/:id`

Updates user based on passed in params. Used for updating fields, forgot password, etc. Logs changed password.

Body: 
```ts
{
    [key: string]: any // any of the fields in the user object
}
```
Returns: User Object if successful, error message otherwise

# Flights:

## Flight Schema 
```ts
    {
        id: Number,             // e.g. 1
        dest: String,           // e.g. YYZ, NRT, etc.
        date: DateTime,         // e.g. 10-29-2023 3:35AM *SHOULD BE IN UTC!!!!
        duration: Number,       // e.g. 600 *THIS IS IN MINUTES
        stops: String,          // e.g. Non-stop, One Stop
        seats: Array<SeatId>,   
        sold: Number,           // To determine seats sold in O(1)
    },
```

## GET_ALL_FLIGHT_DATA

Returns an array of all flight data.

> `GET /flights/`

Returns: 
Array\<Flights>


## GET_FLIGHT_DATA

> `GET /flights/:id`

Returns flight data for one flight. Will take in flight ID as a parameters

Returns: 
Flight

*Example below:*

```ts
    {
        dest: "YYZ",
        date: new Date(Date.UTC(2023,11,29,0,35)),
        duration: 950,
        stops: "Nonstop",
        price: 19720,
        id: "1",
    },
```

## CREATE_FLIGHT
> `POST /flights/`

Creates a new flight. Instantiates seats for the flight.

Body: Flight Object

Returns: Flight Object if successful, error message otherwise

## UPDATE_FLIGHT
> `PATCH /flights/:id`

Updates a flight based on passed in params. Can update any field except for id and seats

Body: Flight Object

Returns: Flight Object if successful, error message otherwise

## DELETE_FLIGHT
> `DELETE /flights/:id`

Deletes a flight object. Also deletes all seats associated with the flight, and notifies all users who have bought a seat on the flight.

Returns: True if successful, error message otherwise

# Seats
## Seat Schema

```ts
    {
        id: Number,
        flight_id: Number,
        occupied: Boolean,
        price: Number
    }
```

## GET_ALL_SEAT_DATA

> `GET /seats/:id`

Returns an array of all seat data for a flight. Flight is given as an id

Returns: Array\<Seat>


### Index based

Seats need to be returned in a very exact order:

![seat image](seats.png)

A1 is 1st element

B1 is 2nd element

C1 is 3rd element

D1 is 4th element

A2 is 5th element

```ts
[
    {
        occupied: true,
        price: 1
    },
    {
        occupied: true,
        price: 2
    },
    .
    .
    .
]
```

## UPDATE_SEAT
> `PATCH /seat/:id`

Updates a seat based on passed in params. Can update any field except for id and flight_id

Body: Seat Object

Returns: Seat Object if successful, error message otherwise

# Transactions
## Transaction Schema

```ts
    {
        id: Number,
        user_id: Number,
        flight_id: Number,
        seat_id: Number,
        price: Number,
        date: Date,
    }
```
## GET_ALL_TRANSACTIONS
> `GET /transactions/`

Returns an array of all transactions

Returns: Array\<Transaction> if successful, error message otherwise


## GET_TRANSACTIONS_BY_USER
> `GET /transactions/:user_id`

Returns an array of all transactions for a user

Returns: Array\<Transaction> if successful, error message otherwise

## CREATE_TRANSACTION
> `POST /transactions/`

Creates a new transaction. Updates seat to occupied, and updates flight sold count.

Body: Transaction Object

Returns: Transaction Object if successful, error message otherwise

# Logs
## Log Schema
```ts
    {
        id: Number,
        user_id: Number,
        date: Date,
        type: String,
        message: String,
    }
```

## GET_ALL_LOGS
> `GET /logs/`

Returns an array of all logs

Returns: Array\<Log> if successful, error message otherwise