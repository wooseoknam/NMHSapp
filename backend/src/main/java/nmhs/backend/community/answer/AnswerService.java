package nmhs.backend.community.answer;

import nmhs.backend.community.question.Question;
import nmhs.backend.member.Member;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AnswerService {

    private AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public void create(Answer answer, Question question, Member member) {
        Answer a = new Answer();

        a.setQuestion(question);
        a.setContent(answer.getContent());
        a.setCreateDate(LocalDateTime.now());
        a.setMember(member);

        answerRepository.save(a);
    }
}
