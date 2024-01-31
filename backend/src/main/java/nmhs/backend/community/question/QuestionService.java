package nmhs.backend.community.question;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import nmhs.backend.member.Member;
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

    public Question getDetail(Integer id) {
        Optional<Question> question = this.questionRepository.findById(id);
        return question.get();
    }

    public void create(Question question, Member member) {
        Question q = new Question();

        q.setSubject(question.getSubject());
        q.setContent(question.getContent());
        q.setCreateDate(LocalDateTime.now());
        q.setMember(member);

        questionRepository.save(q);
    }

    public void modify(Question question, Integer id) {
        Question q = questionRepository.findById(id).get();

        q.setSubject(question.getSubject());
        q.setContent(question.getContent());

        questionRepository.save(q);
    }

    public void delete(Integer id) {
        questionRepository.deleteById(id);
    }
}