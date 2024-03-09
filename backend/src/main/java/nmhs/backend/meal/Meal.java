package nmhs.backend.meal;

import jakarta.persistence.*;
import nmhs.backend.member.Member;

import java.time.LocalDateTime;

@Entity
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer time;
    private LocalDateTime votedDate;
    @ManyToOne
    private Member member;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer dayOfWeek) {
        this.time = time;
    }

    public LocalDateTime getVotedDate() {
        return votedDate;
    }

    public void setVotedDate(LocalDateTime votedDate) {
        this.votedDate = votedDate;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}
