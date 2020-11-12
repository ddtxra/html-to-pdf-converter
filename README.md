
Convenient web service to transform HTML on PDF.
The web service uses Gotenberg renderer https://github.com/thecodingmachine/gotenberg

# Instructions
```
docker-compose up -d
```

## Access url example
```
http://localhost:8855/pdf?remoteURL=https://google.com
http://localhost:8855/pdf?remoteURL=https://facebook.com&marginTop=2
```

See Gotenberg manual for options:

https://thecodingmachine.github.io/gotenberg/
