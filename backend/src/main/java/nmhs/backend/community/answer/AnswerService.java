package nmhs.backend.community.answer;

import nmhs.backend.community.question.Question;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AnswerService {

    private AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public void create(Answer answer, Question question) {
        Answer a = new Answer();

        a.setQuestion(question);
        a.setContent(answer.getContent());
        a.setCreateDate(LocalDateTime.now());

        answerRepository.save(a);
    }
}
