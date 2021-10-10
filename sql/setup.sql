DROP TABLE IF EXISTS species CASCADE;
DROP TABLE IF EXISTS animals;

CREATE TABLE species (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type TEXT NOT NULL,
    extinct BOOL NOT NULL
);

INSERT INTO species (type, extinct)
VALUES ('birds', 'false'), ('fish', 'false'), ('mammals', 'false'), ('reptiles', 'false'), ('dinosaurs', 'true');

CREATE TABLE animals (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    species_id BIGINT NOT NULL, 
    FOREIGN KEY(species_id) REFERENCES species(id),
    name TEXT NOT NULL,
    size TEXT NOT NULL
);

INSERT INTO animals (species_id, name, size)
VALUES (1, 'crow', 'medium'), (1, 'blue bird', 'small'), (1, 'golden eagle', 'medium'), (2, 'carp', 'medium'), (2, 'minnow', 'tiny'), (2, 'whale shark', 'extra large'), (3, 'mouse', 'small'), (3, 'cat', 'medium'), (3, 'dog', 'large'), (4, 'garden snake', 'small'), (4, 'alligator', 'extra large'), (4, 'snapping turtle', 'medium'), (5, 't-rex', 'extra large'), (5, 'triceratops', 'extra-large'), (5, 'brachiosaurus', 'extra-large');