package nmhs.backend.member;

public enum MemberRole {
    ADMIN("ROLE_ADMIN"),
    MEMBER("ROLE_MEMBER");

    MemberRole(String value) {
        this.value = value;
    }

    private String value;

    public String getValue() {
        return value;
    }
}
