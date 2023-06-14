package com.github.kevinten10.social.twitter;

import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.auth.AccessToken;

/**
 * Twitter发送器
 */
public class TwitterSender {

    // 设置Twitter API密钥
    private static String consumerKey = "your_consumer_key";
    private static String consumerSecret = "your_consumer_secret";
    private static String accessToken = "your_access_token";
    private static String accessTokenSecret = "your_access_token_secret";

    public static void send(String message) {
        // 创建Twitter实例
        Twitter twitter = new TwitterFactory().getInstance();
        twitter.setOAuthConsumer(consumerKey, consumerSecret);
        AccessToken token = new AccessToken(accessToken, accessTokenSecret);
        twitter.setOAuthAccessToken(token);

        // 发送Twitter消息
        try {
            Status status = twitter.updateStatus("Hello Twitter!");
            System.out.println("Successfully updated the status to [" + status.getText() + "].");
        } catch (TwitterException e) {
            e.printStackTrace();
        }
    }
}
