package com.github.kevinten10.social.twitter;

import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;

/**
 * Twitter发送器
 */
public class TwitterSender {

    private final Twitter twitter;

    public TwitterSender(Twitter twitter) {
        this.twitter = twitter;
    }

    /**
     * 发送Twitter消息
     *
     * @apiNote 当前twitter封禁了相关api
     */
    public static Status sendWithDefaultClient(String message) {
        Twitter twitter = new TwitterFactory().getInstance();
        TwitterCredentials.from(System.getenv()).applyTo(twitter);

        return new TwitterSender(twitter).send(message);
    }

    public Status send(String message) {
        if (message == null || message.trim().isEmpty()) {
            throw new IllegalArgumentException("message must not be blank");
        }

        try {
            return twitter.updateStatus(message);
        } catch (TwitterException e) {
            throw new IllegalStateException("Failed to send Twitter status", e);
        }
    }
}
