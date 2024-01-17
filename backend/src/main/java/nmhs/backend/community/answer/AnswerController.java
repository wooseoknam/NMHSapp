package nmhs.backend.community.answer;

import nmhs.backend.community.question.Question;
import nmhs.backend.community.question.QuestionService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Controller
public class AnswerController {

    private AnswerService answerService;
    private QuestionService questionService;

    public AnswerController(AnswerService answerService, QuestionService questionService) {
        this.answerService = answerService;
        this.questionService = questionService;
    }

    @PostMapping("/answer/create/{id}")
    public void create(@RequestBody Answer answer, @PathVariable("id") Integer id) {
        Question question = questionService.getDetail(id);
        answerService.create(answer, question);
    }
}
