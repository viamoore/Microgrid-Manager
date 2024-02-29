# Microgrid Manager Database Access
The following are instructions on how to access the mysql database for Microgrid Manager. Due to the database being hosted in Docker itself, you are unable to use a 3rd party database manager or VSCode extension to view or query the database. You must access it through Docker directly.

Run the command `docker ps` to see the list of containers running
```
CONTAINER ID   IMAGE                           COMMAND                  CREATED      STATUS              PORTS                               NAMES
1ac08f75db53   microgrid-manager-interface_2   "python3 fetchWeathe…"   2 days ago   Up 16 seconds                                       weather
9bba752a0ee6   microgrid-manager-frontend      "docker-entrypoint.s…"   2 days ago   Up 35 minutes   0.0.0.0:5173->5173/tcp              Dashboard
f98ce117b8d2   microgrid-manager-interface_0   "python3 egauge_API_…"   2 days ago   Up 15 seconds                                       egauge_API_db
a3b72c62751d   microgrid-manager-interface_1   "python3 powerview_g…"   2 days ago   Up 35 minutes                                       powerview
f34e1f6b69a2   microgrid-manager-backend       "docker-entrypoint.s…"   2 days ago   Up 35 minutes   0.0.0.0:8080->8080/tcp              backend
dc813c811713   microgrid-manager-mysql         "docker-entrypoint.s…"   2 days ago   Up 35 minutes   0.0.0.0:3306->3306/tcp, 33060/tcp   microgrid-manager-mysql-1
```
Find the `CONTAINER ID` for the `microgrid-manager-mysql` image (in this example, it's `dc813c811713`) and enter it in the following command to log into the mysql database
`docker exec -it dc813c811713 mysql -u microgridManager -psluggrid`
`microgridManager` is the username and `sluggrid` is the password.

From my observation, the container id should be the same unless the container is outright deleted.

From there, you should be in a `mysql` commandline. Exit via ctrl + d

Before performing any queries, you must select the `microgridManager` database via the command `USE microgridManager;`
From there, you can perform SQL queries on the data. For instance run the query `SHOW TABLES;` to show all the tables in the database.
```
mysql> SHOW TABLES;
+---------------------------------+
| Tables_in_microgridManager      |
+---------------------------------+
| cumulative                      |
| egauge_config_settings_table    |
| powerview_config_settings_table |
| powerview_data                  |
| rate                            |
| weather_data                    |
+---------------------------------+
```
