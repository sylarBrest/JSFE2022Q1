console.log(
  '%cAsync Race',
  'font-weight: bold; font-size: 16px',
);
console.log(
  'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/async-race.md\n\n',
);
console.log('%cSelf-check:', 'font-weight: bold;');
console.log(`
Выполнены все пункты задания.
✔️ 1. Basic structure (+25):
+ There should be two views on the site: "Garage" and "Winners". (+5)
+ "Garage" view should contain its name, page number, and the full amount of items in the database (how many car user has in his garage). (+5)
+ "Winners" view should contain its name, page number, and the full amount of items in the database (how many records the winners table contains). (+5)
+ View state should be saved when user switches from one view to another. For example, page number shouldn't be reset, input controls should contain that they contained before switching, etc. (+10)
✔️ 2. "Garage" view (+50):
+ User should be able to create, update, delete a car, and see the list of the cars. Car has only two attributes: "name" and "color". For "delete"-operation car should be deleted from "garage" table as well as from "winners". (+15)
+ User should be able to select any color from an RGB-Palete like here and see the picture of the car colored with the color selected and car's name. (+10)
+ Near the car's picture should be buttons to update its attributes or delete it. (+5)
+ There should be pagination on the "Garage" view (7 cars per one page). (+10)
+ There should be a button to create random cars (100 cars per click). Name should be assembled from two random parts, for example "Tesla" + "Model S", or "Ford" + "Mustang" (At least 10 different names for each part). Color should be also generated randomly. (+10)
✔️ 3. Car animation (+50):
+ Near the car's picture should be buttons for starting / stoping the car engine. (+5)
+ User clicks to the engine start button -> UI is waiting for car's velocity answer -> animate the car and makes another request to drive. In case api returned 500 error car animation should be stopped. (+20)
+ User clicks to the engine stop button -> UI is waiting for answer for stopping engine -> car returned to it's initial place. (+5)
+ Start engine button should be disabled in case car is already in driving mode. As well as stop engine button should be disabled when car is on it's initial place. (+5)
+ Car animation should work fine on any screen (smallest screen size is 500px). (+15)
✔️ 4. Race animation (+30):
+ There should be a button to start race. After user clicks this button all the cars on the current page start driving. (+10)
+ There should be a button to reset race. After user clicks this button all the cars return to it's initial places. (+10)
+ After some car finishes first user should see the message contains car's name that shows which one has won. (+10)
✔️ 5. "Winners" view (+35):
+ After some car wins it should be displayed at the "Winners view" table. (+10)
+ There should be pagination (10 winners per one page). (+5)
+ Table should include the next culumns: "№", "Image of the car", "Name of the car", "Wins number", "Best time in seconds" (names of the columns can differ). If the same car wins more than once the number of wins should be incremented while best time should be saved only if it's better than the stored one. (+10)
+ User should be able to sort cars by wins number and by best time (ASC, DESC). (+10)
`);
console.log('%cTotal: 190/190 => 190', 'font-weight: bold');
