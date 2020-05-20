CREATE TABLE animals (
	shelterIDNumber int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name varchar (20),
    species varchar (20),
    sex varchar (20),
    fixed boolean,
    declawed boolean,
    birthdate DATE
    
);

CREATE TABLE employees (
	employee_ID int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	first_Name varchar(20),
	last_Name varchar(20),
	POSITION varchar(20)
);

CREATE TABLE species (
	species_ID int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name varchar(20)
);

DROP TABLE species;

INSERT INTO species (name)
VALUES ('bimmy');