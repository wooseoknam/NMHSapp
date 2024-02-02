package nmhs.backend.meal;

import nmhs.backend.member.Member;
import nmhs.backend.member.MemberRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MealService {
    private final Logger log = LoggerFactory.getLogger(this.getClass().getSimpleName());

    private final MealRepository mealRepository;
    private final MemberRepository memberRepository;

    public MealService(MealRepository mealRepository, MemberRepository memberRepository) {
        this.mealRepository = mealRepository;
        this.memberRepository = memberRepository;
    }

    public void vote(List<Meal> meal) {
        for (Meal m : meal) {
            try {
                Meal newMeal = new Meal();
                newMeal.setVotedDate(LocalDateTime.now());
                newMeal.setDayOfWeek(m.getDayOfWeek());

                Optional<Member> member = memberRepository.findByName("ㅇ");
                newMeal.setMember(member.get());

                mealRepository.save(newMeal);
            } catch (Exception e) {
                log.error(e.toString());
            }
        }
    }

    public int[] voteResult() {
        List<Meal> voteList = mealRepository.findAll();

        int[] result = new int[19];
        for (int i=0; i< voteList.size(); i++) {
            Integer time = voteList.get(i).getDayOfWeek();
            System.out.println(time);
            result[time] += 1;
        }
        
        return result;
    }
}
