# Complex Express Models

Build an application using a layered architecture. It contains two related resources and utilizes SQL JOINS and Aggregations.

## Requirements

Create the routes below for two models: `Animal` and `Species` (with some common sense columns), where each animal is a type of species. One route requires an aggregation: a `COUNT` of the different species of animals.

Use the red, green, refactor process. Work vertically, fully completing each route before moving to the next.

Each route requires the following:
* Test(s)
* `express` route
* Model method
* Related SQL schema

Think about how you can make your routes `REST`ful when they don't follow the typical CRUD conventions.

## Rubric

* Route to add a new `Species` (1 point)
* Route to get all `Species` (1 point)
* - Route to add a new `Animal` (1 point)
* - Route to get an `Animal` by `id` (1 point)
* Route to get all `Animal`s and include their `Species` (2 points)
* - Route to update an `Animal` (1 point)
* - Route to delete an `Animal` (1 point)
* Route to get a count of `Animal`s by `Species` (2 points)
* STRETCH: Route to set a `Species` to `extinct` (`true` or `false`) (+1 point)
* STRETCH: Route to get all `Species` that are not `extinct` (+1 point)