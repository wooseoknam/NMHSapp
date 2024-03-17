package nmhs.backend.member;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/member/signup")
    public ResponseEntity signup(@RequestBody MemberForm memberForm) {
        memberService.join(memberForm.getName(), memberForm.getEmail(), memberForm.getPassword());
        return new ResponseEntity(HttpStatus.OK);
    }
}