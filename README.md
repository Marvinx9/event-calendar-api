### schema tables

```bash
CREATE TABLE TRANSACTIONS (
	ID SERIAL PRIMARY KEY,
	USER_ID INTEGER NOT NULL,
	TITLE VARCHAR(255),
	AMOUNT NUMERIC(10, 2) NOT NULL,
	CATEGORY VARCHAR(50),
	TYPE VARCHAR(1),
	DATA_CRIACAO TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
	DATA_ATUALIZACAO TIMESTAMP DEFAULT NULL
	)
```
