# Twitter Integration Notes

This project uses Twitter4J to publish Twitter/X status updates from Java.

## Credentials

Do not hard-code OAuth values in Java source files, Markdown examples, or JSON account files.

Set the required credentials through environment variables:

```bash
TWITTER_CONSUMER_KEY
TWITTER_CONSUMER_SECRET
TWITTER_ACCESS_TOKEN
TWITTER_ACCESS_TOKEN_SECRET
```

Use `.env.example` as the local template and keep real `.env` files out of Git.

## Sending a Status

Use `TwitterSender.sendWithDefaultClient(message)` when the process environment has the required variables.

For unit tests or custom wiring, inject a configured Twitter4J client:

```java
Twitter twitter = new TwitterFactory().getInstance();
TwitterCredentials.from(System.getenv()).applyTo(twitter);

TwitterSender sender = new TwitterSender(twitter);
sender.send("Hello Twitter!");
```

## Validation

Run:

```bash
./mvnw test
```

On Windows PowerShell:

```powershell
.\mvnw.cmd test
```
