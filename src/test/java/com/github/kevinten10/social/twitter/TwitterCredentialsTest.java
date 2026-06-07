package com.github.kevinten10.social.twitter;

import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class TwitterCredentialsTest {

    @Test
    void readsTwitterOAuthCredentialsFromEnvironmentValues() {
        TwitterCredentials credentials = TwitterCredentials.from(Map.of(
                "TWITTER_CONSUMER_KEY", "consumer-key",
                "TWITTER_CONSUMER_SECRET", "consumer-secret",
                "TWITTER_ACCESS_TOKEN", "access-token",
                "TWITTER_ACCESS_TOKEN_SECRET", "access-token-secret"
        ));

        assertThat(credentials.consumerKey()).isEqualTo("consumer-key");
        assertThat(credentials.consumerSecret()).isEqualTo("consumer-secret");
        assertThat(credentials.accessToken()).isEqualTo("access-token");
        assertThat(credentials.accessTokenSecret()).isEqualTo("access-token-secret");
    }

    @Test
    void rejectsMissingTwitterOAuthCredentials() {
        assertThatThrownBy(() -> TwitterCredentials.from(Map.of(
                "TWITTER_CONSUMER_KEY", "consumer-key",
                "TWITTER_CONSUMER_SECRET", "consumer-secret",
                "TWITTER_ACCESS_TOKEN", "access-token"
        )))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("TWITTER_ACCESS_TOKEN_SECRET");
    }
}
