These are the statements to create the databases.

CREATE TABLE Users(
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	phone TEXT, 
	address TEXT
)



CREATE TABLE Availability (
	id SERIAL PRIMARY KEY,
	date DATE NOT NULL,
	start_time TIME NOT NULL,
	end_time TIME NOT NULL, 
	is_booked BOOLEAN DEFAULT FALSE
)

CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

CREATE TABLE Bookings (
	id SERIAL PRIMARY KEY,
	slot INTEGER UNIQUE NOT NULL,
	user_id INTEGER NOT NULL,
	status booking_status NOT NULL DEFAULT 'pending',
	FOREIGN KEY (slot) REFERENCES Availability(id),
	FOREIGN KEY (user_id) REFERENCES Users(id)
)

