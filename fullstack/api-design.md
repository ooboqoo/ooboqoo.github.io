# API Design


RPC style API
* https://api.slack.com/web

API Guildelines https://dret.github.io/guidelines/
* https://cloud.google.com/apis/design




## RPC vs RESTful

https://aws.amazon.com/compare/the-difference-between-rpc-and-rest/  
https://www.smashingmagazine.com/2016/09/understanding-rest-and-rpc-for-http-apis/  


| Action              | RPC                        | RESTful
|---------------------|----------------------------|-----------------------------------
| ADD a new product   | `POST /addProduct`         | `POST /products`
| GET product  detail | `POST /getProduct`         | `GET /products/123`
| UPDATE product      | `POST /updateProductPrice` | `PUT /products/123`
| DELETE product      | `POST /deleteProduct`      | `DELETE /products/123`

### When to use: RPC vs. REST

If an API is mostly actions, maybe it should be RPC.
If an API is mostly CRUD and is manipulating related data, maybe it should be REST.

RPC-based APIs are great for actions (that is, procedures or commands).

REST-based APIs are great for modeling your domain (that is, resources or entities), making CRUD (create, read, update, delete) available for all of your data.




## RESTful + Action

REST is not only CRUD, but things are done through mainly CRUD-based operations. REST will use HTTP methods such as GET, POST, PUT, DELETE, OPTIONS and, hopefully, PATCH to provide semantic meaning for the intention of the action being taken.

A lot of people would try to use endpoints that look a bit like sub-resources for these actions

```http
POST /trips/123/start
POST /trips/123/finish
POST /trips/123/cancel
```

This is basically jamming RPC-style endpoints into a REST API, which is certainly a popular solution but is technically not REST. This crossover is a sign of *how hard it can be to put actions into REST*. While it might not be obvious at first, it is possible. One approach is to use a state machine, on something like a status field:

```http
PATCH /trips/123 HTTP/1.1
Host: api.example.com
Content-Type: application/json

{"status": "in_progress"}
```


## gRPC and tRPC





