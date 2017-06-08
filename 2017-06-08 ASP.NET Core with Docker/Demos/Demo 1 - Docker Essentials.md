Pull an image from Docker Hub for Debian
```
$ docker pull debian
```
View the list of local images
```
$ docker images
```
Run a container from the new image interactivly
```
$ docker run -it [image id]
```
In another terminal window, view the list of running containers
```
$ docker ps
```
Back in the main terminal, examine the container and create a new directory
```
# ps
# ls
# mkdir test
# ls
# exit
```
View the stopped container
```
$ docker ps -a
```
Create a new image from the stopped container
```
$ docker commit [container id] testing
```
Examine and then run the new image (automatically remove when finished)
```
$ docker images
$ docker history [image id]
$ docker run -it --rm [image id]
```
Run another container to perform a specific task
```
$ docker run --rm debian echo "Hello World"
```