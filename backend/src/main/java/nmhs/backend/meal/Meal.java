package nmhs.backend.meal;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import nmhs.backend.community.answer.Answer;
import nmhs.backend.member.Member;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime mealDate;
    private Integer dayOfWeek;
    private LocalDateTime votedDate;
    @ManyToOne
    private Member member;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getMealDate() {
        return mealDate;
    }

    public void setMealDate(LocalDateTime mealDate) {
        this.mealDate = mealDate;
    }

    public Integer getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(Integer dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
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
