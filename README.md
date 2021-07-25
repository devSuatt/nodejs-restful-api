# nodejs-restful-api

### An example about how to create a RESTFUL API using Express.js framework. All CRUD operations are provided: Create, Read, Update and Delete records.

Testing the requests sent in the Postman application with the 'RestClient' plugin in VS Code 

![resim](https://user-images.githubusercontent.com/81221395/126902908-6edb0b35-b91d-4eac-8ba9-4bf1d1de0e7f.png)

Clicking on 'Send Request' in the "restful.http" file will get a response in a new tab called 'Response' after the request has been sent: 

![resim](https://user-images.githubusercontent.com/81221395/126903096-a5bf1a99-6531-436a-89b3-d4239a6131f3.png)

<hr>

Instead of printing errors in the console, we can return them as respond: 

![resim](https://user-images.githubusercontent.com/81221395/126903336-893f8a51-3831-4380-934a-3e5b8384b90b.png)

Using the http-errors package for easier error handling.
For another error, to give a meaningful error message to the user by using the error code given by mongodb for that error: 

![error](https://user-images.githubusercontent.com/81221395/126903669-828bbd0f-d94b-4a47-80d3-04c9b64fd6fe.png)

<hr>

- Using the Joi package that allows us to validate easily.
- Adding our own method called joiValidation to UserSchema in our userModel.js file: 

![validation](https://user-images.githubusercontent.com/81221395/126903855-24e92d55-bde2-47c3-949a-37b2880d6128.png)

<hr>

- With the toJSON() method I wrote in the userModel, the fields that I do not want the user to see in the post and get requests will not be printed on the screen: 

![asd](https://user-images.githubusercontent.com/81221395/126903996-90dc2bb2-0b38-4305-8e6c-0f6a30345ab4.png)

Before -> After : 

![resim](https://user-images.githubusercontent.com/81221395/126904035-c8d96bad-e7ea-450e-a219-cb17e3611ad8.png)

- Hashing Passwords
- I installed the "bcrypt" package so that the user passwords do not appear in the db. In this way, passwords will be kept securely. Thanks to this package, we hash passwords and save them in the database. 

For Example: password123 => $2b$08$NOwiI4eDM8ZKZaFB5akH/e./.6q/jGYLM/Ys6oUp/L2MaPWkt50cG

And then in the database: 

![resim](https://user-images.githubusercontent.com/81221395/126904183-ccc4bc1d-c3f7-4f68-b1e1-4f5dee1115e5.png)


