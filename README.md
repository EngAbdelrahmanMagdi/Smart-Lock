# Node.js Project with GraphQL, IOT and PostgreSQL

## Made By/ Abdelrahman Magdy
#

## Important notes 

- Don't forget to fill .env by .env.example with your env variables
- Don't forget to create  Database (smart_lock) in your postgreSQL
- Don't forget Migration
- If you faced Problems in urls, they're existed below
- If you faced Problems in entering data, there're examples below
  #
## Scripts You may need 

### To install my dependencies and developer dependencies 

```
npm install
```
### To run The project using nodemon
```
npm start
```


### To run migrations
```
npm run db:up
```

### To revoke last migration
```
npm run db:down
```
#
## Database Configuration 
- Default port  ``5432``
#
- ### Create 2 Databases 
```
CREATE DATABASE smart_lock;
```


- Configure .env to fit your environment (look at .env.example).

#
 ### If you faced problems in scripts running, Please make sure you've some packages globally installed in your Machine 


-In migration scripts use these

  ```
  npm install -g db-migrate

  npm install -g db-migrate-pg
  ```

### Examples for GraphQL inputs

## Unit

```
mutation CreateUnit{
	addUnit(unit_name:"seventhUnit"){
    id,
    unit_name
  }
}

query getAllUnits{
  units{
    id,
    unit_name
  }
}

query getOneUnit{
  unit(id:1){
    unit_name
  }
}

mutation deleteUnit{
  deleteUnit(id:7){
		id,
    unit_name
  }
}

mutation updateUnit{
  updateUnit(unit_name:"five",id:5){
    id,
		unit_name

  }
}
```

#

### Reservation

```
mutation createReservation{
	addReservation(unit_id:3, guest_name:"Abdelrahman",check_in:"2020-09-23T17:01:00Z",check_out:"2021-09-23T17:01:00Z", lock_id:1){
    id,
    unit_id,
    guest_name,
    check_in,
    check_out
  }
}

query getAllReservations{
  reservations{
     id,
    unit_id,
    guest_name,
    check_in,
    check_out
  }
}

query getReservation{
  reservation(id:7){
    id,
    unit_id,
    guest_name,
    check_in,
    check_out
  }
}

mutation deleteReservation{
  deleteReservation(id:28){
	    id,
    unit_id,
    guest_name,
    check_in,
    check_out
  }
}

mutation updateReservation{
  updateReservation(unit_id:2 ,guest_name:"Ali",id:7, check_in:"2020-09-23T17:01:00.000Z",check_out: "2021-09-23T17:01:00.000Z", is_cancelled:false, lock_id:1 ){
   	    id,
    unit_id,
    guest_name,
    check_in,
    check_out

  }
}

mutation cancelReservation{
  cancelReservation(unit_id:2 ,guest_name:"Abdo",id:26, check_in:"2020-09-23T17:01:00.000Z",check_out: "2021-09-23T17:01:00.000Z" ){
   	    id,
    unit_id,
    guest_name,
    check_in,
    check_out

  }
}
```

#

### Locks

```
mutation createLock{
	addLock(unit_id:3, device_id:"768s7dsdfdf56"){
    id,
    unit_id,
    device_id
  }
}

query getAllLocks{
  locks{
    id,
    unit_id,
    device_id
  }
}

query getOneLock{
  lock(id:10){
    id,
    unit_id,
    device_id
  }
}

mutation deleteLock{
  deleteLock(id:8){
      id,
    unit_id,
    device_id
  }
}

mutation updateLock{
  updateLock(unit_id:4 , device_id:"768sddsdfdf56", id:10){
      id,
    unit_id,
    device_id

  }
}
```

#

### Access Code

```
mutation createAccessCode{
	addAccessCode(lock_id:11, reservation_id:2){
    id,
    lock_id,
    reservation_id,
    passcode,
    remote_passcode_id
  }
}

query getAllAccessCodes{
  accessCodes{
    id,
    lock_id,
    reservation_id,
    passcode,
    remote_passcode_id
  }
}

query GetOneAccessCode{
  accessCode(id:5){
     id,
    lock_id,
    reservation_id,
    passcode,
    remote_passcode_id
  }
}

mutation deleteOneAccessCode{
  deleteAccessCode(id:6){
     id,
    lock_id,
    reservation_id,
    passcode,
    remote_passcode_id
  }
}

mutation updateAccessCode{
  updateAccessCode(id:5,lock_id:11, reservation_id:9){
       id,
    lock_id,
    reservation_id,
    passcode,
    remote_passcode_id

  }
}

```
