package nmhs.backend.community.question;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public Question detail(@PathVariable("id") Integer id) {
        Question question = questionService.getDetail(id);
        return question;
    }

    @PostMapping("/question/create")
    public void create(@RequestBody Question question) {
        questionService.create(question);
    }

    @PutMapping("/question/modify/{id}")
    public void modify(@RequestBody Question question, @PathVariable("id") Integer id) {
        questionService.modify(question, id);
    }

    @DeleteMapping("/question/delete/{id}")
    public void delete(@PathVariable("id") Integer id) {
        questionService.delete(id);
    }
}
