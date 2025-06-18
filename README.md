![Screenshot (192)](https://github.com/user-attachments/assets/f89977fb-b82d-49c3-b507-2de7e3bedde0)
![Screenshot (193)](https://github.com/user-attachments/assets/c4d88899-113e-4ed7-8bc0-5502a56db74b)
![Screenshot (194)](https://github.com/user-attachments/assets/c7ec347a-8dad-4173-83f2-bb69493a5a71)
# Split App Full‑Stack

A minimal full‑stack Java 17 Spring Boot + React implementation of a Splitwise‑style expense splitter.

## Quick start

### 1  Run backend

```bash
cd backend
./mvnw spring-boot:run          # or: mvn spring-boot:run
# Swagger UI → http://localhost:8080/swagger-ui.html
# H2 console → http://localhost:8080/h2-console  (user: sa, pass: <blank>)
```

### 2  Run frontend

```bash
cd ../frontend
npm install
npm start                       # http://localhost:3000
```

`package.json` contains `"proxy": "http://localhost:8080"`, so all `/api/*`
requests are auto‑forwarded to the Spring Boot server.

## Features implemented

* Add, list, update, delete expenses
* Auto‑extracted people list
* Equal split per expense
* Net balances (who owes / gets)
* Greedy minimisation of transfers
* Simple React UI:
  * Add expense form
  * Live balances & settlements
  * List of all expenses

Everything works out‑of‑the‑box with H2 (in‑memory) for local dev.  
Switch to PostgreSQL by editing `backend/src/main/resources/application.properties`.
