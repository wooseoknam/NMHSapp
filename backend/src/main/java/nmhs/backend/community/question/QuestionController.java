package nmhs.backend.community.question;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://192.168.0.5:8081")
public class QuestionController {

    private QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/question/list")
    public List<Question> list() {
        List<Question> questionList = questionService.getList();
        return questionList;
    }

    @GetMapping("/question/detail/{id}")
    public Optional<Question> detail(Model model, @PathVariable("id") Integer id) {
        Optional<Question> question = questionService.getDetail(id);
        return question;
    }
}
