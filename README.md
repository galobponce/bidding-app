<h1 style="border: none" align="center">:computer: Bidding App</h1>

# :raised_hands: Description:

A web auction application for bidding on antique items.

<br/>

# :camera: Images:

![img](https://github.com/galobponce/bidding-app/blob/main/img/home-admin.png)

![img](https://github.com/galobponce/bidding-app/blob/main/img/item-detail.png)

<br/>

# :unlock: Functionalities:
    - Dummy user authentication with users stored in json at client.
    - Admin and normal users.
    - Admins can create, edit and delete items.
    - Admins can filter through items by title and description.
    - Admins can order items by close date and price.
    - Normal users can bid for items.
    - Admins can see bid history in items.
    - Items update (for example a bid, or a change from an Admin) are real time updated in all clients via server side events.
    - Normal users can use the auto bid feature to automatically bid (price + 1) for an item when another user bids.
    - Auto bid max amount configurable.
    - Users can configure their mail.
    - Configurable alert when user used a certain percentage of the max amount.
    - Alerts are sent both by app notifications and mail 
    - Simple pagination for item gallery.
    - Light and Dark Mode.
    - Fully responsive design.
    

<br/>


# :lock: Future functionalities:
    - Advanced user authentication.
    - Implement TDD on critical react components.

<br/>


# :wrench: Built with:

Front End is built in [React](https://reactjs.org) with [Typescript](https://www.typescriptlang.org) and styled with [ChakraUI](https://chakra-ui.com).

Back End is built in [Django Rest Framework](https://www.django-rest-framework.org) with Python.

Real time updating is made with [Server Side Events](https://en.wikipedia.org/wiki/Server-sent_events) using [Django EventStream](https://github.com/fanout/django-eventstream) and [Django Channels](https://channels.readthedocs.io/en/stable/).


<br/>


# :eyes: Requirements:

A [node](https://nodejs.org/) enviroment (Node 19).

A [python](https://www.python.org) enviroment (Python 3.9).


<br/>


# :question: Local Deploy (back end):

1. Navigate to `server/` folder with your terminal.

2. Create a virtual enviroment (with [virtualenv](https://virtualenv.pypa.io/en/latest/) for example).

3. Activate the virtual enviroment.

4. Run `pip install -r requirements.txt`.

5. Run `python manage.py migrate`.

6. Complete `server/project/settings.py` with your own mail settings.

7. Run `python manage.py runserver`.


<br/>


# :question: Local Deploy (front end):

1. Navigate to `client/` folder with your terminal.

2. Run `npm install`.

3. Run `npm run dev`.

4. Go to `http://localhost:5173` in your browser.
