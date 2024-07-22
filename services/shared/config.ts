export const Config = {
    db: {
        host: process.env.mongo_host ?? (process.env.listen ? "127.0.0.1" : "mongo"),
        port: process.env.mongo_port ?? "27017",
        user: process.env.mongo_user ?? "root",
        password: process.env.mongo_password ?? "verysecurepassword",
        database: process.env.mongo_database ?? "orbital",
    },
    listen: process.env.listen ?? false,
}

if (process.env.listen) {
    process.env.AWS_ACCESS_KEY_ID = "test"
    process.env.AWS_SECRET_ACCESS_KEY = "test"
    process.env.AWS_REGION = "us-east-1"
    process.env.AWS_ENDPOINT_URL = "http://127.0.0.1:4566"
} else if (process.env.aws) {
    process.env.AWS_ACCESS_KEY_ID = "AKIA2UC2766VGCBCQD4O"
    process.env.AWS_SECRET_ACCESS_KEY = "f4c8ozjtcNuyHFCZs0vyQVovGS6J"
    process.env.AWS_REGION = "us-east-1"
}