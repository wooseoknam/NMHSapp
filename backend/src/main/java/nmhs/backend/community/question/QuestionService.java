package nmhs.backend.community.question;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    private QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<Question> getList() {
        return this.questionRepository.findAll();
    }

    public Optional<Question> getDetail(Integer id) {
        return this.questionRepository.findById(id);
    }

    public void create(Question question) {
        Question q = new Question();

        q.setSubject(question.getSubject());
        q.setContent(question.getContent());
        q.setCreateDate(LocalDateTime.now());

        questionRepository.save(q);
    }
}