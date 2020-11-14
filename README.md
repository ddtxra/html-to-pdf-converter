
# URL to PDF converter (using simple HTTP GET)

Convenient web service dockerized, to transform an URL (HTML) into a PDF.
The web service uses Gotenberg renderer https://github.com/thecodingmachine/gotenberg

## Run project
```
docker-compose up -d
```

## Access url example
```
http://localhost:8855/pdf/https://google.com
http://localhost:8855/pdf/https://google.com/search?q=gotenberg
http://localhost:8855/pdf/https://facebook.com&marginTop=2
```

See Gotenberg manual for options:

https://thecodingmachine.github.io/gotenberg/
