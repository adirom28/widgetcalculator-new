package com.allcarstransport.server.dtos.email;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

public class EmailSendGridRequest {

    private EmailInfo from;

    @JsonProperty("reply_to")
    private EmailInfo replyTo;

    @JsonProperty("template_id")
    private String templateId;

    private List<Personalization> personalizations;

    public EmailInfo getFrom() {
        return from;
    }

    public void setFrom(EmailInfo from) {
        this.from = from;
    }

    public EmailInfo getReplyTo() {
        return replyTo;
    }

    public void setReplyTo(EmailInfo replyTo) {
        this.replyTo = replyTo;
    }

    public String getTemplateId() {
        return templateId;
    }

    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

    public List<Personalization> getPersonalizations() {
        return personalizations;
    }

    public void setPersonalizations(List<Personalization> personalizations) {
        this.personalizations = personalizations;
    }

    public static class Personalization {
        private List<EmailInfo> to;
        private String subject;

        @JsonProperty("dynamic_template_data")
        private Map<String, Object> data;

        public String getSubject() {
            return subject;
        }

        public void setSubject(String subject) {
            this.subject = subject;
        }

        public List<EmailInfo> getTo() {
            return to;
        }

        public void setTo(List<EmailInfo> to) {
            this.to = to;
        }

        public Map<String, Object> getData() {
            return data;
        }

        public void setData(Map<String, Object> data) {
            this.data = data;
        }
    }

    public static class EmailInfo {
        private String name;
        private String email;

        public EmailInfo(String name, String email) {
            this.name = name;
            this.email = email;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }

}
