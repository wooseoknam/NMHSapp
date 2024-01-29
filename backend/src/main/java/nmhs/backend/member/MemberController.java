package nmhs.backend.member;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://192.168.0.5:8081")
public class MemberController {

    private final MemberService memberService;
    private final MemberSecurityService memberSecurityService;

    public MemberController(MemberService memberService, MemberSecurityService memberSecurityService) {
        this.memberService = memberService;
        this.memberSecurityService = memberSecurityService;
    }

    @PostMapping("/member/signup")
    public ResponseEntity signup(@RequestBody MemberForm memberForm) {
        memberService.join(memberForm.getName(), memberForm.getEmail(), memberForm.getPassword());
        return new ResponseEntity(HttpStatus.OK);
    }

}
