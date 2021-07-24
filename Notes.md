# Express NodeJS RESTful API

- To use the API, download the HTTP Client, Postman.
Link: https://www.postman.com/downloads/

- Follow the below steps using your favourite shell/terminal (assuming Bash is installed with it).
    - Nodemon's installation: run `npm install -g nodemon` (docs.: https://www.npmjs.com/package/nodemon). Nodemon
    is a tool that monitors and automatically reloads the NodeJS development server when changes are made in the
    local files.
      
1) After copying/cloning the project, in the project directory root, run `npm init -y` to initialize the Node 
Package Manager with all default options accepted, otherwise run `npm init` and specify the desired options.
2) Next, run `npm i express ejs body-parser mongoose`.
3) If everything was successful in step 2), run `npx nodemon app.js`, the server should now be running
on port 4200 and in the terminal, a message `"Server running on port 4200"` should be displayed.

- If the previous steps were successful, the server API is up and running and requests can be made through Postman.

- Usage.:

| HTTP METHOD | URL                     | Specification          |          RESPONSE                                   |
| ----------- | ----------------------- | ---------------------- | --------------------------------------------------- |
| GET         | localhost:4200/articles |  N\A                   | Returns all existing articles in the database       |
| POST        | localhost:4200/articles |  N\A                   | Insert title and content as fields in the body request <br>(have both enabled) and specify the values for each|
| DELETE      | localhost:4200/articles |  N\A                   | Deletes all articles in the database                |

- With URL params:

| HTTP METHOD | URL                                  | Specification          |          RESPONSE                                   |
| ----------- | ------------------------------------ | ---------------------- | --------------------------------------------------- |
| GET         | localhost:4200/articles/articleTitle |  N\A                   | Returns the specified article from the database     |
| PUT         | localhost:4200/articles/articleTitle |  N\A                   | Replace the specified article's database entry (if one attribute is omitted in the request body, null will be the default value for it)|
| PATCH       | localhost:4200/articles/articleTitle |  N\A                   | Replace the specified article's attribute(s) (only replace the values of the specified attribute(s))|
| DELETE      | localhost:4200/articles/articleTitle |  N\A                   | Deletes the specified article from the the database |