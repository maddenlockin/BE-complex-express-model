DROP TABLE IF EXISTS animals;

-- CREATE TABLE species (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     name TEXT NOT NULL,
-- )

-- INSERT INTO species (name)
-- VALUES (birds), (fish), (mammals), (reptiles) 

CREATE TABLE animals (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    species_id TEXT NOT NULL,
    name TEXT NOT NULL,
    size TEXT NOT NULL
)

-- INSERT INTO animals (name, size)
-- VALUES(crow, medium), (blue bird, small), (golden eagle, medium), (carp, medium), (minnow, tiny), (whale shark, extra large), (mouse, small), (cat, medium), (dog, large), (garden snake, small), (alligator, extra large), (snapping turtle, medium)