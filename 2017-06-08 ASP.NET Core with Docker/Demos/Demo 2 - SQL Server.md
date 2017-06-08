Pull down the image for SQL Server (Linux) from Docker Hub
```
$ docker pull microsoft/mssql-server-linux
```
Run a container from the image (providing the necessary information for SQL Server)
```
$ docker run -d --name localdb -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=P@55w0rd' -p 1433:1433 microsoft/mssql-server-linux
```
Connect to SQL Server using your favorite tool and create a database
```
CREATE DATABASE Test
```
Stop the container
```
$ docker stop [container id]
```
Start the container again
```
$ docker start [container id]
```
Confirm the new database is still there