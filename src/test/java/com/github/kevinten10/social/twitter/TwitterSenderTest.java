package com.github.kevinten10.social.twitter;

import org.junit.jupiter.api.Test;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

class TwitterSenderTest {

    @Test
    void sendsProvidedMessageToTwitter() throws TwitterException {
        Twitter twitter = mock(Twitter.class);
        Status status = mock(Status.class);
        when(twitter.updateStatus("Ship the system")).thenReturn(status);

        TwitterSender sender = new TwitterSender(twitter);
        Status result = sender.send("Ship the system");

        assertThat(result).isSameAs(status);
        verify(twitter).updateStatus("Ship the system");
    }

    @Test
    void rejectsBlankMessageBeforeCallingTwitter() {
        Twitter twitter = mock(Twitter.class);
        TwitterSender sender = new TwitterSender(twitter);

        assertThatThrownBy(() -> sender.send("   "))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("message");
        verifyNoInteractions(twitter);
    }
}
