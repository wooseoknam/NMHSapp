package nmhs.backend.member;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;

@Controller
public class MemberController {

    private final MemberService memberService;
    private final MemberSecurityService memberSecurityService;

    public MemberController(MemberService memberService, MemberSecurityService memberSecurityService) {
        this.memberService = memberService;
        this.memberSecurityService = memberSecurityService;
    }
//
//    @PostMapping("/member/signup")
//    public ResponseEntity signup(@RequestBody MemberForm memberForm) {
//        memberService.join(memberForm.getName(), memberForm.getEmail(), memberForm.getPassword());
//        return new ResponseEntity(HttpStatus.OK);
//    }

    @GetMapping("/login")
    public String login() {
        return "login_form";
    }

    @GetMapping("/info")
    public void currentUserName(@AuthenticationPrincipal UserDetails userDetails) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails user = (UserDetails) authentication.getPrincipal();
        System.out.println(user.getUsername());
    }
}