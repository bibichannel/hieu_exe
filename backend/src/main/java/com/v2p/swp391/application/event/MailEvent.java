package com.v2p.swp391.application.event;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

import java.time.Clock;
import java.util.List;

@Getter
@Setter
public class MailEvent  extends ApplicationEvent {

    private List<String> recipients;
    private List<String> ccList;
    private List<String> bccList;
    private String subject;
    private String body;
    private Boolean isHtml;
    private String attachmentPath;

    public MailEvent(Object source) {
        super(source);
    }

    public MailEvent(Object source, Clock clock) {
        super(source, clock);
    }
}
