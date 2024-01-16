package nmhs.backend.community.question;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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

    @PostMapping("/question/create")
    public void create(@RequestBody Question question) {
        questionService.create(question);
    }
}
