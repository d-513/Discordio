# Configuration

Everything is done in enviroment variables
If ran in docker then it's variables are used.
Otherwise it uses the file `.env`.
You need to specify the path to the file using the `DIO_ENV` system env variable.
You can find an example `.env` [here](../.env.example)

`DIO_WEB_PORT`
port for web backend. this will not be exposed to users

`DIO_PUBLIC_PORT`
port for web ui
