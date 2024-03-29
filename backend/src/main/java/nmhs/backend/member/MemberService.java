package nmhs.backend.member;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Member join(String name, String email, String password) {
        Member member = new Member();

        member.setName(name);
        member.setEmail(email);
        member.setPassword(passwordEncoder.encode(password));

        memberRepository.save(member);
        return member;
    }

    public Member getMember(String name) {
        Optional<Member> member = memberRepository.findByName(name);
        if (member.isPresent()) {
            return member.get();
        } else {
            throw new UsernameNotFoundException("member not found");
        }
    }
}
