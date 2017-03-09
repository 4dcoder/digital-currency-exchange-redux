Digital currency exchange
================================



**Required components for running the application in development mode**
```
node v6.9.4
nodemon
redis
modern browser with cors support
```

**Install**
```
npm install
```

**Start the internal application in development mode**
```
open a terminal
npm run dev_client
open another terminal
npm run dev_server
Open http://localhost:8080 in your browser.
```

**Start the internal application in prod mode**
```
open a terminal
npm run prod
npm start
Open http://localhost:3000 in your browser.
```



**Informational**
```
Enter a bitcoin amount and click calculate

The exchanged amount for three currencies will be displayed below.

The report component display all the requested exchange rates keyed by time.  
It does not store the requested bitcoin amount at that date.  
Right now it is just a stringify json payload.  Idea is to generate a line graph with y=bitcoin value x=time

The app integrates with Bittrex and Poloniex
```