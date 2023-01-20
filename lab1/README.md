Lab-1 | 

Specification Sheet

Product:
A news website that displays current tech news. 
The main feature is a grid/ist of cards, the one in current focus is indicated.

GitHub - HackerNews/API: Documentation and Samples for the Official HN API
In the API: title, by, url (possibly), and Type
Pull articles using a random index from the array
Backend:
https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty
https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty

Struggles:
The biggest struggle is using just one api of HackNews is not enough to complete the function. I used two apis from hacknews. The one contains 500 top news ids and the other one contains all information of particular one id. I use random function to shuffle 500 news id. In getdata() function it return particular one random news information. And use ishowids to restore all used id in order to avoid showing the duplicate news. I use setinterval to get data in each second until clearInterval() is called when get over 200 times data. And then use animate from Jquery to replace one article in 3 seconds. Also I used navbar and container from bootstrap to make it looks good on mobile.
Creativity:
I made a footer by using ajax and json. By this footer, user can easily navigate to github website of hackernews API or they can easily email me by clicking the email icon.

Reference:
https://www.w3schools.com/jsref/met_win_setinterval.asp

https://github.com/logos

https://getbootstrap.com/docs/5.1/components/navbar/

https://stackoverflow.com/questions/53730681/use-of-bootstrap-container

https://stackoverflow.com/questions/65946648/correct-way-to-fetch-data-from-an-array-of-ids

