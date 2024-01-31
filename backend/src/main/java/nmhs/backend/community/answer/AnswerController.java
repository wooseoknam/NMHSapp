package nmhs.backend.community.answer;

import nmhs.backend.community.question.Question;
import nmhs.backend.community.question.QuestionService;
import nmhs.backend.member.Member;
import nmhs.backend.member.MemberService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnswerController {

    private AnswerService answerService;
    private QuestionService questionService;
    private MemberService memberService;

    public AnswerController(AnswerService answerService, QuestionService questionService, MemberService memberService) {
        this.answerService = answerService;
        this.questionService = questionService;
        this.memberService = memberService;
    }

    @PostMapping("/answer/create/{id}")
    public void create(@RequestBody Answer answer, @PathVariable("id") Integer id) {
        Question question = questionService.getDetail(id);
        Member member = memberService.getMember(answer.getMember().getName());
        answerService.create(answer, question, member);
    }
}
