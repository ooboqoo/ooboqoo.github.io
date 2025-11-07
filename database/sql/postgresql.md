# PostgreSQL


https://www.postgresql.org/docs/current/


```bash
$ docker pull postgres:16
$ docker run --name postgres -e POSTGRES_PASSWORD=<my-password> -d postgres:16
$ docker exec -it postgres bash
```

```bash
$ psql -U postgres
prostgres=# \l
```

## Tutorial

https://www.w3schools.com/postgresql/index.php




## SQL Language

https://www.postgresql.org/docs/current/sql.html


## 暂存

数据库表该如何命名 https://www.teamten.com/lawrence/programming/use-singular-nouns-for-database-table-names.html 文章认为使用单数更合适 `user` ✅ vs `users` ❌。而 Prisma 则更直接，直接用 model 名 `User` 来命名表。


