package com.github.kevinten10.social.twitter;

import twitter4j.Twitter;
import twitter4j.auth.AccessToken;

import java.util.Map;

public record TwitterCredentials(
        String consumerKey,
        String consumerSecret,
        String accessToken,
        String accessTokenSecret
) {
    public static TwitterCredentials from(Map<String, String> values) {
        return new TwitterCredentials(
                required(values, "TWITTER_CONSUMER_KEY"),
                required(values, "TWITTER_CONSUMER_SECRET"),
                required(values, "TWITTER_ACCESS_TOKEN"),
                required(values, "TWITTER_ACCESS_TOKEN_SECRET")
        );
    }

    public void applyTo(Twitter twitter) {
        twitter.setOAuthConsumer(consumerKey, consumerSecret);
        twitter.setOAuthAccessToken(new AccessToken(accessToken, accessTokenSecret));
    }

    private static String required(Map<String, String> values, String name) {
        String value = values.get(name);
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalStateException("Missing required environment variable: " + name);
        }
        return value;
    }
}
