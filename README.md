# ratatouille

GOAL:
The goal was to develop an app that I would use myself and that also uses artificial intelligence in some way,
and since I don't like to think about what I eat every day and what I have to buy for it, my decision came relatively quickly to a "recipe generator".

TIMEFRAME:
This project was developed within the given time frame of 9 days.

WHAT IS RATATOUILLE ?
With ratatouille, users can track their calories, generate food recipes and the associated ingredients and instructions, based on their personal eating preferences.
In addition, the required ingredients for a dish can be added to the shopping list and saved in the favorites with just one click.
Every data the user creates while using the app gets stored in the database, to ensure that the user can continue where he left off even months after not using the app.

To generate the dish, a prompt is sent to the OpenAI API which instructs the artificial intelligence to generate a dish.
The response from the API or artificial intelligence is a single string containing the ingredients, the instructions, the shopping list, and general information about the dish.
This string is then cut into its components using JavaScript, depending on its use. For example, the name of the dish is used to find a suitable image for the dish using the Google Custom Search API.

WHERE CAN I FIND IT?
https://ratatouilleai.netlify.app/

TECHNOLOGIES:
Frontend: JavaScript(ES6), HTML5, CSS3, React, JSX
Frontend deployment: Netlify
Backend: Express, Node.Js, MongoDB, Axios
Backend deployment: Adaptable.io
Authorization and security: JWT, CORS, bcrypt
Build system: Vite
Version control: Git, GitHub

CHALLENGES:
The biggest challenge in this project was to store the user data from the frontend via the backend in the database and to send this data back to the frontend when needed.
What made the whole thing even more difficult was the asynchronous behavior of react, which sometimes led to the data arriving in the front, but not being displayed,
because it took minimally longer to load than the app. After a while, you get used to it and know that you can solve this problem by using async/await functions and useEffect.

BUGS?
Until now I have not discovered any major bugs. Sure sometimes something takes a bit longer to load or sometimes suggests a dish fails because the responses of the OpenAI API are not 100% consistent,
but even for this case the user gets displayed an error message, which encourages him to try it again. The only thing that can be considered a bug is that sometimes the console shows a CORS error with a 404 not found,
but I double-checked the related route and everything that belongs to it and couldn´t find anything. Also, everything works properly even the things that use the related route, so I think it´s not that much of a problem.

CONCLUSION:
I learned a lot with this project, from structural things like time management to technical things like working with APIs, react or linking frontend, and backend to mental things like dealing with frustration and success.
In summary, I am very satisfied with the result and with what I have achieved in only 9 days, whether I will really use the app privately remains to be seen,
since the app is of course completely in English due to the requirement of Ironhack and I'm not sure yet whether I have really saved time and effort at the end of the day when I have to translate everything first,
but to get tasty ideas for dishes suggested I will certainly use it.